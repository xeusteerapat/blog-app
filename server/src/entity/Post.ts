import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
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
  author: User;

  @OneToMany(type => Comment, post => post.comment)
  comments: Comment[];
}
