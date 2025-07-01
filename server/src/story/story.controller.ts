import { Body, Controller, Post } from "@nestjs/common";
import { StoryService as StoryService } from "./story.service";
import { CreateStoryDTO } from "./dto/create-story.dto";

@Controller("story")
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post("generate-story")
  postCreateStory(@Body() { title }: CreateStoryDTO) {
    return this.storyService.getStory({ title });
  }
}
