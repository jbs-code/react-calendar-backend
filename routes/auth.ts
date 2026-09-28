import { check } from "express-validator";
import { crearUsuario, loginUsuario, revalidarToken } from "../controllers";
import { Router } from "express";
import { validarJWT, validateFields } from "../middlewares";

export const authRouter = Router();

authRouter.post(
    "/new",
    [
        check("name", "The name is required").not().isEmpty(),
        check("email", "Valid email is required").isEmail(),
        check(
            "password",
            "Password should have more than 5 characters",
        ).isLength({ min: 6 }),
        validateFields,
    ],
    crearUsuario,
);

authRouter.post(
    "/",
    [
        check("email", "Valid email is required").isEmail(),
        check(
            "password",
            "Password should have more than 5 characters",
        ).isLength({ min: 6 }),
        validateFields,
    ],
    loginUsuario,
);

authRouter.get("/renew", validarJWT, revalidarToken);

