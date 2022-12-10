import { StatusCodes } from 'http-status-codes';

export class ApplicationError extends Error {
  public message: string = 'ApplicationError';

  public status: number = StatusCodes.INTERNAL_SERVER_ERROR;

  constructor(message?: string, status?: number) {
    super();
    if (message != null) {
      this.message = message;
    }
    if (status != null) {
      this.status = status;
    }
  }
}
