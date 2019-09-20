import { Test, TestingModule } from '@nestjs/testing';
import { SharesController } from './shares.controller';

describe('Shares Controller', () => {
  let controller: SharesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SharesController],
    }).compile();

    controller = module.get<SharesController>(SharesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
