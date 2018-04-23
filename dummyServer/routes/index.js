import mealController from '../controllers/mealController';

const routes = (app) => {
  app.get('/', (req, res) => {
    res.status(200).send('Welcome to Book-A-Meal');
  });

  // add a meal
  app.post('/api/v1/meals', mealController.addMeal);
};


export default routes;

