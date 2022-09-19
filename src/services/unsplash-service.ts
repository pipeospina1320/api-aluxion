import {
  Logger,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { createApi } from 'unsplash-js';

@Injectable()
export class UnsplashService {
  private readonly logger = new Logger();

  unsplash() {
    try {
      return createApi({
        accessKey: process.env.SEARCHER_ACCESS_KEY,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Server error');
    }
  }
}
