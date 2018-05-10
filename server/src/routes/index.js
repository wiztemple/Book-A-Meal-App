import UserController from '../controllers/UserController';
import MealController from '../controllers/MealController';
import MenuController from '../controllers/MenuController';
import OrderController from '../controllers/OrderController';
import { checkLogin, validateId, checkSignUp } from '../middlewares/validate';
import verifyToken from '../middlewares/verifyToken';
import checkUser from '../middlewares/checkUser';


const routes = (app) => {
  app.post('/api/v1/auth/signup', checkSignUp, UserController.signUp);
  app.post('/api/v1/auth/login', checkLogin, UserController.login);
  app.get('/api/v1/auth/users', UserController.getAllUsers);
  app.post('/api/v1/meals', verifyToken, checkUser, MealController.addMeals);
  app.delete('/api/v1/meals/:mealId', verifyToken, checkUser, validateId, MealController.deleteMeal);
  app.put('/api/v1/meals/:mealId', verifyToken, checkUser, MealController.updateMeal);
  app.get('/api/v1/meals', verifyToken, checkUser, MealController.getAllMeals);
  app.post('/api/v1/menu', verifyToken, checkUser, MenuController.addMenu);
  app.get('/api/v1/menu', verifyToken, MenuController.getMenu);
  app.post('/api/v1/order', verifyToken, OrderController.makeOrder);
  app.put('/api/v1/order/:orderId', verifyToken, validateId, OrderController.updateOrder);
};

export default routes;

