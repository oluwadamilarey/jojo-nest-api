import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { FileUploadService } from './services/file-upload.service';

@Module({
  providers: [PrismaService, FileUploadService],
  exports: [PrismaService, FileUploadService],
})
export class CommonModule {}
