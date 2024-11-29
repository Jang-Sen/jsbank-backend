import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { ConfigService } from '@nestjs/config';
import { User } from '@user/entities/user.entity';
import { BufferedFile } from 'minio-client/interface/file.model';
import * as crypto from 'crypto';

@Injectable()
export class MinioClientService {
  private readonly logger: Logger;
  private readonly baseBucket: string;

  public get client() {
    return this.minioService.client;
  }

  constructor(
    private readonly minioService: MinioService,
    private readonly configService: ConfigService,
  ) {
    this.logger = new Logger('MinioClientService');
    this.baseBucket = this.configService.get<string>('MINIO_BUCKET');
  }

  // 프로필 등록 로직
  public async uploadProfileImg(
    user: User,
    file: BufferedFile,
    categoryName: string,
    baseBucket: string = this.baseBucket,
  ): Promise<string> {
    console.log(file);
    if (
      !(
        file.mimetype.includes('jpg') ||
        file.mimetype.includes('jpeg') ||
        file.mimetype.includes('png')
      )
    ) {
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
    }

    const temp_filename = Date.now().toString();
    const hashedFilename = crypto
      .createHash('md5')
      .update(temp_filename)
      .digest('hex');

    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );

    const metaData = {
      'Content-Type': file.mimetype,
      'X-Amz-Meta-Testing': 1234,
    };
    const filename = `${hashedFilename}${ext}`;
    const fileBuffer = file.buffer;
    const filePath = `${categoryName}/${user.id}/${filename}`;

    // await this.client.putObject(
    //   baseBucket,
    //   filePath,
    //   fileBuffer,
    //   fileBuffer.length,
    //   metaData,
    //   function (err) => {
    //     if (err) {
    //       console.log(err);
    //
    //       throw new BadRequestException('Upload File Error: ');
    //     }
    //   },
    // );
    await new Promise<void>((resolve, reject) => {
      this.client.putObject(
        baseBucket,
        filePath,
        fileBuffer,
        fileBuffer.length,
        metaData,
        (err) => {
          if (err) {
            console.log('Error uploading file:', err.message);
            return reject(
              new HttpException('Error uploading file', HttpStatus.BAD_REQUEST),
            );
          }
          resolve();
        },
      );
    });

    return `http://${this.configService.get('MINIO_ENDPOINT')}:${this.configService.get('MINIO_PORT')}/${this.configService.get('MINIO_BUCKET')}/${filePath}`;
  }
}
