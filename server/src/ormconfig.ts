import * as dotenv from 'dotenv';
dotenv.config();

export default {
  host: process.env.TYPEORM_HOST,
  type: process.env.TYPEORM_CONNECTION,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [process.env.TYPEORM_ENTITIES],
  synchronize: process.env.TYPEORM_SYNCHRONIZE,
  logging: process.env.TYPEORM_LOGGING,
};
