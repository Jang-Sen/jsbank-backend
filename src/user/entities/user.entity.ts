import { BeforeInsert, Column, Entity } from 'typeorm';
import { BaseEntity } from '../../bank/entities/base.entity';
import * as bcrypt from 'bcrypt';
import * as gravatar from 'gravatar';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  @Column()
  public username: string;

  @Column({ nullable: true })
  @Exclude()
  public password?: string;

  @Column({ unique: true })
  public email: string;

  @Column({ nullable: true })
  public phone?: number;

  @Column({ nullable: true })
  public profileImg?: string;

  @BeforeInsert()
  async beforeFunction() {
    // 패스워드 암호화
    const saltValue = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, saltValue);

    // 프로필 사진 자동생성
    this.profileImg = await gravatar.url(this.email, {
      s: '200',
      r: 'pg',
      d: 'mm',
      protocol: 'https',
    });
  }
}
