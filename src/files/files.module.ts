import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { S3Service } from 'src/services/s3-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { AuthModule } from 'src/security/auth/auth.module';

@Module({
  controllers: [FilesController],
  providers: [FilesService, S3Service],
  imports: [TypeOrmModule.forFeature([File]), AuthModule],
})
export class FilesModule {}
