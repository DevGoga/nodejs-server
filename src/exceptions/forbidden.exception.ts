export class ForbiddenException extends Error {
  public readonly code = 403;

  constructor(message = 'Access denied') {
    super(message);
  }
}
