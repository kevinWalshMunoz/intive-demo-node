import { Router } from 'express';
import { inject, autoInjectable } from 'tsyringe';

import { UserController } from '../controllers/user.controller';

@autoInjectable()
export class UserRouter {

  public router: Router;

  constructor(@inject(UserController) private userController: UserController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/:userId', this.userController.getUserById);
    this.router.get('/', this.userController.getAllUsers);
    this.router.post('/', this.userController.createUser);
    this.router.put('/:userId', this.userController.updateUser);
    this.router.delete('/:userId', this.userController.deleteUser);
    this.router.post('/login', this.userController.login);
    this.router.put('/:userId/change-password', this.userController.changePassword);
  }
}
