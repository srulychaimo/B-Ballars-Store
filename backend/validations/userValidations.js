import Joi from "joi";
import {
  emailRegex,
  emailRegexError,
  passwordRegex,
  passwordRegexError,
} from "../utils/regex.js";

export const userLoginValidate = (userInput) => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .email()
      .required()
      .regex(emailRegex)
      .messages(emailRegexError),
    password: Joi.string()
      .min(6)
      .required()
      .regex(passwordRegex)
      .messages(passwordRegexError),
  });

  return schema.validate(userInput);
};

export const userRegisterValidate = (userInput) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string()
      .min(6)
      .email()
      .required()
      .regex(emailRegex)
      .messages(emailRegexError),
    password: Joi.string()
      .min(6)
      .required()
      .regex(passwordRegex)
      .messages(passwordRegexError),
  });

  return schema.validate(userInput);
};

export const validateEmail = (userEmail) => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .email()
      .required()
      .regex(emailRegex)
      .messages(emailRegexError),
  });

  return schema.validate(userEmail);
};

export const validatePassword = (userPassword) => {
  const schema = Joi.object({
    password: Joi.string()
      .min(6)
      .required()
      .regex(passwordRegex)
      .messages(passwordRegexError),
  });

  return schema.validate(userPassword);
};
