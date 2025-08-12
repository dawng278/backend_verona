import jwt from 'jsonwebtoken';

/**
 * Tạo JSON Web Token (JWT) cho người dùng.
 * @param id ID của người dùng.
 * @returns Chuỗi JWT.
 */
const generateToken = (id: string): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: '1h', // Token hết hạn sau 1 giờ
    });
};

export default generateToken;
