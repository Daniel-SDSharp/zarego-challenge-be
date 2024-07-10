import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import * as fs from 'fs';
import * as path from 'path';
import { ImportsService } from 'src/imports/imports.service';
import { Country } from 'src/schemas/country.schema';
import { Leadership } from 'src/schemas/leadership.schema';

jest.mock('fs');
jest.mock('path');

describe('ImportsService', () => {
  let service: ImportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImportsService,
        {
          provide: getModelToken(Country.name),
          useValue: {
            insertMany: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: getModelToken(Leadership.name),
          useValue: {
            insertMany: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<ImportsService>(ImportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should import data from CSV', async () => {
    const createReadStreamMock = {
      pipe: jest.fn().mockReturnThis(),
      on: jest.fn().mockImplementation((event, callback) => {
        if (event === 'data') {
          callback({
            country: 'USA',
            country_name: 'United States',
            performance_oriented: '3.5',
            autocratic: '2.1',
            modesty: '4.2',
            country_cluster: 'North America',
            charismatic_1_visionary: '3.8',
            decisive: '4.0',
          });
        } else if (event === 'end') {
          callback();
        }
        return createReadStreamMock;
      }),
    };

    (fs.createReadStream as jest.Mock).mockReturnValue(createReadStreamMock);
    (path.join as jest.Mock).mockReturnValue(
      '../zarego-be/src/input/globaldatainput.csv',
    );

    await service.importDataFromCsv();

    expect(fs.createReadStream).toHaveBeenCalledWith(
      '../zarego-be/src/input/globaldatainput.csv',
    );
    expect(createReadStreamMock.pipe).toHaveBeenCalled();
  });
});
