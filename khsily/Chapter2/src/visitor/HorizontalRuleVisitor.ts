import { TagType } from '../constant/TagType';
import { TagTypeToHtml } from '../markdown/TagTypeToHtml';
import { VisitorBase } from './VisitorBase';

export class HorizontalRuleVisitor extends VisitorBase {
  constructor() {
    super(TagType.HorizontalRule, new TagTypeToHtml());
  }
}
