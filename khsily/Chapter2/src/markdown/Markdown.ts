import { MarkdownDocument } from './MarkdownDocument';
import { ChainOfResponsibilityFactory } from '../handler/ChainOfResponsibilityFactory';

export class ParseElement {
  currentLine: string = '';
}

export class Markdown {
  toHtml(text: string): string {
    const document = new MarkdownDocument();
    const header1 = new ChainOfResponsibilityFactory().build(document);

    const lines = text.split('\n');
    lines.forEach((line) => {
      const parseElement = new ParseElement();
      parseElement.currentLine = line;
      header1.handleRequest(parseElement);
    });

    return document.get();
  }
}
