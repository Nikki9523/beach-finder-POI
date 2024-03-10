import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("UserDetails");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");



export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const BeachSpec = {
  name: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  longitude: Joi.number().required(),
  latitude: Joi.number().required(),
  waterQuality: Joi.string().allow("").optional(),
  beachLength: Joi.number().allow("").optional(),
};

export const CategorySpec = {
  title: Joi.string().required(),
};
