// src/message/dto/create-message.dto.ts

import { IsString } from "class-validator";

export class CreateStoryDTO {
  @IsString()
  title: string;
}
