import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UserService } from '@user/user.service';
import { RoleGuard } from '@auth/guard/role.guard';
import { Role } from '@user/entities/role.enum';
import { User } from '@user/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { PageDto } from '@common/dto/page.dto';
import { PageOptionsDto } from '@common/dto/page-options.dto';

@ApiTags('User')
@Controller('user')
@UseGuards(RoleGuard(Role.ADMIN))
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 전체 유저 조회 API
  @Get('/all')
  async findUserAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<User>> {
    return await this.userService.getUserAll(pageOptionsDto);
  }

  // 특정 유저 찾기 API
  @Get('/:id')
  async findUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.getUserBy('id', id);
  }
}
