
/**
 * @description Validate id
 *
 * @param {Objecty} request
 * @param {Objecty} response
 * @param {Function} next
 *
 * @returns {Object} Object
 */
const validateId = (request, response, next) => {
  // If id is not a number
  if (!Number(request.params.id)) {
    return response.status(400).send({ status: 'Failure', message: 'Please input a valid ID' });
  }
  next();
};

export default validateId;

