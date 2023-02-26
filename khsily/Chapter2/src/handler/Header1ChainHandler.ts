import { IMarkdownDocument } from '../markdown/MarkdownDocument';
import { Header1Visitor } from '../visitor/Header1Visitor';
import { ParseChainHandler } from './ParseChainHandler';

export class Header1ChainHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, '# ', new Header1Visitor());
  }
}
