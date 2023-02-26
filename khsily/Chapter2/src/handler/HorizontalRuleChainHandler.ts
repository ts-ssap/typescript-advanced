import { IMarkdownDocument } from '../markdown/MarkdownDocument';
import { HorizontalRuleVisitor } from '../visitor/HorizontalRuleVisitor';
import { ParseChainHandler } from './ParseChainHandler';

export class HorizontalRuleChainHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, '---', new HorizontalRuleVisitor());
  }
}
