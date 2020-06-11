import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Comment } from './Comment';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @ManyToOne(type => User, user => user.posts)
  @JoinColumn({ name: 'authorId' })
  author: User;

  @OneToMany(type => Comment, comment => comment.post, { onDelete: 'CASCADE' })
  comments: Comment[];
}
