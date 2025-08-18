// backend/src/services/authService.ts

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export type User = {
    id: string;
    name: string;
    email: string;
    role: string;
};

export type AuthResponse = {
    token?: string;
    user?: User;
    message?: string;
};

async function requestAPI(
    endpoint: "login" | "register",
    body: object
): Promise<AuthResponse> {
    // Sửa lỗi 404: Đảm bảo URL bao gồm "/api/auth"
    const url = `${BACKEND_URL}/api/auth/${endpoint}`;

    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    let data: AuthResponse;
    try {
        data = await res.json();
    } catch {
        // Xử lý lỗi SyntaxError: Khi response không phải JSON
        throw new Error("Invalid JSON response from backend");
    }

    if (!res.ok) {
        // Xử lý lỗi logic từ backend (vd: 400 Bad Request)
        throw new Error(data?.message || "Request failed");
    }

    return data;
}

export async function login(email: string, password: string) {
    return requestAPI("login", { email, password });
}

export async function register(name: string, email: string, password: string) {
    return requestAPI("register", { name, email, password });
}