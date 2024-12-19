import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from '@comment/comment.service';
import { RequestUserInterface } from '@auth/interface/requestUser.interface';
import { CreateCommentDto } from '@comment/dto/create-comment.dto';
import { TokenGuard } from '@auth/guard/token.guard';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateCommentDto } from '@comment/dto/update-comment.dto';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // 댓글 등록
  @Post('/:bankId')
  @UseGuards(TokenGuard)
  @ApiParam({ name: 'bankId', description: '은행 ID' })
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

  // 댓글 삭제(작성자만)
  @Delete('/:commentId')
  @UseGuards(TokenGuard)
  @ApiParam({ name: 'commentId', description: '댓글 ID' })
  async deleteCommentOnlySelf(
    @Req() req: RequestUserInterface,
    @Param('commentId') id: string,
  ) {
    return await this.commentService.deleteCommentOnlySelf(req.user, id);
  }

  // 댓글 수정(작성자만)
  @Put('/:commentId')
  @UseGuards(TokenGuard)
  @ApiParam({ name: 'commentId', description: '댓글 ID' })
  async updateCommentOnlySelf(
    @Req() req: RequestUserInterface,
    @Param('commentId') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return await this.commentService.updateCommentOnlySelf(
      req.user,
      id,
      updateCommentDto,
    );
  }
}
