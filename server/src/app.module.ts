import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getOptions } from "./data-source";
import { LoggerMiddleware } from "./logger/logger.middleware";
import { MessageModule } from "./message/message.module";
import { DataSource } from "typeorm"; // Import DataSource

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `.env.${process.env.NODE_ENV}`,
        `.env.${process.env.NODE_ENV}.local`,
      ],
    }),
    TypeOrmModule.forRootAsync({ useFactory: getOptions }),
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
