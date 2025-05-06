import { Request, Response } from 'express';
import { inject, autoInjectable } from 'tsyringe';

import { UserService } from '../services/user.service';
import { INewUserRequest } from '../models/requests/user.interface';

@autoInjectable()
export class UserController {
  constructor(@inject(UserService) private userService: UserService) { }

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userName, password } = req.body;
      const userLogged = await this.userService.login(userName, password);
      if (!userLogged) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }
      const token = { data: userLogged };
      res.status(200).json(token);
    } catch (error: unknown) {
      this.handleError(error, res);
    }
  };

  createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user: INewUserRequest = req.body;
      const newUser = await this.userService.createUser(user);
      res.status(201).json(newUser);
    } catch (error: unknown) {
      this.handleError(error, res);
    }
  };

  getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error: unknown) {
      this.handleError(error, res);
    }
  };

  getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const user = await this.userService.getUserById(userId);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (error: unknown) {
      this.handleError(error, res);
    }
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const updatedData: Partial<INewUserRequest> = req.body;
      const updatedUser = await this.userService.updateUserById(userId, updatedData);
      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(updatedUser);
    } catch (error: unknown) {
      this.handleError(error, res);
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const deletedUser = await this.userService.deleteUserById(userId);

      if (!deletedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error: unknown) {
      this.handleError(error, res);
    }
  };

  changePassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const { newPassword } = req.body;

      const isPasswordChanged = await this.userService.changeUserPassword(userId, newPassword);

      if (!isPasswordChanged) {
        res.status(400).json({ message: 'Password change failed. Please check your credentials.' });
        return;
      }

      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error: unknown) {
      this.handleError(error, res);
    }
  };

  private handleError = (error: unknown, res: Response): void => {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code: number }).code === 11000
    ) {
      console.log('Duplicate key error');
      res.status(400).json('Duplicate key error');
      return;
    }
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    console.log('🚀 ~ UserController ~ error:', errorMessage);
    res.status(500).json({ error: errorMessage });
  };
}
