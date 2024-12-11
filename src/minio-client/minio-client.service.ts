import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { ConfigService } from '@nestjs/config';
import { User } from '@user/entities/user.entity';
import { BufferedFile } from 'minio-client/interface/file.model';
import * as crypto from 'crypto';
import { Bank } from '@bank/entities/bank.entity';

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

  // 공지사항 사진 등록
  public async uploadNoticeFiles() {}

  // 은행 사진 등록
  public async uploadBankImg(
    bank: Bank,
    file: BufferedFile,
    categoryName: string,
    baseBucket: string = this.baseBucket,
  ): Promise<string> {
    // ID에 해당하는 폴더가 존재하는 경우 삭제
    if (`${categoryName}/${bank.id}`.includes(bank.id)) {
      await this.deleteFolderContents(
        this.baseBucket,
        `${categoryName}/${bank.id}/`,
      );
    }

    // 파일이 해당 종류가 아니면 error 발생
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
    const filePath = `${categoryName}/${bank.id}/${filename}`;

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

  // 프로필 등록 로직
  public async uploadProfileImg(
    user: User,
    file: BufferedFile,
    categoryName: string,
    baseBucket: string = this.baseBucket,
  ): Promise<string> {
    // ID에 해당하는 폴더가 존재하는 경우 삭제
    if (`${categoryName}/${user.id}`.includes(user.id)) {
      await this.deleteFolderContents(
        this.baseBucket,
        `${categoryName}/${user.id}/`,
      );
    }

    // 파일이 해당 종류가 아니면 error 발생
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

  private async deleteFolderContents(bucketName: string, folderPath: string) {
    const objectList = [];
    const stream = this.client.listObjects(bucketName, folderPath, true);

    for await (const obj of stream) {
      objectList.push(obj.name);
    }

    if (objectList.length > 0) {
      await this.client.removeObjects(bucketName, objectList);
    }

    // console.log('삭제 완료: ' + result);
  }
}
