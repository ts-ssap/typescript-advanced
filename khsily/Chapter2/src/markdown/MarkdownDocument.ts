export interface IMarkdownDocument {
  add(...content: string[]): void;
  get(): string;
}

export class MarkdownDocument implements IMarkdownDocument {
  private content: string = '';

  add(...content: string[]): void {
    this.content += content.join('');
  }

  get(): string {
    return this.content;
  }
}
