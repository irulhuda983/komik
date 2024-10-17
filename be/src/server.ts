import express, { Express } from "express";
import { createServer } from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import multer from "multer";
import routes from "./routes/index";
import { configApp, ConfigApp } from "./config/app";
import { logger } from "./utils/logger/logger";

interface ServerConfig {
    config: ConfigApp;
}

const init = ({ config }: ServerConfig) => {
    const app: Express = express();

    app.use(express.json());
    app.use(express.urlencoded());
    app.use(multer().single("file"));
    app.use(cookieParser());
    app.use(cors());
    app.use(helmet());
    app.use("/", routes);

    return app;
};

const run = (app: any) => {
    const host = configApp.host;
    const port = Number(configApp.port);
    const httpServer = createServer(app);

    httpServer.listen(port, host, () => {
        logger.info(`⚡ Server is listening on http://${host}:${port}`);
    });
};

export { init, run };
