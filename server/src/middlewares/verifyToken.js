import jwt from 'jsonwebtoken';

/**
   * Authentication
   * @param {object} request
   * @param {object} response
   * @param {object} next to next middleware
   * @returns {object} next
   */
const verifyToken = (request, response, next) => {
  const token = request.body.token ||
  request.headers.token ||
  request.query.token;
  try {
    const verifiedToken = jwt.verify(token, process.env.SECRET);
    request.userId = verifiedToken.id;
    return next();
  } catch (error) {
    return response.status(403).json({
      message: 'Unauthorized',
    });
  }
};

export default verifyToken;
