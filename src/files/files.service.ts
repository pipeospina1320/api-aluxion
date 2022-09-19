import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { S3Service } from 'src/services/s3-service';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { File } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
    private readonly uploadFile: S3Service,
  ) {}

  async create(file: Express.Multer.File, createFileDto: CreateFileDto) {
    const { name } = createFileDto;
    const respUpload = await this.uploadFile.upload(file, randomUUID());
    console.log(respUpload);
    const newFile = this.fileRepository.create({
      key: respUpload.Key,
      url: respUpload.Location,
      name,
    });
    await this.fileRepository.save(newFile);
    return newFile;
  }

  async getFile(id: string) {
    const file = await this.findOne(id);
    const { name, url, key } = file;
    const fileS3 = await this.uploadFile.download(key);

    return {
      name,
      url,
      file: fileS3,
    };
  }

  async findOne(id: string) {
    const file = await this.fileRepository.findOneBy({ id });
    if (!file) {
      throw new NotFoundException(`File with ${id} not found`);
    }
    return file;
  }

  async update(id: string, updateFileDto: UpdateFileDto) {
    const file = await this.fileRepository.preload({ id, ...updateFileDto });
    if (!file) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }

    await this.fileRepository.save(file);
    return file;
  }
}
