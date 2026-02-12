import { NextFunction, Request, Response } from 'express';
import {
  loginService,
  createUserService,
  getAllUsersService
} from '../services/auth.service';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const { email, password } = req.body;

    const result = await loginService(email, password);

    res.json(result);

  } catch (err) {
    next(err);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const { email, password, ruoli, permessi } = req.body;

    const user = await createUserService(
      email,
      password,
      ruoli,
      permessi
    );

    res.status(201).json({
      message: 'User created',
      user
    });

  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const users = await getAllUsersService();
    res.json(users);

  } catch (err) {
    next(err);
  }
};
