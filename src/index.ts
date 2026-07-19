import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { PORT } from "./Config/ServerConfig";
import apiRoute from "./Routes";
import UserService from "./Service/UserService";
import errorHandler from "./Middlewares/ErrorHandler";

const app = express();

const service = new UserService();

const prepareAndStartServer = async (): Promise<void> => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    
    app.use((req: Request, res: Response, next: NextFunction): void => {
        console.log("==================================");
        console.log("Method:", req.method);
        console.log("URL:", req.originalUrl);
        console.log("Content-Type:", req.headers["content-type"]);
        console.log("Body:", req.body);
        console.log("==================================");
        next();
    });

    app.use("/api", apiRoute);

    // Global Error Handler
    app.use(errorHandler);

    app.listen(Number(PORT), () => {
        console.log(`🚀 Server started on port ${PORT}`);
    });
};

prepareAndStartServer();