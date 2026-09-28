import jwt from "jsonwebtoken";

export const generateToken = (uid: string, name: string) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name };

        jwt.sign(
            payload,
            process.env.JWT_SECRET_SEED as string,
            { expiresIn: "2h" },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject("Token was not generated");
                }
                resolve(token);
            },
        );
    });
};
