import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "Auth Backend API",
        description: "Authentication Backend APIs built with Express, TypeScript, Prisma and JWT",
        version: "1.0.0"
    },

    host: "localhost:3000",

    basePath: "/",

    schemes: ["http"],

    consumes: ["application/json"],

    produces: ["application/json"],

    tags: [
        {
            name: "Auth",
            description: "Authentication APIs"
        },
        {
            name: "User",
            description: "User APIs"
        },
        {
            name: "Admin",
            description: "Admin APIs"
        }
    ],

    securityDefinitions: {
        BearerAuth: {
            type: "apiKey",
            name: "Authorization",
            in: "header",
            description: "Enter your JWT token as: Bearer <your_token>"
        }
    }
};

const outputFile = "./src/swagger-output.json";

const endpointsFiles = ["./src/index.ts"];

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
    console.log("✅ Swagger documentation generated successfully.");
});