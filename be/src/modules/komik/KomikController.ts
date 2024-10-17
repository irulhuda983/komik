import { Request, Response } from "express";
import HandleError from "../../utils/responses/handleError";
import * as KomikService from "./KomikService";
import { logger } from "../../utils/logger/logger";

const latest = async (req: Request, res: Response): Promise<any> => {
    try {
        const data = await KomikService.terbaru();

        return res.status(200).json({
            message: "success",
            data: data,
        });
    } catch (error) {
        return HandleError(error, res);
    }
};

const listKomik = async (req: Request, res: Response): Promise<any> => {
    try {
        const page = req.query.page ? Number(req.query.page) : 1;
        const data = await KomikService.komikTebaru(page);
        // const data = await KomikService.listKomik();

        return res.status(200).json({
            message: "success",
            data: data,
        });
    } catch (error) {
        return HandleError(error, res);
    }
};

const sync = async (req: Request, res: Response): Promise<any> => {
    try {
        const data = await KomikService.syncKomik();

        return res.status(200).json({
            message: "success",
            data: data,
        });
    } catch (error) {
        logger.error(error);
        return HandleError(error, res);
    }
};

const show = async (req: Request, res: Response): Promise<any> => {
    try {
        const data = await KomikService.findKomik(Number(req.params.id));

        return res.status(200).json({
            message: "success",
            data: data,
        });
    } catch (error) {
        return HandleError(error, res);
    }
};

const showBySlug = async (req: Request, res: Response): Promise<any> => {
    try {
        const data = await KomikService.detailKomik(String(req.params.slug));

        return res.status(200).json({
            message: "success",
            data: data,
        });
    } catch (error) {
        return HandleError(error, res);
    }
};

const showChapter = async (req: Request, res: Response): Promise<any> => {
    try {
        const data = await KomikService.getChapter(req.params.chapter);

        return res.status(200).json({
            message: "success",
            data: data,
        });
    } catch (error) {
        return HandleError(error, res);
    }
};

export { latest, listKomik, sync, show, showBySlug, showChapter };
