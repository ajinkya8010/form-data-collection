export const calculateProgress = (fields, formData) => {
    const totalRequired = fields.filter((field) => field.required).length;
    const completed = fields.filter(
      (field) => field.required && formData[field.name]
    ).length;
  
    return totalRequired === 0 ? 0 : Math.round((completed / totalRequired) * 100);
  };
  