import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.HOST_DB,
  port: process.env.PORT_DB ? parseInt(process.env.PORT_DB, 10) : 5432,
  username: process.env.USER_DB,
  password: process.env.PASS_DB,
  database: process.env.SCHEMA_DB,
  entities: [__dirname + '/../../**/*.entity.{ts,js}'],
  synchronize: false,
  logging: true,
};