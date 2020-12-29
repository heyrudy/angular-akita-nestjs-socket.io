import {Injectable} from '@nestjs/common';
import uuid from 'uuid';

export class Story {
  id?: string;
  title: string;
  story: string;
  draft: boolean;
  category: string[];
}

@Injectable()
export class StoryService {

  private stories: Story[] = [];

  constructor() {
  }

  getStories(): Story[] {
    return [...this.stories];
  }

  addStory(story: Story): Story {
    story.id = uuid.v4();
    this.stories.push(story);
    return story;
  }

  removeStory(id: string): Story|null {
    const index = this.stories.findIndex((td) => td.id === id);

    if (index !== -1) {
      return this.stories.splice(index, 1).pop();
    }

    return null;
  }
}
