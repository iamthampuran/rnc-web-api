import jwt from 'jsonwebtoken';

export const generateToken = (userId: number, email: string): string => {
    const secret = process.env.JWT_SECRET as string;
    return jwt.sign({ userId,email }, secret, { expiresIn: '1h' });
}