export class NotAuthorized extends Error {
  public readonly code = 401;

  constructor(message = 'Unauthorized') {
    super(message);
  }
}
