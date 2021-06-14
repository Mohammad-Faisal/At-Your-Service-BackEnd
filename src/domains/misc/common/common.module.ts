import { HttpModule, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonController } from './common.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([   ]) ,
    HttpModule ,
    ConfigService
  ] ,
  controllers : [CommonController] ,
  providers: [CommonService] ,
  exports : [CommonService]
})
export class CommonModule {}
