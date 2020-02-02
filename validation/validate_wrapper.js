import validation from 'validation.js';

export default function validate(fieldName, value) {
  const formValues = {};
  formValues[fieldName] = value;

  const formFields = {};
  formFields[fieldName] = validation[field];


  // The formValues and validated against the formFields
  // the variable result hold the error messages of the field
  const result = validatejs(formValues, formFields);

  // If there is an error message, return it!
  if (result) {
    // Return only the field error message if there are multiple
    return result[field][0];
  }

  return null;
}
