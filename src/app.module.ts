import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from './files/files.module';
import { CommonModule } from './common/common.module';
import { ServicesModule } from './services/services.module';
import { SearcherModule } from './searcher/searcher.module';
import { AuthModule } from './security/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASS,
      autoLoadEntities: true,
      synchronize: true,
    }),
    FilesModule,
    CommonModule,
    ServicesModule,
    SearcherModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
