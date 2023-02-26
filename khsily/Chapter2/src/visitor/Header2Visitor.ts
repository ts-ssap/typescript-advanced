import { TagType } from '../constant/TagType';
import { TagTypeToHtml } from '../markdown/TagTypeToHtml';
import { VisitorBase } from './VisitorBase';

export class Header2Visitor extends VisitorBase {
  constructor() {
    super(TagType.Header2, new TagTypeToHtml());
  }
}
