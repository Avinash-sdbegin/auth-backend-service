import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import swaggerDocument from "./swagger-output.json";

import { PORT } from "./Config/ServerConfig";
import apiRoute from "./Routes";
import errorHandler from "./Middlewares/ErrorHandler";
import rateLimiter from "./Middlewares/RateLimiter";

const app = express();

const prepareAndStartServer = async (): Promise<void> => {

    // =========================
    // Security Middlewares
    // =========================
    app.use(helmet());

    app.use(cors({
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        credentials: true
    }));

    app.use(rateLimiter);

    // =========================
    // Body Parsers
    // =========================
    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // =========================
    // Cookie Parser
    // =========================
    app.use(cookieParser());

    // =========================
    // Development Logger
    // =========================
    if (process.env.NODE_ENV !== "production") {
        app.use((req: Request, res: Response, next: NextFunction): void => {
            console.log("==================================");
            console.log("Method:", req.method);
            console.log("URL:", req.originalUrl);
            console.log("Content-Type:", req.headers["content-type"]);
            console.log("Body:", req.body);
            console.log("==================================");
            next();
        });
    }

    // =========================
    // Swagger Documentation
    // =========================
    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument, {
            explorer: true,
            customSiteTitle: "Auth Backend API Docs"
        })
    );

    // =========================
    // API Routes
    // =========================
    app.use("/api", apiRoute);

    // =========================
    // Global Error Handler
    // =========================
    app.use(errorHandler);

    // =========================
    // Start Server
    // =========================
    app.listen(Number(PORT), () => {
        console.log(`🚀 Server started on port ${PORT}`);
        console.log(`📚 Swagger Docs : http://localhost:${PORT}/api-docs`);
    });
};

prepareAndStartServer();