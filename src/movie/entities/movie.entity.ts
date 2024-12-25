import { Column, Entity } from 'typeorm';
import { Base } from '@common/entities/base.entity';

@Entity()
export class Movie extends Base {
  @Column()
  public adult: boolean;

  @Column({ type: 'simple-array' })
  public genre_ids: number[];

  @Column()
  public mid: number;

  @Column()
  public original_language: string;

  @Column({ type: 'text' })
  public overview: string;

  @Column({ type: 'float' })
  public popularity: number;

  @Column()
  public poster_path: string;

  @Column()
  public release_date: string;
}
