import { Test, TestingModule } from '@nestjs/testing';
import { ContentstackService } from './contentstack.service';

describe('ContentstackService', () => {
  let service: ContentstackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentstackService],
    }).compile();

    service = module.get<ContentstackService>(ContentstackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
