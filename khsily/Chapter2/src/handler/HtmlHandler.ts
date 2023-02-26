import { Markdown } from '../markdown/Markdown';

export class HtmlHandler {
  private markdownChange: Markdown = new Markdown();

  TextChangeHandler(id: string, output: string): void {
    const markdown = document.getElementById(id) as HTMLTextAreaElement;
    const markdownOutput = document.getElementById(output) as HTMLLabelElement;

    if (markdown !== null) {
      markdown.onkeyup = () => this.renderHtmlContent(markdown, markdownOutput);
      window.onload = () => this.renderHtmlContent(markdown, markdownOutput);
    }
  }

  private renderHtmlContent(markdown: HTMLTextAreaElement, markdownOutput: HTMLLabelElement) {
    const content = markdown.value ? this.markdownChange.toHtml(markdown.value) : '<p></p>';
    markdownOutput.innerHTML = content;
  }
}
