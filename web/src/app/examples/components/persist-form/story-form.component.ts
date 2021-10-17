import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'
import { PersistNgFormPlugin } from '@datorama/akita'
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager'
import { createStory, Story } from '../../state/story/story.model'
import { StoryQuery } from '../../state/story/story.query'
import { StoryService } from '../../state/story/story.service'

export interface StoryFormsState {
  story: Story;
}

@Component({
  selector: 'app-story-form',
  templateUrl: './story-form.component.html',
  styleUrls: ['./story-form.component.css'],
})
export class StoryFormComponent implements OnInit, OnDestroy {

  storyForm: FormGroup
  private persistForm: PersistNgFormPlugin
  private readonly LANGUAGES = ['JS', 'PHP', 'HTML', 'CSS']

  constructor(
    private readonly fb: FormBuilder,
    private readonly formsManager: AkitaNgFormsManager<StoryFormsState>,
    private readonly storyQuery: StoryQuery,
    private readonly storyService: StoryService,
  ) {
  }

  get title() {
    return this.storyForm.get('title')
  }

  get story() {
    return this.storyForm.get('story')
  }

  get draft() {
    return this.storyForm.get('draft')
  }

  get category() {
    return this.storyForm.get('category') as FormArray
  }

  ngOnInit(): void {
    this.storyForm = this.fb.group({
      title: [''],
      story: [''],
      draft: [''],
      category: this.fb.array([]),
    })
    this.addCheckboxes(this.LANGUAGES)
    this.persistForm = new PersistNgFormPlugin(
      this.storyQuery,
      createStory,
      {
        debounceTime: 300,
        formKey: 'storyForm',
      },
    ).setForm(this.storyForm, this.fb)
    this.formsManager.upsert('story', this.storyForm, { persistForm: true })
  }

  ngOnDestroy(): void {
    this.persistForm.destroy()
  }

  onSubmit(): void {
    if (this.storyForm.valid) {
      this.storyService
        .add(this.storyForm.value)
        .subscribe(() => this.persistForm.reset())
    }
  }

  onResetClick(): void {
    this.persistForm.reset()
  }

  private addCheckboxes(items: string[]): void {
    items.forEach((item: string) => {
      this.category.push(
        this.fb.group({
          name: item,
          isChecked: false,
        }),
      )
    })
  }
}
