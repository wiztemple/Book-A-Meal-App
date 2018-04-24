import mealController from '../controllers/mealController';

const routes = (app) => {
  app.get('/', (req, res) => {
    res.status(200).send('Welcome to Book-A-Meal');
  });

  // add a meal
  app.post('/api/v1/meals', mealController.addMeal);
  // get all meals
  app.get('/api/v1/meals', mealController.getAllMeals);
  // update all meals
  app.put('/api/v1/meals/:mealId', mealController.updateMeal);
  // remove a meal
  app.delete('/api/v1/meals/:mealId', mealController.removeMeal);
};


export default routes;

