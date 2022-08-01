import Joi from "joi";

export const userLoginValidate = (userInput) => {
  const schema = Joi.object({
    email: Joi.string().min(6).email().required(),
    password: Joi.string()
      .min(6)
      .required()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4,})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
  });

  return schema.validate(userInput);
};

export const userRegisterValidate = (userInput) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().min(6).email().required(),
    password: Joi.string()
      .min(6)
      .required()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4,})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
  });

  return schema.validate(userInput);
};
