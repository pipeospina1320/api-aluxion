import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/security/auth/auth.module';
import { UnsplashService } from 'src/services/unsplash-service';
import { SearcherController } from './searcher.controller';
import { SearcherService } from './searcher.service';

@Module({
  controllers: [SearcherController],
  providers: [SearcherService, UnsplashService],
  imports: [HttpModule, AuthModule],
})
export class SearcherModule {}
