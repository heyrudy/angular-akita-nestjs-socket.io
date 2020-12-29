import {Injectable} from '@angular/core';
import {NgEntityService} from '@datorama/akita-ng-entity-service';
import {StoryState, StoryStore} from './story.store';

@Injectable({
  providedIn: 'root'
})
export class StoryService extends NgEntityService<StoryState> {

  constructor(
    protected store: StoryStore
  ) {
    super(store);
  }
}
