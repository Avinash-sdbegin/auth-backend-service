import UserRepository from "../Repository/User_Repo";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_KEY, REFRESH_JWT_KEY, SALT } from "../Config/ServerConfig";
import { Prisma } from "@prisma/client";
import NotFoundError from "../Errors/NotFoundError";
import UnauthorizedError from "../Errors/UnauthorizedError";

const userRepository = new UserRepository();

interface TokenPayload {
    id: number;
    email: string;
}

class UserService {
    async create(data: Prisma.UserUncheckedCreateInput) {
        try {
            const customerRole = await userRepository.getRoleByName("CUSTOMER");

            if (!customerRole) {
                throw new NotFoundError("Customer role not found");
            }

            data.roleId = customerRole.id;
            data.password = bcrypt.hashSync(data.password, SALT);

            return await userRepository.create(data);
        } catch(error: any) {
            console.error("Something went wrong in UserService.create()");
            throw error;
        }
    }

    async destroy(userId: number) {
        return await userRepository.delete(userId);
    }

    async getById(userId: number) {
        return await userRepository.getById(userId);
    }

    async signIn(email: string, plainPassword: string) {
        const user = await userRepository.getUserByEmail(email);

        if (!user) {
            throw new NotFoundError("User not found");
        }

        const isMatch = this.comparePassword(user.password, plainPassword);

        if (!isMatch) {
            throw new UnauthorizedError("Incorrect password");
        }

        const payload: TokenPayload = {
            id: user.id,
            email: user.email,
        };

        return {
            accessToken: this.createToken(payload),
            refreshToken: this.createRefreshToken(payload),
        };
    }

    async isAuthenticated(token: string) {
        const decoded = this.verifyToken(token);

        const user = await userRepository.getById(decoded.id);

        if (!user) {
            throw new UnauthorizedError("User does not exist");
        }

        return user.id;
    }

    createToken(user: TokenPayload): string {
        return jwt.sign(user, JWT_KEY, {
            expiresIn: "1h",
        });
    }

    createRefreshToken(user: TokenPayload): string {
        return jwt.sign(user, REFRESH_JWT_KEY, {
            expiresIn: "7d",
        });
    }

    verifyToken(token: string): TokenPayload {
        try {
            const decoded = jwt.verify(token, JWT_KEY) as JwtPayload;

            return {
                id: decoded.id as number,
                email: decoded.email as string,
            };
        } catch {
            throw new UnauthorizedError("Invalid or expired token");
        }
    }

    verifyRefreshToken(token: string): TokenPayload {
        try {
            const decoded = jwt.verify(
                token,
                REFRESH_JWT_KEY
            ) as JwtPayload;

            return {
                id: decoded.id as number,
                email: decoded.email as string
            };
        } catch {
            throw new UnauthorizedError("Invalid or expired refresh token");
        }
    }

    refreshAccessToken(refreshToken: string): string {
        const user = this.verifyRefreshToken(refreshToken);

        return this.createToken({
            id: user.id,
            email: user.email
        });
    }

    comparePassword(hashPassword: string, plainPassword: string): boolean {
        return bcrypt.compareSync(plainPassword, hashPassword);
    }

    async isAdmin(userId: number): Promise<boolean> {
        return await userRepository.isAdmin(userId);
    }
}

export default UserService;