import bcrypt from 'bcrypt';
import db from '../models/index';
import jwtSigner from '../helpers/jwtSigner';

/**
 * Auth Controller.
 * @class AuthController
 * */
export default class UserController {
  /**
   * signup a user
   *
   * @param {object} request The request.
   * @param {object} response The response.
   * @returns {object} response.
   */
  static signUp(request, response) {
    const {
      firstName,
      lastName,
      email,
      role,
      password,
    } = request.body;
    db.User.findOne({
      where: {
        email,
      },
    })
      .then((userExists) => {
        if (userExists) {
          return response.status(409).json({
            status: 'Fail',
            message: 'User with that email Id exists',
          });
        }
        db.User.create({
          firstName,
          lastName,
          email,
          role,
          password,
        })
          .then((newUser) => {
            const token = jwtSigner(newUser);
            return response.status(201).json({
              status: 'success',
              message: 'Account was created',
              user: {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                role: newUser.role,
              },
              token,
            });
          });
      }).catch(error => response.status(500).json({
        status: 'error',
        message: error.message,
      }));
  }
  /**
   * login a user
   *
   * @param {object} request The request.
   * @param {object} response The response.
   * @returns {object} response.
   */
  static login(request, response) {
    const {
      email,
      password,
    } = request.body;
    db.User.findOne({
      where: {
        email,
      },
    })
      .then((foundUser) => {
        if (!foundUser) {
          response.status(404).json({
            status: 'fail',
            message: 'user does not exist',
          });
        }
        if (!bcrypt.compareSync(password, foundUser.password)) {
          response.status(404).json({
            status: 'fail',
            message: 'user does not exist',
          });
        }
        const token = jwtSigner(foundUser);
        return response.status(200).json({
          status: 'Success',
          message: 'You are logged in',
          token,
        });
      }).catch(() => {
        response.status(500).json({
          status: 'error',
          message: 'Internal server error',
        });
      });
  }
  /**
   * get all users
   *
   * @param {object} request The request.
   * @param {object} response The response.
   * @returns {object} response.
   */
  static getAllUsers(request, response) {
    return db.User.findAll().then((users) => {
      response.status(200).json({
        status: 'success',
        users,
      });
    }).catch(() => response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    }));
  }

  /**
   * update a user
   *
   * @param {object} request The request.
   * @param {object} response The response.
   * @returns {object} response.
   */
  static updateUser(request, response) {
    const { firstName, lastName } = request.body;

    return db.User.findOne({
      where: {
        id: request.userId,
      }
    }).then((foundUser) => {
      if (foundUser) {
        const update = {
          firstName,
          lastName,
        };
        foundUser.update(update).then((updatedUser) => {
          response.status(200).json({
            status: 'success',
            user: {
              firstName: updatedUser.firstName,
              lastName: updatedUser.lastName,
              email: updatedUser.email,
            },
          });
        });
      }
      if (!foundUser) {
        return response.status(404)
          .json({
            status: 'fail',
            message: `can't find user with the Id ${request.userId}`,
          });
      }
    })
      .catch(() => response.status(500).json({
        status: 'error',
        message: 'Internal server error'
      }));
  }
}
