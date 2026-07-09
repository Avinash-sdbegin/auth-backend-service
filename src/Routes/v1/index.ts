import express from "express";
import * as UserController from "../../Controllers/UserController";
import { AuthReqValidate } from "../../Middlewares";

const router = express.Router();

router.post(
    "/signup",
    AuthReqValidate.authReqValidate,
    UserController.create
);

router.get(
    "/user",
    UserController.getById
);

router.post(
    "/signin",
    AuthReqValidate.authReqValidate,
    UserController.signIn
);

router.get(
    "/isAuthenticated",
    UserController.isAuthenticated
);

router.get(
    "/isAdmin",
    AuthReqValidate.roleReqValidate,
    UserController.isAdmin
);

export default router;