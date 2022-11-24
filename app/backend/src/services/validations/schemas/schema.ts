import * as Joi from 'joi';

export const matchSchema = Joi.object({
  homeTeam: Joi.number().required(),
  awayTeam: Joi.number().required(),
  homeTeamGoals: Joi.number().min(0).required(),
  awayTeamGoals: Joi.number().min(0).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
