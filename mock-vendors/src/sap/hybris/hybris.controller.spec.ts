import { Test, TestingModule } from '@nestjs/testing';
import { HybrisController } from './hybris.controller';

describe('HybrisController', () => {
  let controller: HybrisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HybrisController],
    }).compile();

    controller = module.get<HybrisController>(HybrisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
