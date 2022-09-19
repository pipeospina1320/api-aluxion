export interface UploadFile {
  upload(file: Express.Multer.File, filename: string): Promise<T>;
}
