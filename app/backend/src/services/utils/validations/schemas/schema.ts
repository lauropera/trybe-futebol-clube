import * as Joi from 'joi';

const REQUIRED_MSG = 'All fields must be filled';
const INVALID_FIELDS_MSG = 'Incorrect email or password';

export const matchSchema = Joi.object({
  homeTeam: Joi.number().required(),
  awayTeam: Joi.number().required(),
  homeTeamGoals: Joi.number().min(0).required(),
  awayTeamGoals: Joi.number().min(0).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': REQUIRED_MSG,
    'string.email': INVALID_FIELDS_MSG,
    'any.required': REQUIRED_MSG,
  }),
  password: Joi.string().required().messages({
    'string.empty': REQUIRED_MSG,
    'any.required': REQUIRED_MSG,
  }),
});
