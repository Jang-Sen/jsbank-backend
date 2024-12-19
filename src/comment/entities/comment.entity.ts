import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '@common/entities/base.entity';
import { User } from '@user/entities/user.entity';
import { Bank } from '@bank/entities/bank.entity';

@Entity()
export class Comment extends Base {
  @Column()
  public contents: string;

  @ManyToOne(() => User, (user) => user.comments)
  public user: User;

  @ManyToOne(() => Bank, (bank) => bank.comments)
  public bank: Bank;
}
