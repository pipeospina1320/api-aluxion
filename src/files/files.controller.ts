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
import { Auth } from 'src/security/auth/decorators/aut.decorator';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesServices: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @Auth()
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() createFileDto: CreateFileDto,
  ) {
    return this.filesServices.create(file, createFileDto);
  }

  @Get(':id')
  @Auth()
  async download(@Param('id', ParseUUIDPipe) id: string) {
    const file = await this.filesServices.getFile(id);
    return file;
  }

  @Get('geturl/:id')
  @Auth()
  async getUrl(@Param('id', ParseUUIDPipe) id: string) {
    const file = await this.filesServices.findOne(id);
    return file;
  }

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
