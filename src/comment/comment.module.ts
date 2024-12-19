import { Module } from '@nestjs/common';
import { CommentController } from '@comment/comment.controller';
import { CommentService } from '@comment/comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '@comment/entities/comment.entity';
import { BankModule } from '@bank/bank.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), BankModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
