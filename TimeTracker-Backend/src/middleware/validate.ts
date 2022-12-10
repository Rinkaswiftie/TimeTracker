import Joi from '@hapi/joi';
import { StatusCodes } from 'http-status-codes';

const getMessageFromJoiError = (error: Joi.ValidationError): string | undefined => {
  if (!error.details && error.message) {
    return error.message;
  }
  return error.details && error.details.length > 0 && error.details[0].message
    ? `PATH: [${error.details[0].path}] ;; MESSAGE: ${error.details[0].message}` : undefined;
};

module.exports.validate = (schema: Joi.ObjectSchema) => {
  return (req: any, res: any, next: any) => {
    const { error } = schema.validate(req.body);
    const valid = error == null;
    if (valid) {
      return next();
    }
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ validation: getMessageFromJoiError(error) });
  };
};
