import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const BeachSpec = {
  name: Joi.string().required(),
  location: Joi.string().required(),
  description: Joi.string().required(),
  longitude: Joi.number().required(),
  latitude: Joi.number().required(),
  waterQuality: Joi.string().allow("").optional(),
  beachLength: Joi.number().allow("").optional(),
};

export const LocationSpec = {
  title: Joi.string().required(),
};
