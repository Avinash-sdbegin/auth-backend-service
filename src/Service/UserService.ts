import UserRepository from "../Repository/User_Repo";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_KEY, SALT } from "../Config/ServerConfig";
import { Prisma } from "@prisma/client";

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
                throw new Error("Customer role not found");
            }

            data.roleId = customerRole.id;
            data.password = bcrypt.hashSync(data.password, SALT);

            return await userRepository.create(data);
        } catch (error) {
            console.log("Something went wrong in UserService.create()");
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
            throw new Error("User not found");
        }

        const isMatch = this.comparePassword(user.password, plainPassword);

        if (!isMatch) {
            throw new Error("Incorrect password");
        }

        return this.createToken({
            id: user.id,
            email: user.email
        });
    }

    async isAuthenticated(token: string) {
        const decoded = this.verifyToken(token);

        const user = await userRepository.getById(decoded.id);

        if (!user) {
            throw new Error("User does not exist");
        }

        return user.id;
    }

    createToken(user: TokenPayload): string {
        return jwt.sign(user, JWT_KEY, {
            expiresIn: "1h"
        });
    }

    verifyToken(token: string): TokenPayload {
        const decoded = jwt.verify(token, JWT_KEY) as JwtPayload;

        return {
            id: decoded.id as number,
            email: decoded.email as string
        };
    }

    comparePassword(hashPassword: string, plainPassword: string): boolean {
        return bcrypt.compareSync(plainPassword, hashPassword);
    }

    async isAdmin(userId: number): Promise<boolean> {
        return await userRepository.isAdmin(userId);
    }
}

export default UserService;