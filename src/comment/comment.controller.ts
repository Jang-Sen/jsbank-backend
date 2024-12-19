import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CommentService } from '@comment/comment.service';
import { RequestUserInterface } from '@auth/interface/requestUser.interface';
import { CreateCommentDto } from '@comment/dto/create-comment.dto';
import { TokenGuard } from '@auth/guard/token.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/:bankId')
  @UseGuards(TokenGuard)
  async createComment(
    @Req() req: RequestUserInterface,
    @Param('bankId') bankId: string,
    @Body() dto: CreateCommentDto,
  ) {
    return await this.commentService.create(req.user, bankId, dto);
  }
}
