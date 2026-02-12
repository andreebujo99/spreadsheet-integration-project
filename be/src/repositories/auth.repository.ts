import { User, IUser } from '../models/user';

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
    return User.findOne({ email });
};

export const createUserRepo = async (data: Partial<IUser>): Promise<IUser> => {
    return User.create(data);
};

export const getAllUsersRepo = async (): Promise<IUser[]> => {
    return User.find().select('-password');
};
