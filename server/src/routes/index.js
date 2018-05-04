import UserController from '../controllers/UserController';
import MealController from '../controllers/MealController';
import MenuController from '../controllers/MenuController';
import verifyToken from '../middlewares/verifyToken';
import checkUser from '../middlewares/checkUser';


const routes = (app) => {
  app.post('/api/v1/auth/signup', UserController.signUp);
  app.post('/api/v1/auth/login', UserController.login);
  app.get('/api/v1/auth/users', UserController.getAllUsers);
  app.post('/api/v1/meals', verifyToken, checkUser, MealController.addMeals);
  app.delete('/api/v1/meals/:mealId', verifyToken, checkUser, MealController.deleteMeal);
  app.put('/api/v1/meals/:mealId', verifyToken, checkUser, MealController.updateMeal);
  app.get('/api/v1/meals', verifyToken, checkUser, MealController.getAllMeals);
  app.post('/api/v1/menu', verifyToken, checkUser, MenuController.addMenu);
};

export default routes;
