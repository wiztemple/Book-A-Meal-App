import UserController from '../controllers/UserController';


const routes = (app) => {
  app.post('/api/v1/auth/signup', UserController.signUp);
  app.post('/api/v1/auth/login', UserController.login);
};

export default routes;
