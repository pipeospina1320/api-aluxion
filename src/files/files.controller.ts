import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/security/auth/decorators/aut.decorator';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { File } from './entities/file.entity';
import { FilesService } from './files.service';

@ApiBearerAuth()
@ApiTags('Files - Upload and Download')
@Controller('files')
export class FilesController {
  constructor(private readonly filesServices: FilesService) {}

  @ApiResponse({ status: 201, description: 'File upload', type: File })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Server error' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateFileDto,
  })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @Auth()
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() createFileDto: CreateFileDto,
  ) {
    return this.filesServices.create(file, createFileDto);
  }

  @ApiResponse({
    status: 200,
    description: 'File upload',
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        url: {
          type: 'string',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Server error' })
  @ApiParam({
    name: 'id',
    schema: {
      type: 'uuid',
    },
  })
  @Get(':id')
  @Auth()
  async download(@Param('id', ParseUUIDPipe) id: string) {
    const file = await this.filesServices.getFile(id);
    return file;
  }

  @ApiResponse({ status: 201, description: 'File upload', type: File })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Server error' })
  @ApiParam({
    name: 'id',
    schema: {
      type: 'uuid',
    },
  })
  @Get('geturl/:id')
  @Auth()
  async getUrl(@Param('id', ParseUUIDPipe) id: string) {
    const file = await this.filesServices.findOne(id);
    return file;
  }

  @ApiResponse({ status: 201, description: 'File upload', type: File })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Server error' })
  @ApiParam({
    name: 'id',
    schema: {
      type: 'uuid',
    },
  })
  @Put(':id')
  @Auth()
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateFileDto: UpdateFileDto,
  ) {
    const file = await this.filesServices.update(id, updateFileDto);
    return file;
  }
}
