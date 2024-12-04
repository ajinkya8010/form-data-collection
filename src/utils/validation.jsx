export const validateFields = (fields, formData) => {
    const errors = {};
    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        errors[field.name] = `${field.label} is required.`;
      }
      if (field.type === "number" && isNaN(Number(formData[field.name]))) {
        errors[field.name] = `${field.label} must be a valid number.`;
      }
    });
    return errors;
  };
  