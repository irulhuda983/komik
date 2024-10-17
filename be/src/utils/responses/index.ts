import { Response } from "express";

export interface IResponseData {
    status: number;
    message: string;
    data: any;
}

const responseData = (obj : IResponseData, res: Response) => {
    const { status, message, data } = obj;

    return res.status(status).json({ message, data });
}

export { responseData }