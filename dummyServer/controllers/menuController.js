import database from '../dummyData';

const { menu } = database;

class MenuController {
  static setMenu(request, response) {
    const { menuTitle, day, meals } = request.body;
    const id = menu[menu.length - 1].id + 1;
    const addedMenu = {
      id, menuTitle, day, meals,
    };
    const newMenu = menu.find(singleMenu => (singleMenu.menuTitle.toLowerCase() === menuTitle.toLowerCase()));
    const foundMenu = newMenu;
    if (!foundMenu) {
      menu.push(addedMenu);
      return response.status(201).json({
        menu: addedMenu,
        status: 'Success',
        message: 'Menu was successfully set',
      });
    }
    return response.status(409).json({
      message: `A menu with this '${id}' already exist`,
      status: 'Fail',
    });
  }

  static getMenu(request, response) {
    response.status(200).json({
      availableMenu: menu,
      status: 'Success',
      message: 'Available Menu',
    });
  }
}

export default MenuController;
