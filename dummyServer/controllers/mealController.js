import database from '../dummyData';

const { meals } = database;

class mealController {
  static addMeal(req, res) {
    const {
      mealTitle,
      description,
      price,
      imageUrl,
    } = req.body;
    const id = meals[meals.length - 1].id + 1;
    const addedMeal = {
      id,
      mealTitle,
      description,
      price,
      imageUrl,
    };
    const foundMeal = meals.find(meal =>
      (meal.mealTitle.toLowerCase() === mealTitle.toLowerCase()));
    if (!foundMeal) {
      meals.push(addedMeal);
      return res.status(201).json({
        meal: addedMeal,
        status: 'Success',
        message: 'Meal added successfully',
      });
    }
    if (foundMeal) {
      if (foundMeal.id === id) {
        return res.status(409).json({
          message: `A meal with this '${id}' is already in the meal options`,
          status: 'Fail',
        });
      }
    }
    return res.status(409).json({
      message: `A meal with this '${id}' is already in the meal options`,
      status: 'Fail',
    });
  }

  static getAllMeals(req, res) {
    return res.status(200).json({
      Allmeals: meals,
      status: 'Success',
      message: 'All meals',
    });
  }
}

export default mealController;
