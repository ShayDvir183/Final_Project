import jwt from "jsonwebtoken";
export function signToken(obj: {
    first_nameuser: string;
    last_name: string;
    email_address: string;
    user_id: number;
    role: string;
}) {
    const token = jwt.sign(
        {
            data: {
                ...obj,
                password: null,
            },
        },
        process.env.SECRET || "mySecretForApplication1234567",
        { expiresIn: "100h" }
    );

    return token;
}

export default function verifyToken(req, res, next) {
    const authorization = req?.headers?.authorization;
    jwt.verify(authorization, process.env.SECRET, (err, decoded) => {
        if (err) {
            return next({ ...err, status: 401 });
        } else {
            req.userData = decoded?.data;
            console.log("#################### req.user ######################");
            console.log(req.userData);
            console.log("#################### req.user ######################");
            return next();
        }
    });
}
