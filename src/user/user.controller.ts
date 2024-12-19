import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '@user/user.service';
import { RoleGuard } from '@auth/guard/role.guard';
import { Role } from '@user/entities/role.enum';
import { User } from '@user/entities/user.entity';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PageDto } from '@common/dto/page.dto';
import { PageOptionsDto } from '@common/dto/page-options.dto';
import { TokenGuard } from '@auth/guard/token.guard';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { RequestUserInterface } from '@auth/interface/requestUser.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { BufferedFile } from '@minio-client/interface/file.model';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 전체 유저 조회 API
  @Get('/all')
  @UseGuards(RoleGuard(Role.ADMIN))
  async findUserAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<User>> {
    return await this.userService.getUserAll(pageOptionsDto);
  }

  // 특정 유저 찾기 API
  @Get('/:id')
  @UseGuards(RoleGuard(Role.ADMIN))
  async findUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.getUserBy('id', id);
  }

  // 유저의 프로필 변경 API
  @Put()
  @UseGuards(TokenGuard)
  @UseInterceptors(FileInterceptor('profileImg'))
  @ApiBody({
    description: 'test',
    schema: {
      type: 'object',
      properties: {
        profileImg: {
          type: 'string',
          format: 'binary',
          description: 'profileImg',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  async updateUserProfile(
    @Req() req: RequestUserInterface,
    @Body() updateUserDto?: CreateUserDto,
    @UploadedFile() profileImg?: BufferedFile,
  ) {
    return await this.userService.updateUserInfoByToken(
      req.user,
      profileImg,
      updateUserDto,
    );
  }
}
