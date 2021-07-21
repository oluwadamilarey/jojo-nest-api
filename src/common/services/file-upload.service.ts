import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { GraphQLUpload } from 'graphql-upload';
import { nanoid } from 'nanoid';

export type UploadDirectories =
  | 'profile-images'
  | 'health-professional-verification-files'
  | 'post-images'
  | 'default';

/**
 * Service for uploading files
 */
@Injectable()
export class FileUploadService {
  /**
   * Upload multiple files into storage
   *
   * @param files
   * @param directory
   */
  async uploadFiles(
    files: GraphQLUpload[],
    directory: UploadDirectories = 'default',
  ) {
    const promises = files.map(async (file) => {
      const { filename, createReadStream } = await file;
      const path = `./uploads/${directory}/${nanoid()}-${filename}`;

      return new Promise((resolve, reject) =>
        createReadStream()
          .pipe(createWriteStream(path))
          .on('finish', () => resolve({ path, filename }))
          .on('error', (error) => reject(error)),
      );
    });

    return Promise.all(promises)
      .then((data) => {
        return {
          success: true,
          message: `${files.length} file(s) uploaded successfully`,
          file_urls: data,
        };
      })
      .catch((err) => {
        throw err;
      });
  }
}
