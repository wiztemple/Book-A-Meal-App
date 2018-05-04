import fetchUser from '../middlewares/fetchUser';


const checkUser = (request, response, next) => {
  const { userId } = request;
  fetchUser(userId, (user) => {
    if (user == null) {
      return response.status(401).json({
        message: 'Cannot fetch user!',
      });
    }

    if (user.role !== 'caterer') {
      return response.status(401).json({
        message: 'You are not authorized to perform this operation',
      });
    }
    next();
  });
};

export default checkUser;
