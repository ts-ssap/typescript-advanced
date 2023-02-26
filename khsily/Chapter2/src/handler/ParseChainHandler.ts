import { IMarkdownDocument } from '../markdown/MarkdownDocument';
import { IVisitor } from '../visitor/VisitorBase';
import { IVisitable, Visitable } from '../visitor/Visitable';
import { Handler } from './Handler';
import { ParseElement } from '../markdown/Markdown';

export class LineParser {
  parse(value: string, tag: string): [boolean, string] {
    if (!value) return [false, value];
    const split = value.startsWith(`${tag}`);
    if (split) return [true, value.substr(tag.length)];
    return [false, value];
  }
}

export class ParseChainHandler extends Handler<ParseElement> {
  private readonly visitable: IVisitable = new Visitable();

  constructor(
    private readonly document: IMarkdownDocument,
    private readonly tagType: string,
    private readonly visitor: IVisitor
  ) {
    super();
  }

  protected canHandle(request: ParseElement): boolean {
    const [found, parsedStr] = new LineParser().parse(request.currentLine, this.tagType);

    if (found) {
      request.currentLine = parsedStr;
      this.visitable.accept(this.visitor, request, this.document);
    }
    return found;
  }
}
