import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

export const validarJWT = (req: Request, res: Response, next: NextFunction) => {
    //x-token from headers
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "There isn't token in request",
        });
    }
    try {
        const { uid, name } = jwt.verify(
            token,
            process.env.JWT_SECRET_SEED as string,
        ) as JwtPayload & { uid: string; name: string };

        (req as Request & { uid?: string }).uid = uid as string;
        (req as Request & { name?: string }).name = name as string;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token is not valid",
        });
    }
    next();
};
