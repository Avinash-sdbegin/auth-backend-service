import { Request, Response } from "express";
import UserService from "../Service/UserService";
import { OK, INTERNAL_SERVER_ERROR } from "../Utils/Response";

const userService = new UserService();

const create = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const result = await userService.create(req.body);
        return res.status(OK).json({
            data: result,
            err: {},
            success: true,
            message: "User created successfully"
        });
    } catch (error: unknown) {
        console.log((error as { explanation: string }).explanation || 'something went wrong');
        return res.status((error as { statusCode: number }).statusCode || INTERNAL_SERVER_ERROR).json({
            data: {},
            err: (error as { explanation: string }).explanation || 'somethign went wrong',
            success: false,
            message: (error as { message: string }).message || 'can not create user'
        });
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const result = await userService.destroy(Number(req.params.id));
        return res.status(OK).json({
            data: result,
            err: {},
            success: true,
            message: "User deleted successfully"
        });
    } catch (error: unknown) {
        console.log((error as { explanation: string }).explanation || 'something went wrong');
        return res.status((error as { statusCode: number }).statusCode || INTERNAL_SERVER_ERROR).json({
            data: {},
            err: (error as { explanation: string }).explanation || 'something went wrong',
            success: false,
            message: (error as { message: string }).message || 'can not delete user'
        });
    }
}

const getById = async (req: Request, res: Response) => {
    try {
        const result = await userService.getById(Number(req.query.id));
        return res.status(OK).json({
            data: result,
            err: {},
            success: true,
            message: "User fetched successfully"
        });
    } catch (error: unknown) {
        console.log((error as { explanation: string }).explanation || 'something went wrong');
        return res.status((error as { statusCode: number }).statusCode || INTERNAL_SERVER_ERROR).json({
            data: {},
            err: (error as { explanation: string }).explanation || 'something went wrong',
            success: false,
            message: (error as { message: string }).message || 'can not fetch user'
        });
    }
}

const signIn = async (req: Request, res: Response) => {
    try {
        const result = await userService.signIn(req.body.email, req.body.password);
        return res.status(OK).json({
            data: result,
            err: {},
            success: true,
            message: "User signedIn successfully"
        });
    } catch (error: unknown) {
        console.log((error as { explanation: string }).explanation || 'something went wrong');
        return res.status((error as { statusCode: number }).statusCode || INTERNAL_SERVER_ERROR).json({
            data: {},
            err: (error as { explanation: string }).explanation || 'something went wrong',
            success: false,
            message: (error as { message: string }).message || 'can not signIn'
        });
    }
}

const isAuthenticated = async (req: Request, res: Response) => {
    try {
        console.log("Headers:", req.headers);

        const token = req.headers["x-access-token"] as string;

        console.log("Token:", token);
        console.log("Type:", typeof token);

        const result = await userService.isAuthenticated(token);

        return res.status(OK).json({
            data: result,
            err: {},
            success: true,
            message: "User is authenticated and token is valid"
        });
    } catch (error: unknown) {
        console.log((error as { explanation: string }).explanation || 'something went wrong');

        return res.status((error as { statusCode: number }).statusCode || INTERNAL_SERVER_ERROR).json({
            data: {},
            err: (error as { explanation: string }).explanation || 'something went wrong',
            success: false,
            message: (error as { message: string }).message || 'can not signIn'
        });
    }
}

const isAdmin = async (req: Request, res: Response) => {
    try {
        const result = await userService.isAdmin(Number(req.query.id));
        // if (result) return res.status(OK).json({
        //     data: result,
        //     err: {},
        //     success: true,
        //     message: "User authenticated"
        // });
        // return res.status(OK).json({
        //     data: result,
        //     err: {},
        //     success: true,
        //     message: "User not authenticated"
        // });
        if (result) {
            return res.status(OK).json({
                data: result,
                err: {},
                success: true,
                message: "User is an Admin"
            });
        }

        return res.status(OK).json({
            data: result,
            err: {},
            success: true,
            message: "User is not an Admin"
        });
    } catch (error: unknown) {
        console.log((error as { explanation: string }).explanation || 'something went wrong');
        return res.status((error as { statusCode: number }).statusCode || INTERNAL_SERVER_ERROR).json({
            data: {},
            err: (error as { explanation: string }).explanation || 'something went wrong',
            success: false,
            message: (error as { message: string }).message || 'can not authenticated user'
        });
    }
}

export {
    create,
    destroy,
    getById,
    signIn,
    isAuthenticated,
    isAdmin
};