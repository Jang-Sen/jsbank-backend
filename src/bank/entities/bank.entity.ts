import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@bank/entities/base.entity';

@Entity()
export class Bank extends BaseEntity {
  @Column()
  public bankName: string;

  @Column()
  public user: string;

  @Column()
  public amount: number;
}
