import { Module } from "@nestjs/common";
import { StoryService } from "./story.service";
import { StoryController } from "./story.controller";
import { LlmService } from "src/llm/llm.service";

@Module({
  imports: [],
  providers: [StoryService, LlmService],
  controllers: [StoryController],
})
export class StoryModule {}
