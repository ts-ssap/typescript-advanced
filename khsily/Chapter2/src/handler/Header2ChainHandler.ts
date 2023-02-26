import { IMarkdownDocument } from '../markdown/MarkdownDocument';
import { Header2Visitor } from '../visitor/Header2Visitor';
import { ParseChainHandler } from './ParseChainHandler';

export class Header2ChainHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, '## ', new Header2Visitor());
  }
}
