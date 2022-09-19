import { Controller, Get, Query } from '@nestjs/common';
import { Auth } from 'src/security/auth/decorators/aut.decorator';
import { SearchDto } from './dto/search.dto';
import { SearcherService } from './searcher.service';

@Controller('searcher')
export class SearcherController {
  constructor(private searcherService: SearcherService) {}
  @Get()
  @Auth()
  search(@Query() searchDto: SearchDto) {
    return this.searcherService.search(searchDto);
  }
}
