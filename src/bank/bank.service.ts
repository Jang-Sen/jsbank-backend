import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from '@bank/entities/bank.entity';
import { CreateBankDto } from '@bank/dto/create-bank.dto';
import { UpdateBankDto } from '@bank/dto/update-bank.dto';
import { PageDto } from '@common/dto/page.dto';
import { PageOptionsDto } from '@common/dto/page-options.dto';
import { PageMetaDto } from '@common/dto/page-meta.dto';
import { MinioClientService } from '@minio-client/minio-client.service';
import { BufferedFile } from '@minio-client/interface/file.model';
import { CACHE_MANAGER } from '@nestjs/common/cache';
import { Cache } from 'cache-manager';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank)
    private repository: Repository<Bank>,
    private readonly minioClientService: MinioClientService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  // 은행 전체 조회
  async getAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Bank>> {
    // return await this.repository.find();
    const redisProduct: any = await this.cache.get('bank');
    const queryBuilder = this.repository.createQueryBuilder('bank');

    if (pageOptionsDto.keyword) {
      queryBuilder.andWhere(
        'bank.bankName LIKE :keyword OR bank.name = :keyword',
        {
          keyword: `%${pageOptionsDto.keyword}%`,
        },
      );
    }

    queryBuilder
      .leftJoinAndSelect('bank.comments', 'comment')
      .orderBy('bank.createAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

    if (redisProduct) {
      console.log('기존에 데이터가 Redis에 저장되어서 Redis에서 갖고옴');
      return new PageDto(redisProduct, pageMetaDto);
    } else {
      console.log('Redis에 데이터 저장 후, DB에서 갖고온 데이터');
      await this.cache.set('bank', entities);
      return new PageDto(entities, pageMetaDto);
    }
  }

  // 은행 상세 조회
  async getBankById(id: string) {
    const bank = await this.repository.findOneBy({ id });

    if (!bank) {
      throw new NotFoundException('찾을 수 없는 계좌입니다.');
    }

    return bank;
  }

  // 계좌 생성
  async create(dto: CreateBankDto) {
    const bank = this.repository.create(dto);
    await this.repository.save(bank);

    await this.cache.del('bank');

    return bank;
  }

  // 계좌 삭제
  async delete(id: string): Promise<string> {
    const result = await this.repository.delete({ id });

    if (!result.affected) {
      throw new NotFoundException('찾을 수 없는 계좌입니다.');
    }

    return '삭제 완료';
  }

  // 계좌 수정
  async update(
    id: string,
    dto?: UpdateBankDto,
    img?: BufferedFile,
  ): Promise<string> {
    const bank = await this.getBankById(id);
    const uploadUrl = await this.minioClientService.uploadBankImg(
      bank,
      img,
      'bank',
    );

    const result = await this.repository.update(id, {
      ...dto,
      bankImg: uploadUrl,
    });

    if (!result.affected) {
      throw new NotFoundException('찾을 수 없는 계좌입니다.');
    }

    return '수정 완료';
  }
}
