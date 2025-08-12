import jwt from 'jsonwebtoken';

/**
 * Tạo JSON Web Token (JWT) cho người dùng.
 * @param id ID của người dùng (string hoặc number).
 * @returns Chuỗi JWT.
 */
const generateToken = (id: string | number): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token hết hạn sau 1 giờ
    });
};

export default generateToken;
