import { IMarkdownDocument } from '../markdown/MarkdownDocument';
import { TagType } from '../constant/TagType';
import { TagTypeToHtml } from '../markdown/TagTypeToHtml';
import { ParseElement } from '../markdown/Markdown';

export interface IVisitor {
  visit(token: ParseElement, markdownDocument: IMarkdownDocument): void;
}

export abstract class VisitorBase implements IVisitor {
  constructor(private readonly tagType: TagType, private readonly tagTypeToHtml: TagTypeToHtml) {}

  visit(token: ParseElement, markdownDocument: IMarkdownDocument): void {
    markdownDocument.add(
      this.tagTypeToHtml.openingTag(this.tagType),
      token.currentLine,
      this.tagTypeToHtml.closingTag(this.tagType)
    );
  }
}
