const Joi = require("joi");

module.exports = {
  validateAddTask: (data) => {
    const schema = Joi.object({
      title: Joi.string().min(3).max(100).required(), 
      description: Joi.string().max(500).required(), 
      status: Joi.string()
        .valid("pending", "in_progress", "completed", "over_due")
        .optional(), 
      dueDate: Joi.date().greater("now").required(), 
      
    });

    return schema.validate(data, { abortEarly: false });
  },

  validateUpdateTask: (data) => {
    const schema = Joi.object({
      title: Joi.string().min(3).max(100).optional(), 
      description: Joi.string().max(500).optional(), 
      status: Joi.string()
        .valid("pending", "in_progress", "completed", "over_due")
        .optional(), 
      dueDate: Joi.date().greater("now").optional(), 
    });

    return schema.validate(data, { abortEarly: false });
  },
  validateUpdateTaskStatus: (data) => {
    const schema = Joi.object({
      status: Joi.string()
        .valid("pending", "in_progress", "completed", "over_due")
        .required(),
    });

    return schema.validate(data, { abortEarly: false });
  },
};
