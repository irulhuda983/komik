import { Router, Request, Response } from "express";
import * as KomikController from "../modules/komik/KomikController";

const routes = Router();

// auth routes
routes.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "API is ready" });
});

routes.get("/latest", KomikController.latest);

routes.get("/read-komik/:chapter", KomikController.showChapter);
routes.get("/sync-komik", KomikController.sync);

routes.get("/komik", KomikController.listKomik);
routes.get("/komik/:id", KomikController.show);
routes.get("/komik/:slug/detail", KomikController.showBySlug);

export default routes;
