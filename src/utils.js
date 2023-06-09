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

export function currentDate(){
    const now = new Date();
    const mysqlDate = now.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })
    const datetimeString = mysqlDate.replace('à', ' ')
    const date = datetimeString.slice(6, 10) + '-' + datetimeString.slice(3, 5) + '-' + datetimeString.slice(0, 2) + ' ' + datetimeString.slice(11, 19)

    return date
}

export function generateId() {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    const length = 8;
    let id = "";
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters[randomIndex];
    }
  
    return id;
  }