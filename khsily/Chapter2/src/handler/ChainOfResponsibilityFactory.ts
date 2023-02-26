import { IMarkdownDocument } from '../markdown/MarkdownDocument';
import { HorizontalRuleChainHandler } from "./HorizontalRuleChainHandler";
import { Header3ChainHandler } from "./Header3ChainHandler";
import { Header2ChainHandler } from "./Header2ChainHandler";
import { Header1ChainHandler } from "./Header1ChainHandler";
import { ParseChainHandler } from "./ParseChainHandler";
import { ParagraphHandler } from "./ParagraphHandler";


export class ChainOfResponsibilityFactory {
  build(document: IMarkdownDocument): ParseChainHandler {
    const header1 = new Header1ChainHandler(document);
    const header2 = new Header2ChainHandler(document);
    const header3 = new Header3ChainHandler(document);
    const horizontalRule = new HorizontalRuleChainHandler(document);
    const paragraph = new ParagraphHandler(document);

    header1.setNext(header2);
    header2.setNext(header3);
    header3.setNext(horizontalRule);
    horizontalRule.setNext(paragraph);

    return header1;
  }
}
