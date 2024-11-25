import { Column, Entity } from 'typeorm';
import { Base } from '@common/entities/base.entity';

@Entity()
export class Bank extends Base {
  @Column()
  public bankName: string;

  @Column()
  public user: string;

  @Column()
  public amount: number;
}
