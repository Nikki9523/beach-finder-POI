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



export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");


export const BeachSpec = Joi.object()
.keys({
  name: Joi.string().required().example("Tramore"),
  description: Joi.string().required().example("A popular beach located in Waterford"),
  longitude: Joi.number().required().example(12),
  latitude: Joi.number().required().example(-100),
  waterQuality: Joi.string().allow("").required().example("Excellent"),
  beachLength: Joi.number().allow("").optional().example(5),
})
.label("Beach");


export const BeachesArray = Joi.array().items(BeachSpec).label("BeachesArray");

export const CategorySpec = Joi.object()
.keys({
  waterQuality: Joi.string().required().example("Excellent"),
})
.label("Category");
