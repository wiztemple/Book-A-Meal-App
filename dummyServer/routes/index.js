import MealController from '../controllers/mealController';
import MenuController from '../controllers/menuController';
import OrderController from '../controllers/orderController';

const routes = (app) => {
  app.get('/', (req, res) => {
    res.status(200).send('Welcome to Book-A-Meal');
  });

  // add a meal
  app.post('/api/v1/meals', MealController.addMeal);
  // get all meals
  app.get('/api/v1/meals', MealController.getAllMeals);
  // update all meals
  app.put('/api/v1/meals/:mealId', MealController.updateMeal);
  // remove a meal
  app.delete('/api/v1/meals/:mealId', MealController.removeMeal);

  // set a menu
  app.post('/api/v1/menu', MenuController.setMenu);

  // get all menu
  app.get('/api/v1/menu', MenuController.getMenu);

  // make order
  app.post('/api/v1/order', OrderController.orderMeal);
  // get all orders
  app.get('/api/v1/order', OrderController.getAllOrders);
};


export default routes;

