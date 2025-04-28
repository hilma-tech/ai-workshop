import { config } from "dotenv";
import { readFileSync } from "fs";
import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";

export function getOptions(): DataSourceOptions {
  return {
    type: "mysql",
    host: process.env.host,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: process.env.TYPEORM_LOGGING?.toLowerCase() === "on",
    synchronize: process.env.TYPEORM_SYNC?.toLowerCase() === "on",

    ssl: process.env.DB_SSL
      ? {
          cert: readFileSync(process.env.DB_SSL),
        }
      : undefined,

    migrations: ["dist/migrations/*.migration{.ts,.js}"],
    migrationsRun: true,

    entities: ["dist/**/*.entity{.ts,.js}"],
  };
}

if (process.env.MIGRATION) {
  config({ path: join(__dirname, "../.env.development") });
}
export const dataSource = process.env.MIGRATION
  ? new DataSource(getOptions())
  : {};
