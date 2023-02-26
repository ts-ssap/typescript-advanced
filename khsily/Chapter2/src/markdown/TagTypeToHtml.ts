import { TagType } from '../constant/TagType';

export class TagTypeToHtml {
  private readonly tagType: Map<TagType, string> = new Map();

  constructor() {
    this.tagType.set(TagType.Header1, 'h1');
    this.tagType.set(TagType.Header2, 'h2');
    this.tagType.set(TagType.Header3, 'h3');
    this.tagType.set(TagType.Paragraph, 'p');
    this.tagType.set(TagType.HorizontalRule, 'hr');
  }

  openingTag(tagType: TagType): string {
    return this.getTag(tagType, '<');
  }

  closingTag(tagType: TagType): string {
    return this.getTag(tagType, '</');
  }

  private getTag(tagType: TagType, openingTagPattern: string): string {
    const tag = this.tagType.get(tagType) ?? 'p';
    return `${openingTagPattern}${tag}>`;
  }
}
