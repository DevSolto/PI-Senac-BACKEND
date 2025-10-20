import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const safeParsePort = (value?: string) => {
  if (!value) {
    return undefined;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const databaseUrl = process.env.DATABASE_URL;
const port = safeParsePort(process.env.DB_PORT);

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  ...(databaseUrl
    ? { url: databaseUrl }
    : {
        host: process.env.DB_HOST,
        port: port ?? 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      }),
  entities: [__dirname + '/../../**/*.entity.{ts,js}'],
  synchronize: false,
  logging: true,
};
