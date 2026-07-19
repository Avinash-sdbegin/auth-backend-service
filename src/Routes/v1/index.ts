import express from "express";
import * as UserController from "../../Controllers/UserController";
import validate from "../../Middlewares/Validate";
import { signupSchema, signinSchema } from "../../Schemas/AuthSchema";
import { AuthReqValidate } from "../../Middlewares";

const router = express.Router();

/*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Register a new user'
    #swagger.description = 'Creates a new user account'

    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            name: 'Avinash Kumar',
            email: 'avinash@example.com',
            password: 'Password@123'
        }
    }

    #swagger.responses[201] = {
        description: 'User created successfully'
    }

    #swagger.responses[400] = {
        description: 'Validation Failed'
    }

    #swagger.responses[409] = {
        description: 'User already exists'
    }
*/
router.post(
    "/signup",
    validate(signupSchema),
    UserController.create
);

/*
    #swagger.tags = ['User']
    #swagger.summary = 'Get current user'
    #swagger.description = 'Returns authenticated user details'

    #swagger.responses[200] = {
        description: 'User fetched successfully'
    }

    #swagger.responses[401] = {
        description: 'Unauthorized'
    }
*/
router.get(
    "/user",
    UserController.getById
);

/*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Login user'
    #swagger.description = 'Authenticate user and return access token'

    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            email: 'avinash@example.com',
            password: 'Password@123'
        }
    }

    #swagger.responses[200] = {
        description: 'Login successful'
    }

    #swagger.responses[401] = {
        description: 'Invalid credentials'
    }
*/
router.post(
    "/signin",
    validate(signinSchema),
    UserController.signIn
);

/*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Refresh access token'
    #swagger.description = 'Generate a new access token using refresh token cookie'

    #swagger.responses[200] = {
        description: 'Access token generated successfully'
    }

    #swagger.responses[401] = {
        description: 'Refresh token missing or invalid'
    }
*/
router.post(
    "/refresh-token",
    UserController.refreshToken
);

/*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Logout user'
    #swagger.description = 'Clear refresh token cookie'

    #swagger.responses[200] = {
        description: 'Logout successful'
    }
*/
router.post(
    "/logout",
    UserController.logout
);

/*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Check authentication status'
    #swagger.description = 'Verify whether access token is valid'

    #swagger.responses[200] = {
        description: 'User is authenticated'
    }

    #swagger.responses[401] = {
        description: 'Unauthorized'
    }
*/
router.get(
    "/isAuthenticated",
    UserController.isAuthenticated
);

/*
    #swagger.tags = ['Admin']
    #swagger.summary = 'Check admin role'
    #swagger.description = 'Verify whether authenticated user has admin privileges'

    #swagger.responses[200] = {
        description: 'User is admin'
    }

    #swagger.responses[403] = {
        description: 'Access denied'
    }

    #swagger.responses[401] = {
        description: 'Unauthorized'
    }
*/
router.get(
    "/isAdmin",
    AuthReqValidate.roleReqValidate,
    UserController.isAdmin
);

export default router;