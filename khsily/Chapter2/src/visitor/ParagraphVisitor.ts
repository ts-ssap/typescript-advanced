import { TagType } from '../constant/TagType';
import { TagTypeToHtml } from '../markdown/TagTypeToHtml';
import { VisitorBase } from './VisitorBase';

export class ParagraphVisitor extends VisitorBase {
  constructor() {
    super(TagType.Paragraph, new TagTypeToHtml());
  }
}
