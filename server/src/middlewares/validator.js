import validator from 'validator';

/*
 * Class representing validator
 *
 * @class Validator
 */
class ValidatorHandler {
  /**
   * Check for all required input fields
   *
   * @param {object} request - The request object
   * @param {object} response - The response object
   * @param {function} next - Calls the next route handler
   * @returns {object} JSON object representing failure message
   */
  static mealFields(request, response, next) {
    const {
      title, description, price, imageUrl,
    } = request.body;
    if (title === undefined) {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'No input was received for title',
        });
    }
    if (description === undefined) {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'No input was received for description',
        });
    }
    if (price === undefined) {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'No input was received for price',
        });
    }
    if (imageUrl === undefined) {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'No input was received for imageUrl',
        });
    }
    if (validator.contains(title, '*') || validator.contains(title, '|')
    || validator.contains(title, '=') || validator.contains(title, '+')
    || validator.contains(title, '/') || validator.contains(title, '\\')
    || validator.contains(title, '#') || validator.contains(title, '%')
    || validator.contains(title, '@') || validator.contains(title, '!')
    || validator.contains(title, '$') || validator.contains(title, '[')
    || validator.contains(title, ']') || validator.contains(title, '(')
    || validator.contains(title, ')') || validator.contains(title, '&&')
    || validator.contains(title, ':') || validator.contains(title, ';')
    || validator.contains(title, '..') || validator.contains(title, ',')
    || validator.contains(title, '?') || validator.contains(title, '"')
    || validator.contains(title, '`') || validator.contains(title, '~')
    || validator.contains(title, '--') || validator.contains(title, '_')
    || validator.contains(title, '>') || validator.contains(title, '<')
    || validator.contains(title, '^') || validator.contains(title, "''")
    || validator.contains(title, '{') || validator.contains(title, '}')) {
      return response.status(400)
        .json({
          status: 'Fail',
          message: 'title contains invalid character',
        });
    }
    if (!validator.isLength(title, { min: 3, max: 20 })) {
      return response.status(406)
        .json({
          status: 'Fail',
          message: 'title should be 3 to 30 characters',
        });
    }

    if (validator.contains(title, '  ')) {
      return response.status(406)
        .json({
          status: 'Fail',
          message: 'Invalid title. Use single whitespace',
        });
    }

    if (title !== validator.trim(title, ' ')) {
      return response.status(406)
        .json({
          status: 'Fail',
          message: 'title cannot end/begin with whitespace',
        });
    }
    return next();
  }
}

export default ValidatorHandler;
