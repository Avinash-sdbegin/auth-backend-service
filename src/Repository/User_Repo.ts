import { PrismaClient, Prisma, Role } from "@prisma/client";

const prisma = new PrismaClient();

class UserRepository {
    async create(data: Prisma.UserUncheckedCreateInput) {
        try {
            const result = await prisma.user.create({
                data
            });

            return result;
        } catch (error: unknown) {
            console.log(error);
            throw error;
        }
    }

    async delete(userId: number) {
        try {
            await prisma.user.delete({
                where: {
                    id: userId
                }
            });

            return true;
        } catch (error: unknown) {
            console.log(`Something went wrong in UserRepository.delete(): ${error}`);
            throw error;
        }
    }

    async getById(userId: number) {
        try {
            return await prisma.user.findUnique({
                where: {
                    id: userId
                },
                select: {
                    id: true,
                    email: true
                }
            });
        } catch (error: unknown) {
            console.log(`Something went wrong in UserRepository.getById(): ${error}`);
            throw error;
        }
    }

    async getUserByEmail(userEmail: string) {
        try {
            return await prisma.user.findUnique({
                where: {
                    email: userEmail
                }
            });
        } catch (error: unknown) {
            console.log(`Something went wrong in UserRepository.getUserByEmail(): ${error}`);
            throw error;
        }
    }

    async isAdmin(userId: number) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                },
                include: {
                    role: true
                }
            });

            if (!user || !user.role) {
                return false;
            }

            return user.role.name === "ADMIN";
        } catch (error: unknown) {
            console.log(`Something went wrong in UserRepository.isAdmin(): ${error}`);
            throw error;
        }
    }

    async getRoleByName(roleName: string): Promise<Role | null> {
        try {
            return await prisma.role.findUnique({
                where: {
                    name: roleName
                }
            });
        } catch (error: unknown) {
            console.log(`Something went wrong in UserRepository.getRoleByName(): ${error}`);
            throw error;
        }
    }
}

export default UserRepository;