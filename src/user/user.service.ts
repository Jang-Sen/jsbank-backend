import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { User } from '@user/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Provider } from '@user/entities/provider.enum';
import * as bcrypt from 'bcryptjs';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/common/cache';
import { PageDto } from '@common/dto/page.dto';
import { PageOptionsDto } from '@common/dto/page-options.dto';
import { PageMetaDto } from '@common/dto/page-meta.dto';
import { MinioClientService } from '@minio-client/minio-client.service';
import { BufferedFile } from '@minio-client/interface/file.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly minioClientService: MinioClientService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // 회원 등록 로직
  async create(dto: CreateUserDto) {
    const user = this.repository.create(dto);

    await this.repository.save(user);

    return user;
  }

  async getUserAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    // return await this.repository.find();
    const queryBuilder = this.repository.createQueryBuilder('user');

    if (pageOptionsDto.keyword) {
      queryBuilder.andWhere('user.username LIKE :username', {
        username: `%${pageOptionsDto.keyword}%`,
      });
    }

    queryBuilder
      .leftJoinAndSelect('user.comments', 'comment')
      .leftJoinAndSelect('user.agreeOfTerm', 'agreeOfTerm')
      .orderBy('user.createAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

    return new PageDto(entities, pageMetaDto);
  }

  // email or id로 회원 정보 찾기
  async getUserBy(key: 'id' | 'email', value: string) {
    const user = await this.repository.findOneBy({ [key]: value });

    if (user) {
      return user;
    }

    throw new NotFoundException(`존재하지 않은 ${key} 입니다.`);
  }

  // 토큰을 이용한 비밀번호 변경 로직
  async changePasswordWithToken(token: string, newPassword: string) {
    const { email } = await this.jwtService.verify(token, {
      secret: this.configService.get('FIND_PASSWORD_TOKEN_SECRET'),
    });

    // 유저 찾기
    const user = await this.getUserBy('email', email);

    // 소셜 로그인 계정일 경우 이용 불가
    if (user.provider !== Provider.LOCAL) {
      throw new HttpException(
        `소셜 회원은 이용 불가합니다.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // 변경할 비밀번호 암호화
    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, genSalt);

    // 비밀번호 변경
    const result = await this.repository.update(user.id, {
      password: hashedPassword,
    });

    if (!result) {
      throw new BadRequestException('Bad Request');
    }

    return 'Updated New Password.';
  }

  // Redis에 Refresh Token 저장 로직
  async refreshTokenSaveRedis(userId: string, refreshToken: string) {
    // Refresh Token 암호화
    const genSalt = await bcrypt.genSalt(10);
    const hashesRefreshToken = await bcrypt.hash(refreshToken, genSalt);

    // Redis에 userId에 대한 암호화한 Refresh Token 저장
    await this.cacheManager.set(userId, hashesRefreshToken);
  }

  // Refresh Token 검증 로직
  async refreshTokenMatch(userId: string, refreshToken: string) {
    // userId 검사
    const user = await this.getUserBy('id', userId);
    const userIdFromRedis = await this.cacheManager.get(user.id);

    // 암호화된 토큰 검사
    const refreshTokenMatch = await bcrypt.compare(
      refreshToken,
      userIdFromRedis,
    );

    if (refreshTokenMatch) {
      return user;
    }
  }

  // 유저의 토큰을 이용해 회원 확인 후, 정보 수정(프로필 사진 수정)
  async updateUserInfoByToken(
    user: User,
    img: BufferedFile,
    createUserDto?: CreateUserDto,
  ): Promise<string> {
    const newProfileImgUrl = await this.minioClientService.uploadProfileImg(
      user,
      img,
      'profile',
    );

    const result = await this.repository.update(user.id, {
      ...createUserDto,
      profileImg: newProfileImgUrl,
    });

    if (!result.affected) {
      throw new NotFoundException('User Not Found');
    }

    return 'updated';
  }
}
