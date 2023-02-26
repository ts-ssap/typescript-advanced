import { IMarkdownDocument } from '../markdown/MarkdownDocument';
import { Header3Visitor } from '../visitor/Header3Visitor';
import { ParseChainHandler } from './ParseChainHandler';

export class Header3ChainHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, '### ', new Header3Visitor());
  }
}
