import { createPoolConnection } from "../lib/db.js"

export async function getUsers(){ // Fonction pour récupérer tout les utilisateurs en base de donnée
    const [result] = await createPoolConnection().query(`SELECT * FROM users`)
    if(result.length){
        return result
    }
    return null
}
export async function getUserbyEmail(email){ // Fonction pour vérifier si un utilisateur existe
    const [userId] = await createPoolConnection().query(`SELECT * FROM users WHERE id = ?`, [email])
    if(userId.length){
        return userId
    }
    return null
}

export async function addUserDb(username, email, password){ // Ajoute un utilisateur en base de donnée
    const [verify] = await createPoolConnection().query(`SELECT * FROM users WHERE user_id = ?`, [username])
    if(verify.length){
        const err = `Cet utilisateur existe déjà.`
        throw err
    }
    const [info] = await createPoolConnection().query(`INSERT INTO users (user_id, role_id, email, password) VALUES (?, ?, ?, ?)`, [username, 3, email, password])
    return info
}



export async function loginUserDb(email){
    const [info] = await createPoolConnection().query(`SELECT users.id, users.password, users.user_id, users.email, users.prenom, users.nom, users.numberphone, role.permission FROM users INNER JOIN role ON users.role_id = role.id WHERE email = ?`, [email])
    if(!info.length){
        const err = 'Une erreur est survenue, veuillez réessayer.'
        throw err
    }
    return info
}
export async function updateToken(email, token, id) {
    await createPoolConnection().query(`UPDATE users SET token = ? WHERE email = ? OR id = ?`, [token, email, id])
    return
}

export async function searchUserDb(){ // Recherche un utilisateur en base de donnée en fonction de différent critère

}

export const users = {
    all: getUsers,
    byEmail: getUserbyEmail,
    add: addUserDb,
    login: loginUserDb,
    search: searchUserDb,
    newToken: updateToken,
}