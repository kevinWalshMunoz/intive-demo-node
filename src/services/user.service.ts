import { injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

import { User } from '../models/DB-schemas/user.schema';
import { INewUserRequest } from '../models/requests/user.interface';

@injectable()
export class UserService {

  async login (userName: string, password: string) {
    try {
      const user = await User.findOne({ userName }).collation({ locale: "en", strength: 2 });
      if (!user) {
        return false;
      }

      const isMatch = await argon2.verify(user.password, password);
      if (!isMatch) {
          return false;
      }

      const token = jwt.sign({ userName: user.userName, userId: user.userId, role: user.role }, "secretKey", { expiresIn: "1d" });
      return token;
    } catch (error: unknown) {}
  }

  async createUser(userData: INewUserRequest) {
    try {
      const userId = uuidv4();
      const hashedPassword = await argon2.hash(userData.password);  //const isMatch = await argon2.verify(hashedPassword, 'SuperSecurePassword123!');
      const user = new User({ ...userData, userId, password: hashedPassword });
      await user.save();
      return user;
    } catch (error: unknown) {
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (error: unknown) {
      throw error;
    }
  }

  async getUserById(userId: string) {
    try {
      const user = await User.findOne({userId});
      return user;
    } catch (error: unknown) {
      throw error;
    }
  }

  async updateUserById(userId: string, updateData: Partial<INewUserRequest>) {
    try {
      const user = await User.findOneAndUpdate({userId}, updateData, { new: true });
      return user;
    } catch (error: unknown) {
      throw error;
    }
  }

  async deleteUserById(userId: string) {
    try {
      const user = await User.findOneAndDelete({userId});
      return user;
    } catch (error: unknown) {
      throw error;
    }
  }

  async changeUserPassword(userId: string, newPassword: string) {
    try {
      const hashedPassword = await argon2.hash(newPassword);
      const user = await User.findOneAndUpdate(
        { userId },
        { password: hashedPassword },
        { new: true }
      );
      return user;
    } catch (error: unknown) {
      throw error;
    }
  }
}
