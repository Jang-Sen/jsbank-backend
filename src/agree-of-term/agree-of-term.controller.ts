import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AgreeOfTermService } from './agree-of-term.service';
import { TokenGuard } from '@auth/guard/token.guard';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateAgreeOfTermDto } from '@root/agree-of-term/dto/create-agree-of-term.dto';
import { RequestUserInterface } from '@auth/interface/requestUser.interface';
import { UpdateAgreeOfTermDto } from '@root/agree-of-term/dto/update-agree-of-term.dto';

@ApiTags('terms')
@Controller('agree-of-term')
export class AgreeOfTermController {
  constructor(private readonly agreeOfTermService: AgreeOfTermService) {}

  // 이용약관 생성 API
  @Post()
  @UseGuards(TokenGuard)
  @ApiBody({ type: CreateAgreeOfTermDto })
  async createAgreeOfTerm(
    @Req() req: RequestUserInterface,
    @Body() dto: CreateAgreeOfTermDto,
  ) {
    return await this.agreeOfTermService.createAgreeOfTerm(req.user, dto);
  }

  // 이용약관 수정 API
  @Put()
  @UseGuards(TokenGuard)
  @ApiBody({ type: CreateAgreeOfTermDto })
  @ApiBearerAuth()
  async updateAgreeOfTerm(
    @Req() req: RequestUserInterface,
    @Body() dto: UpdateAgreeOfTermDto,
  ) {
    return await this.agreeOfTermService.updateAgreeOfTerm(req.user, dto);
  }
}
