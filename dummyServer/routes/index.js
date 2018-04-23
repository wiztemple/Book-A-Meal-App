import mealController from '../controllers/mealController';

const routes = (app) => {
  app.get('/', (req, res) => {
    res.status(200).send('Welcome to Book-A-Meal');
  });

  // add a meal
  app.post('/api/v1/meals', mealController.addMeal);

  // get all meals
  app.get('/api/v1/meals', mealController.getAllMeals);
};


export default routes;

