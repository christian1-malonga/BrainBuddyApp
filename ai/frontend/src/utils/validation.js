// Validation utilities for forms

/**
 * Confirm an email address
 * @param {string} email - The email address to be validated
 * @returns {boolean} - True if the email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Confirm password
 * @param {string} password - The password to validate
 * @returns {object} - Object containing isValid and errors
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (password.length < 8) {
    errors.push('The password must contain at least 8 characters');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('The password must contain at least one capital letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('The password must contain at least one lower-case letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('The password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('The password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validates a student number
 * @param {string} studentNumber - The student number to be validated
 * @returns {boolean} - True if the number is valid
 */
export const isValidStudentNumber = (studentNumber) => {
  // Assume that the student number must contain between 6 and 12 alphanumeric characters
  const studentNumberRegex = /^[A-Za-z0-9]{6,12}$/;
  return studentNumberRegex.test(studentNumber);
};

/**
 * Enter a name (first or last name))
 * @param {string} name - The name to validate
 * @returns {boolean} - True if the name is valid
 */
export const isValidName = (name) => {
  // The name must contain at least 2 characters and only letters, spaces, hyphens and apostrophes.
  const nameRegex = /^[A-Za-zÀ-ÿ\s\-']{2,50}$/;
  return nameRegex.test(name.trim());
};

/**
 * Validates a verification code
 * @param {string} code - The code to validater
 * @param {number} length - The expected length of the code (default 6)
 * @returns {boolean} - True if the code is valid
 */
export const isValidVerificationCode = (code, length = 6) => {
  const codeRegex = new RegExp(`^\\d{${length}}$`);
  return codeRegex.test(code);
};

/**
 * Validates connection data
 * @param {object} data - Connection data
 * @returns {object} - Object containing isValid and errors
 */
export const validateLoginData = (data) => {
  const errors = {};
  
  if (!data.studentNumber || !data.studentNumber.trim()) {
    errors.studentNumber = 'The student number is required';
  } else if (!isValidStudentNumber(data.studentNumber)) {
    errors.studentNumber = 'The student number is not valid';
  }
  
  if (!data.password) {
    errors.password = 'Password required';
  } else if (data.password.length < 6) {
    errors.password = 'The password must contain at least 6 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validates registration details
 * @param {object} data - Registration data
 * @returns {object} - Object containing isValid and errors
 */
export const validateRegistrationData = (data) => {
  const errors = {};
  
  if (!data.firstName || !data.firstName.trim()) {
    errors.firstName = 'First name required';
  } else if (!isValidName(data.firstName)) {
    errors.firstName = 'The first name is not valid';
  }
  
  if (!data.lastName || !data.lastName.trim()) {
    errors.lastName = 'The name is required';
  } else if (!isValidName(data.lastName)) {
    errors.lastName = 'The name is invalid';
  }
  
  if (!data.studentNumber || !data.studentNumber.trim()) {
    errors.studentNumber = 'The student number is required';
  } else if (!isValidStudentNumber(data.studentNumber)) {
    errors.studentNumber = 'The student number is not valid';
  }
  
  if (!data.faculty || !data.faculty.trim()) {
    errors.faculty = 'The faculty is required';
  }
  
  if (!data.department || !data.department.trim()) {
    errors.department = 'The department is required';
  }
  
  if (!data.password) {
    errors.password = 'The password is requireds';
  } else {
    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errors[0]; // Making the first mistake
    }
  }
  
  if (!data.confirmPassword) {
    errors.confirmPassword = 'Password confirmation is required';
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords not match';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validates password reset data
 * @param {object} data - Reset data
 * @returns {object} - Object containing isValid and errors
 */
export const validatePasswordResetData = (data) => {
  const errors = {};
  
  if (!data.email || !data.email.trim()) {
    errors.email = 'The email address is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'The email address is invalid';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Cleans and formats a character string
 * @param {string} str - The chain to be cleaned
 * @returns {string} - The chain cleaned
 */
export const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/\s+/g, ' ');
};

/**
 * Checks if a value is empty
 * @param {any} value - The value to check
 * @returns {boolean} - True if the value is empty
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

/**
 * Generates a custom error message
 * @param {string} field - The name of the field
 * @param {string} rule - The validation rule
 * @returns {string} - The error message
 */
export const getErrorMessage = (field, rule) => {
  const messages = {
    required: `The ${field} field is required`,
    email: `Please enter a valid email address`,
    minLength: `The ${field} field must contain at least {min} characters.`,
    maxLength: `The ${field} field cannot exceed {max} characters.`,
    match: `Fields do not match`,
    pattern: `The format of the ${field} field is invalid`
  };
  
  return messages[rule] || `The ${field} field is invalid`;
};

