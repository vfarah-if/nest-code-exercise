import { Test, TestingModule } from '@nestjs/testing';
import { ContentstackController } from './contentstack.controller';

describe('ContentstackController', () => {
  let controller: ContentstackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentstackController],
    }).compile();

    controller = module.get<ContentstackController>(ContentstackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
