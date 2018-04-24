import database from '../dummyData';

const { menu } = database;

class menuController {
  static setMenu(req, res) {
    const { menuTitle, day, meals } = req.body;
    const id = menu[menu.length - 1].id + 1;
    const addedMenu = {
      id, menuTitle, day, meals,
    };
    const newLocal = menu.find(singleMenu => (singleMenu.menuTitle.toLowerCase() === menuTitle.toLowerCase()));
    const foundMenu = newLocal;
    if (!foundMenu) {
      menu.push(addedMenu);
      return res.status(201).json({
        menu: addedMenu,
        status: 'Success',
        message: 'Menu was successfully set',
      });
    }
    if (foundMenu) {
      if (foundMenu.id === id) {
        return res.status(409).json({
          message: `A menu with this '${id}' already exist`,
          status: 'Fail',
        });
      }
    }
    return res.status(409).json({
      message: `A menu with this '${id}' already exist`,
      status: 'Fail',
    });
  }
}

export default menuController;