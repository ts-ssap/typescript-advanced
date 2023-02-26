import { ParseElement } from '../markdown/Markdown';
import { IMarkdownDocument } from '../markdown/MarkdownDocument';
import { IVisitor } from './VisitorBase';

export interface IVisitable {
  accept(visitor: IVisitor, token: ParseElement, markdownDocument: IMarkdownDocument): void;
}

export class Visitable implements IVisitable {
  accept(visitor: IVisitor, token: ParseElement, markdownDocument: IMarkdownDocument): void {
    visitor.visit(token, markdownDocument);
  }
}
