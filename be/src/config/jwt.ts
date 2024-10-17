import jwt, { JwtPayload } from "jsonwebtoken";
import { configApp } from "./app";

interface IJwtPayload {
    id: number;
    username: string;
}

const generateAccessToken = (payload: IJwtPayload): string => {
    const secret = configApp.jwtSecret ?? "";
    const accessTokenExpiredIn = configApp.accessTokenJwtExpired ?? "";
    return jwt.sign(payload, String(secret), {
        expiresIn:
            accessTokenExpiredIn != null ? String(accessTokenExpiredIn) : "1d",
    });
};

const generateRefreshToken = (payload: IJwtPayload): string => {
    const secret = configApp.jwtRefreshSecret ?? "";
    const refreshTokenExpiredIn = configApp.refreshTokenJwtExpired ?? "";

    return jwt.sign(payload, String(secret), {
        expiresIn:
            refreshTokenExpiredIn != null
                ? String(refreshTokenExpiredIn)
                : "1d",
    });
};

const verifyRefreshToken = (token: string): string | null | JwtPayload => {
    try {
        const secret = configApp.jwtRefreshSecret ?? "";

        return jwt.verify(token, String(secret));
    } catch (error) {
        return null;
    }
};

const verifyAcessToken = (token: string): string | null | JwtPayload => {
    try {
        const secret = configApp.jwtSecret ?? "";
        return jwt.verify(token, String(secret));
    } catch (error) {
        return null;
    }
};

const parseJWT = (token: string) => {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};

export {
    generateAccessToken,
    generateRefreshToken,
    verifyAcessToken,
    verifyRefreshToken,
    parseJWT,
};
