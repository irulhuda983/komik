import { Router, Request, Response, NextFunction } from "express";
import ApiRoutes from "./api";
import { configApp } from "../config/app";

const routes = Router();

routes.use("/v1", ApiRoutes);

// Middleware 404 untuk rute yang tidak ditemukan
routes.use((req: Request, res: Response, next: NextFunction) => {
    try {
        const url = req.url;

        res.status(404).json({
            status: 404,
            message: `https://${configApp.host}${url} not found`,
        });
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
        });
    }
});

export default routes;
