import Joi from '@hapi/joi';

module.exports.ValidateAddUser = Joi.object()
  .keys({
    email: Joi.string()
      .required(),
    password: Joi.string()
      .required(),
    firstName: Joi.string()
      .required(),
    lastName: Joi.string()
      .required()
  });
