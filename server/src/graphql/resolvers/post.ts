import { getRepository } from 'typeorm';
import { Post } from './../../entity/Post';

export const posts = async () => {
  const postRepository = getRepository(Post);
  const posts = await postRepository.find();
  return posts;
};
