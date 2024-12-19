import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '@common/entities/base.entity';
import { Comment } from '@comment/entities/comment.entity';

@Entity()
export class Bank extends Base {
  @Column()
  public bankName: string;

  @Column()
  public user: string;

  @Column()
  public amount: number;

  @Column({ nullable: true })
  public bankImg?: string;

  @OneToMany(() => Comment, (comment) => comment.bank)
  public comments: Comment[];
}
