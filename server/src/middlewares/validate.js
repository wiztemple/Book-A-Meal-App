import validator from 'validator';
import isEmpty from 'lodash';
/**
 * @description Validate login credentials
 *
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 *
 * @returns {Object} Object
 */
export const checkLogin = (request, response, next) => {
  const { email, password } = request.body;
  const error = {};

  if (!password) {
    error.password = 'Password is required';
  }

  if (password && validator.isEmpty(password.trim() || '')) {
    error.password = 'Password is required';
  }

  if (!email) {
    error.email = 'Email is required';
  }

  if (email && !validator.isEmail(email.trim() || '')) {
    error.email = 'Please provide a valid email address';
  }

  if (isEmpty(error)) return next();
  return response.status(400).json({ error });
};

/**
 * @description Validate signup
 *
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 *
 * @returns {Object} Object
 */
export const checkSignUp = (request, response, next) => {
  const {
    firstName, lastName, email, role, password
  } = request.body;
  const error = {};

  if (!firstName) {
    error.firstName = 'Firstname is required';
  }

  if (firstName && validator.isEmpty(firstName.trim() || '')) {
    error.firstName = 'Firstname is required';
  }

  if (!lastName) {
    error.lastName = 'lastName is required';
  }

  if (firstName && validator.isEmpty(lastName.trim() || '')) {
    error.lastName = 'lastname is required';
  }
  if (role != 'caterer' || 'customer' || 'admin') {
    error.role = 'role does not exist';
  }
  if (!password) {
    error.password = 'Password is required';
  }

  if (!email) {
    error.email = 'Email is required';
  }

  if (email && !validator.isEmail(email.trim() || '')) {
    error.email = 'Email address is empty or invalid';
  }

  if (isEmpty(error)) return next();
  return response.status(400).json({ error });
};

/**
 * @description Validate meal
 *
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 *
 * @returns {Object} Object
 */
export const checkMeal = (request, response, next) => {
  const {
    title, description, price, imageUrl
  } = request.body;

  const error = {};

  if (!title) {
    error.title = 'meal title is required';
  }

  if (title && validator.isEmpty(title.trim() || '')) {
    error.title = 'meal title is required';
  }

  if (!price) {
    error.price = 'meal price is required';
  }

  if (price && validator.isEmpty(price.trim() || '')) {
    error.price = 'meal price is required';
  }

  if (!description) {
    error.description = 'meal description is required';
  }

  if (description && validator.isEmpty(description.trim() || '')) {
    error.description = 'meal description is required';
  }
  if (!imageUrl) {
    error.imageUrl = 'imageUrl is required';
  }
  if (validator.isEmpty(error)) return next();
  return response.status(400).json({ error });
};

/**
 * @description Validate password
 *
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 *
 * @returns {Object} Object
 */
export const validatePassword = (request, response, next) => {
  if (!request.body.password || request.body.password.length < 6) {
    return response.status(400).send({
      status: 'Failure',
      message: 'Bad Request',
      errors: [{
        message: 'Password must be greater than 6',
      }],
    });
  }
  return next();
};

/**
 * @description Validate id
 *
 * @param {Objecty} request
 * @param {Objecty} response
 * @param {Function} next
 *
 * @returns {Object} Object
 */
export const validateId = (request, response, next) => {
  const { id } = request.params;

  const error = {};

  if (Number.isNaN(parseInt(id, 10))) {
    error.id = 'The Id must be a number';
  }

  if (isEmpty(error)) return next();
  return response.status(400).json({ error });
};
