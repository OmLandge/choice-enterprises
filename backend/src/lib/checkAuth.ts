import { verify } from "jsonwebtoken";

export const checkAuth = (token: string) => {
    if (!token) {
        return false;
    }
    try {
        const decoded = verify(token, process.env.JWT_SECRET as string) as { username: string };
        if(!decoded.username) {
            return false;
        }
        return true;
    } catch (err) {
        return false;
    }
}