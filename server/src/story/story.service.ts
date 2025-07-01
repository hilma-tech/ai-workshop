import { Injectable } from "@nestjs/common";
import { DEFAULT_SYSTEM_PROMPT } from "src/common/system-prompts/DefaultSystemPrompt";
import { LlmService } from "src/llm/llm.service";
import { CreateStoryDTO } from "./dto/create-story.dto";

@Injectable()
export class StoryService {
  constructor(private readonly llmService: LlmService) {}
  async getStory({ title }: CreateStoryDTO) {
    const response = await this.llmService.callOpenAI({
      input: title, // title to the story
      systemPrompt: DEFAULT_SYSTEM_PROMPT,
    });
    try {
      const formatResponse = JSON.parse(response || "{}");
      if (typeof formatResponse === "object") {
        return formatResponse;
      }
    } catch (e) {
      return response;
    }
  }
}
