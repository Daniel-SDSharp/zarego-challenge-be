import { Test, TestingModule } from '@nestjs/testing';
import { ImportsController } from 'src/imports/imports.controller';
import { ImportsService } from 'src/imports/imports.service';

describe('ImportsController', () => {
  let controller: ImportsController;
  let service: ImportsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImportsController],
      providers: [
        {
          provide: ImportsService,
          useValue: {
            importDataFromCsv: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<ImportsController>(ImportsController);
    service = module.get<ImportsService>(ImportsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should import data from CSV', async () => {
    await controller.importDataFromCsv();
    expect(service.importDataFromCsv).toHaveBeenCalled();
  });
});
