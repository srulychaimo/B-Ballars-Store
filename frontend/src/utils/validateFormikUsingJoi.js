import Joi from "joi";

export const validateFormikUsingJoi = (schema) => {
  return (values) => {
    const { error } = Joi.object(schema).validate(values, {
      abortEarly: false,
      errors: { label: "key", wrap: { label: false } },
    });

    if (!error) {
      return null;
    }

    const errors = {};
    for (const detail of error.details) {
      errors[detail.path[0]] = detail.message;
    }

    return errors;
  };
};

export default validateFormikUsingJoi;
