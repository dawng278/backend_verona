import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// 1. Định nghĩa Interface cho thuộc tính của User Document
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

// 2. Định nghĩa Interface cho các phương thức của User Document
// Đảm bảo interface này có các thành viên (ví dụ: matchPassword)
export interface IUserMethods {
    matchPassword(enteredPassword: string): Promise<boolean>;
}

// 3. Định nghĩa Interface cho User Model (bao gồm cả các phương thức static nếu có)
// Model<IUser, Record<string, never>, IUserMethods> nghĩa là:
// - IUser: kiểu dữ liệu của document (thuộc tính)
// - Record<string, never>: kiểu dữ liệu của các query helpers (chỉ ra không có custom query helpers)
// - IUserMethods: kiểu dữ liệu của các instance methods
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UserModel extends Model<IUser, Record<string, never>, IUserMethods> {
    // Nếu có các phương thức static, bạn sẽ định nghĩa chúng ở đây
    // Ví dụ: findByEmail(email: string): Promise<IUser | null>;
}

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
}, {
    timestamps: true // Tự động thêm createdAt và updatedAt
});

// Hash mật khẩu trước khi lưu vào database
UserSchema.pre<IUser>('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Phương thức để so sánh mật khẩu
// Thêm kiểu 'this' tường minh để giúp TypeScript và ESLint hiểu rõ hơn ngữ cảnh
UserSchema.methods.matchPassword = async function (this: IUser & IUserMethods, enteredPassword: string): Promise<boolean> {
    // 'this' ở đây là một instance của document, nó sẽ có các thuộc tính từ IUser
    // và các phương thức từ IUserMethods nhờ vào việc khai báo Schema.
    return await bcrypt.compare(enteredPassword, this.password);
};

// Tránh lỗi ModelAlreadyDefinedError trong Next.js development mode
const User = (mongoose.models.User || mongoose.model<IUser, UserModel>('User', UserSchema)) as UserModel;

export default User;
