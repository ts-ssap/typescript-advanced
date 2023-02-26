import { IMarkdownDocument } from '../markdown/MarkdownDocument';
import { IVisitor } from '../visitor/VisitorBase';
import { IVisitable, Visitable } from '../visitor/Visitable';
import { ParagraphVisitor } from '../visitor/ParagraphVisitor';
import { Handler } from './Handler';
import { ParseElement } from '../markdown/Markdown';

export class ParagraphHandler extends Handler<ParseElement> {
  private readonly visitable: IVisitable = new Visitable();
  private readonly visitor: IVisitor = new ParagraphVisitor();

  constructor(private readonly document: IMarkdownDocument) {
    super();
  }

  protected canHandle(request: ParseElement): boolean {
    this.visitable.accept(this.visitor, request, this.document);
    return true;
  }
}
