import bcrypt from 'bcrypt';
import db from '../models/index';
import jwtSigner from '../helpers/jwtSigner';


export default class UserController {
  /**
   *
   * @param {object} request ,
   * @param {*object} response ,
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
      }).catch(() => response.status(500).json({
        status: 'error',
        message: 'internal server error',
      }));
  }
  /**
 *
 * @param {object} request,
 * @param {object} response,
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
          token,
          foundUser: {
            id: foundUser.id,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            email: foundUser.email,
            role: foundUser.role,
          },
        });
      }).catch(() => {
        response.status(500).json({
          status: 'error',
          message: 'Internal server error',
        });
      });
  }
  /**
 *
 * @param {object} request,
 * @param {object} response,
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
}
