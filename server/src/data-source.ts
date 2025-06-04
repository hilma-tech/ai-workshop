import { config } from "dotenv";
import { readFileSync } from "fs";
import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";

export function getOptions(): DataSourceOptions {
  return {
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: process.env.TYPEORM_SYNC?.toLowerCase() === "on",
    logging: process.env.TYPEORM_LOGGING?.toLowerCase() === "on",
    ssl: process.env.DB_SSL
      ? {
          cert: readFileSync(process.env.DB_SSL),
        }
      : undefined,
    migrations: [join(__dirname, "**", "*.migration.js")],
    entities: [join(__dirname, "**", "*.entity.js")],
  };
}

if (process.env.MIGRATION) {
  config({ path: join(__dirname, "../.env.development") });
}
export const dataSource = process.env.MIGRATION
  ? new DataSource(getOptions())
  : {};
