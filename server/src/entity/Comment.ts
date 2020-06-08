import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Post } from './Post';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @ManyToOne(type => User, author => author.comments)
  @JoinColumn({ name: 'authorId' })
  author: User;

  @ManyToOne(type => Post, post => post.comments)
  @JoinColumn({ name: 'postId' })
  post: Post;
}
