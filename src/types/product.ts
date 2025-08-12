export interface ProductInput {
    id: string;
    name: string;
    price: number;
    image: string;
    category?: string;
    description?: string;
    // thêm các trường khác nếu cần
}