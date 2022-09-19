import { Module } from '@nestjs/common';
import { S3Service } from './s3-service';
import { UnsplashService } from './unsplash-service';

@Module({
  providers: [S3Service, UnsplashService],
})
export class ServicesModule {}
