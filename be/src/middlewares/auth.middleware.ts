import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

// JWT
export const authenticateJWT = (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Missing token' });

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export const authorize = (requiredPermission: string) => {
    return (req: any, res: Response, next: NextFunction) => {
        const user = req.user;
        if (!user) return res.status(401).json({ message: 'Not authenticated' });

        if (user.permessi.includes(requiredPermission) || user.ruoli === 'Amministratore') {
            next();
        } else {
            return res.status(403).json({ message: 'Permession denied' });
        }
    };
};
