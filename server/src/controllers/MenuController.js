import db from '../models/index';


export default class MenuController {
  static addMenu(request, response) {
    const {
      menuTitle,
      description,
      mealId,
      userId,
    } = request.body;
    db.Menu.findOne({
      where: {
        menuTitle,
      },
    })
      .then((menuExists) => {
        if (menuExists) {
          return response.status(409).json({
            status: 'fail',
            message: 'menu already  exists',
          });
        }
        if (!menuExists) {
          db.Menu.create({
            menuTitle, description, mealId, userId,
          })
            .then((newMenu) => {
              response.status(201).json({
                status: 'success',
                message: 'menu was successfully created',
                newMenu,
              });
            });
        }
      })
      .catch(() =>
        response.status(500).json({
          status: 'error',
          message: 'Internal server error',
        }));
  }
}
