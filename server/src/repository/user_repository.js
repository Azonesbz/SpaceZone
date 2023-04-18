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

export async function addUserDb(username, email, password, token){ // Ajoute un utilisateur en base de donnée
    const [verify] = await createPoolConnection().query(`SELECT * FROM users WHERE user_id = ?`, [username])
    if(verify.length){
        const err = `Cet utilisateur existe déjà.`
        throw err
    }
    const [info] = await createPoolConnection().query(`INSERT INTO users (user_id, role_id, email, password, token) VALUES (?, ?, ?, ?, ?)`, [username, 3, email, password, token])
    return info
}



export async function loginUserDb(email){
    console.log(JSON.stringify(email))
    const [info] = await createPoolConnection().query(`SELECT id, password FROM users WHERE email = ?`, [email])
    if(!info.length){
        const err = 'Une erreur est survenue, veuillez réessayer.'
        throw err
    }
    return info
}
export async function updateToken(email, token) {
    await createPoolConnection().query(`UPDATE users SET token = ? WHERE email = ?`, [token, email])
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