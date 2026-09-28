import type { Request, Response } from "express";
import { User } from "../models";
import bcrypt from "bcryptjs";
import { generateToken } from "../helpers";

export const crearUsuario = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msn: `User with email ${email} already exists`,
            });
        }

        user = new User(req.body);

        const token = await generateToken(
            user._id as unknown as string,
            user.name as string,
        );

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        res.status(201).json({
            ok: true,
            msg: "User created",
            uid: user._id,
            name: user.name,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact to admin please",
        });
    }
};

export const loginUsuario = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msn: `User with email ${email} doesn't exist`,
            });
        }

        const validPassword = bcrypt.compareSync(
            password,
            user.password as string,
        );
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msn: `Password incorrect`,
            });
        }

        const token = await generateToken(
            user._id as unknown as string,
            user.name as string,
        );

        res.json({
            ok: true,
            msg: "Successful login!",
            uid: user._id,
            name: user.name,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact to admin please",
        });
    }
};

export const revalidarToken = async (req: Request, res: Response) => {

    const uid = (req as Request & {uid: string}).uid;
    const name = (req as Request & {name: string}).name;

    const token = await generateToken(uid, name);

    res.json({
        ok: true,
        msg: "renew",
        token
    });
};
