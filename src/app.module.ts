import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SharesModule } from './shares/shares.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/share-more'),
    ItemsModule,
    UsersModule,
    AuthModule,
    SharesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
