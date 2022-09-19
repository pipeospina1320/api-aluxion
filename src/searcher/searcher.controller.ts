import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/security/auth/decorators/aut.decorator';
import { SearchDto } from './dto/search.dto';
import { SearcherService } from './searcher.service';

@ApiTags('Searcher')
@Controller('searcher')
export class SearcherController {
  constructor(private searcherService: SearcherService) {}

  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get()
  @Auth()
  search(@Query() searchDto: SearchDto) {
    return this.searcherService.search(searchDto);
  }
}
