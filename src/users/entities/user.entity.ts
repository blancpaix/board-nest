import { UUID } from 'crypto';
import { Board } from 'src/boards/entities/board.entity';
import {
  Column,
  Entity,
  Generated,
  Index,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  @Generated('uuid')
  idx: UUID;

  @Column({
    type: 'varchar',
    length: 12,
    unique: true,
  })
  displayName: string;

  @Index({ unique: true })
  @Column({
    type: 'varchar',
    length: 50,
  })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Board, (board) => board.idx)
  boards: Board[];
}
