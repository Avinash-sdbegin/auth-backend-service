import express from "express";
import * as UserController from "../../Controllers/UserController";
import validate from "../../Middlewares/Validate";
import { signupSchema, signinSchema } from "../../Schemas/AuthSchema";
import { AuthReqValidate } from "../../Middlewares";

const router = express.Router();

router.post(
    "/signup",
    validate(signupSchema),
    UserController.create
);

router.get(
    "/user",
    UserController.getById
);

router.post(
    "/signin",
    validate(signinSchema),
    UserController.signIn
);

router.post(
    "/refresh-token",
    UserController.refreshToken
);

router.post(
    "/logout",
    UserController.logout
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