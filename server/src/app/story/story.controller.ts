import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { CreateStoryDto } from './dto/create-story.dto'
import { Story, StoryService } from './story.service'

@Controller(
  'stories',
)
export class StoryController {

  constructor(
    private readonly storyService: StoryService,
  ) {
  }

  @Get()
  findAll() {
    return this.storyService.getStories()
  }

  @Post()
  create(@Body() createTodoDto: CreateStoryDto): Story {
    return this.storyService.addStory(createTodoDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Story {
    return this.storyService.removeStory(id)
  }
}
