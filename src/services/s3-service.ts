import { S3 } from 'aws-sdk';
import {
  Logger,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { UploadFile } from 'src/files/interfaces/uploadfile';

@Injectable()
export class S3Service implements UploadFile {
  private readonly logger = new Logger();
  private readonly bucketS3 = process.env.AWS_S3_BUCKET;

  private readonly s3 = new S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_KEY_SECRET,
  });

  async upload(
    file: Express.Multer.File,
    filename: string,
  ): Promise<ManagedUpload.SendData> {
    const { mimetype } = file;
    const params = {
      Bucket: this.bucketS3,
      Key: filename,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
    };
    try {
      const s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Could not upload file');
    }
  }

  async download(key: string) {
    const options = {
      Bucket: this.bucketS3,
      Key: key,
    };
    const stream = await this.s3.getObject(options).promise();
    console.log(stream);
    return stream;
  }
}
