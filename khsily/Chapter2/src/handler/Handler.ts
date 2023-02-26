export abstract class Handler<T> {
  protected next: Handler<T> | null = null;

  setNext(next: Handler<T>): void {
    this.next = next;
  }

  handleRequest(request: T) {
    if (!this.canHandle(request) && this.next) {
      this.next.handleRequest(request);
    }
  }

  protected abstract canHandle(request: T): boolean;
}
