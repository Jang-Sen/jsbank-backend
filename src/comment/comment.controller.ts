import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from '@comment/comment.service';
import { RequestUserInterface } from '@auth/interface/requestUser.interface';
import { CreateCommentDto } from '@comment/dto/create-comment.dto';
import { TokenGuard } from '@auth/guard/token.guard';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // 댓글 등록
  @Post('/:bankId')
  @UseGuards(TokenGuard)
  @ApiParam({ name: 'id', description: '은행 ID' })
  async createComment(
    @Req() req: RequestUserInterface,
    @Param('bankId') bankId: string,
    @Body() dto: CreateCommentDto,
  ) {
    return await this.commentService.create(req.user, bankId, dto);
  }

  // 댓글 조회(유저 ID로 조회)
  @Get('/:userId')
  @ApiParam({ name: 'userId', description: '유저 ID' })
  async findCommentByUserId(@Param('userId') userId: string) {
    return await this.commentService.findCommentByUserId(userId);
  }

  // 댓글 조회(은행 ID로 조회)
  @Get('/:bankId')
  @ApiParam({ name: 'bankId', description: '은행 ID' })
  async findCommentByBankId(@Param('bankId') bankId: string) {
    return await this.commentService.findCommentByBankId(bankId);
  }
}
