export class CreateStoryDto {
  readonly title: string;
  readonly story: string;
  readonly draft: boolean;
  readonly category: string[];
}
