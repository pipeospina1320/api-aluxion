import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { SearchDto } from './dto/search.dto';

@Injectable()
export class SearcherService {
  private readonly logger = new Logger();
  constructor(private readonly httpService: HttpService) {}

  async search(searchDto: SearchDto): Promise<AxiosResponse<[]>> {
    try {
      const resp = await this.httpService.axiosRef.get(
        'https://api.unsplash.com/photos',
        {
          params: searchDto,
          headers: {
            Authorization: `Client-ID ${process.env.SEARCHER_ACCESS_KEY}`,
          },
        },
      );
      return resp.data;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Server error');
    }
  }
}
