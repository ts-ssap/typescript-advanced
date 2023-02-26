import { TagType } from '../constant/TagType';
import { TagTypeToHtml } from '../markdown/TagTypeToHtml';
import { VisitorBase } from './VisitorBase';

export class Header1Visitor extends VisitorBase {
  constructor() {
    super(TagType.Header1, new TagTypeToHtml());
  }
}
