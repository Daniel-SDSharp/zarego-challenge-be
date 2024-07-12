import { Test, TestingModule } from '@nestjs/testing';
import { LeadershipController } from 'src/leadership/leadership.controller';
import { LeadershipService } from 'src/leadership/leadership.service';

describe('LeadershipController', () => {
  let controller: LeadershipController;
  let service: LeadershipService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadershipController],
      providers: [
        {
          provide: LeadershipService,
          useValue: {
            listAll: jest.fn().mockResolvedValue({
              metadata: {},
              data: [],
            }),
            findByCountries: jest.fn().mockResolvedValue({
              metadata: {},
              data: [],
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<LeadershipController>(LeadershipController);
    service = module.get<LeadershipService>(LeadershipService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all leadership data', async () => {
    const result = await controller.listAll(1, 50);
    expect(result).toEqual({ metadata: {}, data: [] });
    expect(service.listAll).toHaveBeenCalled();
  });

  it('should return leadership data by countries', async () => {
    const result = await controller.findByCountries('8,9', 1, 50);
    expect(result).toEqual({ metadata: {}, data: [] });
    expect(service.findByCountries).toHaveBeenCalled();
  });
});
