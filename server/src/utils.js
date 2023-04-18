import jwt from "jsonwebtoken";

export function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}