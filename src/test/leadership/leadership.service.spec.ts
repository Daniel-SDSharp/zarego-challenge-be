import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { LeadershipService } from 'src/leadership/leadership.service';
import { Leadership } from 'src/schemas/leadership.schema';

describe('LeadershipService', () => {
  let service: LeadershipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadershipService,
        {
          provide: getModelToken(Leadership.name),
          useValue: {
            find: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            exec: jest.fn().mockResolvedValue([]),
            countDocuments: jest.fn().mockResolvedValue(100),
          },
        },
      ],
    }).compile();

    service = module.get<LeadershipService>(LeadershipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return paginated leadership data', async () => {
    const result = await service.listAll(1, 50);
    expect(result).toEqual({
      metadata: {
        page: 1,
        rows: 50,
        total_registers: 100,
      },
      data: [],
    });
  });

  it('should return leadership data by countries', async () => {
    const result = await service.findByCountries(['USA', 'Canada'], 1, 50);
    expect(result).toEqual({
      metadata: {
        page: 1,
        rows: 50,
        row_count: 100,
        total_registers: 100,
      },
      data: [],
    });
  });
});
