import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharesService } from './shares.service';
import { SharesController } from './shares.controller';
import { ShareSchema } from './schemas/share.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Share', schema: ShareSchema }])],
  providers: [SharesService],
  controllers: [SharesController]
})
export class SharesModule {}
