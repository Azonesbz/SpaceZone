import jwt from ".pnpm/jsonwebtoken@9.0.0/node_modules/jsonwebtoken";

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

export function currentDate(){
    const now = new Date();
    const mysqlDate = now.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })
    const datetimeString = mysqlDate.replace('à', ' ')
    const date = datetimeString.slice(6, 10) + '-' + datetimeString.slice(3, 5) + '-' + datetimeString.slice(0, 2) + ' ' + datetimeString.slice(11, 19)

    return date
}