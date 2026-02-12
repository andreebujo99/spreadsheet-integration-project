import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {
    findUserByEmail,
    createUserRepo,
    getAllUsersRepo
} from '../repositories/auth.repository';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
const JWT_EXPIRES_IN = '1h';

export const loginService = async (email: string, password: string) => {

    const user = await findUserByEmail(email);
    if (!user) throw new Error('INVALID_CREDENTIALS');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('INVALID_CREDENTIALS');

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            ruoli: user.ruoli,
            permessi: user.permessi
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );

    return {
        id: user._id,
        email: user.email,
        ruoli: user.ruoli,
        permessi: user.permessi,
        token,
        scadenzaToken: new Date(Date.now() + 3600 * 1000),
        isLogged: true
    };
};

export const createUserService = async (
    email: string,
    password: string,
    ruoli: string,
    permessi: string[]
) => {

    const existing = await findUserByEmail(email);
    if (existing) throw new Error('EMAIL_EXISTS');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUserRepo({
        email,
        password: hashedPassword,
        ruoli,
        permessi
    });

    return {
        id: newUser._id,
        email: newUser.email,
        ruoli: newUser.ruoli,
        permessi: newUser.permessi
    };
};

export const getAllUsersService = async () => {
    return getAllUsersRepo();
};
