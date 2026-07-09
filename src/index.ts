import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

import { PORT } from "./Config/ServerConfig";
import apiRoute from "./Routes";
import UserService from "./Service/UserService";

const app = express();

// Future use ke liye rakha hai.
// Agar kahin use nahi karna to is line ko delete kar do.
const service = new UserService();

const prepareAndStartServer = async (): Promise<void> => {
    // Body parser sabse pehle
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Request logger
    app.use((req: Request, res: Response, next: NextFunction): void => {
        console.log("==================================");
        console.log("Method:", req.method);
        console.log("URL:", req.originalUrl);
        console.log("Content-Type:", req.headers["content-type"]);
        console.log("Body:", req.body);
        console.log("==================================");
        next();
    });

    // API Routes
    app.use("/api", apiRoute);

    // Server Start
    app.listen(Number(PORT), () => {
        console.log(`🚀 Server started on port ${PORT}`);
    });
};

prepareAndStartServer();