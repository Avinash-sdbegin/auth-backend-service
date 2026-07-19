import { Request, Response } from "express";
import UserService from "../Service/UserService";
import { OK } from "../Utils/Response";
import asyncHandler from "../Utils/asyncHandler";

const userService = new UserService();

const create = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body);

    const result = await userService.create(req.body);

    return res.status(OK).json({
        data: result,
        err: {},
        success: true,
        message: "User created successfully"
    });
});

const destroy = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.destroy(Number(req.params.id));

    return res.status(OK).json({
        data: result,
        err: {},
        success: true,
        message: "User deleted successfully"
    });
});

const getById = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.getById(Number(req.query.id));

    return res.status(OK).json({
        data: result,
        err: {},
        success: true,
        message: "User fetched successfully"
    });
});

const refreshToken = asyncHandler(async (req: Request, res: Response) => {

    const token = req.cookies.refreshToken;

    if (!token) {
        return res.status(401).json({
            data: {},
            err: "Refresh token missing",
            success: false,
            message: "Unauthorized"
        });
    }

    const accessToken =
        userService.refreshAccessToken(token);

    return res.status(OK).json({
        data: {
            accessToken
        },
        err: {},
        success: true,
        message: "Access token refreshed successfully"
    });
});

const signIn = asyncHandler(async (req: Request, res: Response) => {
    const { accessToken, refreshToken } = await userService.signIn(
        req.body.email,
        req.body.password
    );

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.status(OK).json({
        data: {
            accessToken
        },
        err: {},
        success: true,
        message: "User signed in successfully"
    });
});

const isAuthenticated = asyncHandler(async (req: Request, res: Response) => {
    const token = req.headers["x-access-token"] as string;

    const result = await userService.isAuthenticated(token);

    return res.status(OK).json({
        data: result,
        err: {},
        success: true,
        message: "User is authenticated and token is valid"
    });
});

const logout = asyncHandler(async (req: Request, res: Response) => {

    res.clearCookie("refreshToken");

    return res.status(OK).json({
        data: {},
        err: {},
        success: true,
        message: "Logged out successfully"
    });

});

const isAdmin = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.isAdmin(Number(req.query.id));

    return res.status(OK).json({
        data: result,
        err: {},
        success: true,
        message: result
            ? "User is an Admin"
            : "User is not an Admin"
    });
});

export {
    create,
    destroy,
    getById,
    signIn,
    refreshToken,
    isAuthenticated,
    logout,
    isAdmin
};