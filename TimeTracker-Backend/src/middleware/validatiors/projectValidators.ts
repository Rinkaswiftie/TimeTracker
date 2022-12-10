const Joi = require('@hapi/joi');

module.exports.ValidateAddProject = Joi.object()
  .keys({
    title: Joi.string()
      .required(),
    client: Joi.string()
      .required(),
    chargePerHour: Joi.number()
      .positive()
      .required(),
    hoursEstimated: Joi.number()
      .required()
      .positive()
  });

module.exports.ValidatePatchProject = Joi.object()
  .keys({
    title: Joi.string()
      .optional(),
    client: Joi.string()
      .optional(),
    chargePerHour: Joi.number()
      .positive()
      .optional(),
    hoursEstimated: Joi.number()
      .optional()
      .positive()
  });
