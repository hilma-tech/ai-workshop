import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "../entities/message.entity";
import { MessageService } from "./message.service";
import { MessageController } from "./message.controller";
import { LlmService } from "src/llm/llm.service";

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [MessageService, LlmService],
  controllers: [MessageController],
})
export class MessageModule {}
