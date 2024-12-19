import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from '@comment/entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@user/entities/user.entity';
import { CreateCommentDto } from '@comment/dto/create-comment.dto';
import { BankService } from '@bank/bank.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly repository: Repository<Comment>,
    private readonly bankService: BankService,
  ) {}

  // 등록
  async create(user: User, bankId: string, dto: CreateCommentDto) {
    const bank = await this.bankService.getBankById(bankId);
    const comment = this.repository.create({
      user,
      bank,
      ...dto,
    });

    await this.repository.save(comment);

    return comment;
  }
}
