import { StatusCodes } from 'http-status-codes';
import { ApplicationError } from './application-error';

export class UnauthorizedRequest extends ApplicationError {
  constructor(message?: string) {
    super(message || 'Unauthorized', StatusCodes.UNAUTHORIZED);
  }
}
