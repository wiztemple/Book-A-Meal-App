import db from '../models/index';


const fetchUser = (userId, next) => {
  db.User.findOne({
    where: {
      id: userId,
    },
  }).then(user => next(user));
};

export default fetchUser;

