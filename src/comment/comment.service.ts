import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from '@comment/entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@user/entities/user.entity';
import { CreateCommentDto } from '@comment/dto/create-comment.dto';
import { BankService } from '@bank/bank.service';
import { UserService } from '@user/user.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly repository: Repository<Comment>,
    private readonly bankService: BankService,
    private readonly userService: UserService,
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

  // 조회(유저 ID로 Comment 조회)
  async findCommentByUserId(userId: string) {
    const user = await this.userService.getUserBy('id', userId);
    const comments = await this.repository.find({
      where: {
        user: {
          id: user.id,
        },
      },
      relations: ['user', 'bank'],
    });

    return comments;
  }

  // 조회(은행 ID로 Comment 조회)
  async findCommentByBankId(bankId: string) {
    const bank = await this.bankService.getBankById(bankId);

    const comments = await this.repository.find({
      where: {
        bank: {
          id: bank.id,
        },
      },
      relations: ['user', 'bank'],
    });

    return comments;
  }

  // 삭제(작성자 본인만)
  async deleteCommentOnlySelf(user: User, id: string): Promise<string> {
    const comment = await this.repository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });

    if (!comment) {
      throw new NotFoundException('댓글을 찾을 수 없습니다.');
    }

    if (comment.user.id !== user.id) {
      throw new ForbiddenException('작성자만 삭제 가능합니다.');
    }

    await this.repository.remove(comment);

    return '삭제 완료';
  }
}
