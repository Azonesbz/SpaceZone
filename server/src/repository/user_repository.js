import { createPoolConnection } from "../lib/db.js"

export async function getUser(){ // Fonction pour récupérer tout les utilisateurs en base de donnée
    const [result] = await createPoolConnection().query(`SELECT * FROM users`)
    if(result.length){
        return result
    }
    return
}
export async function getUserbyEmail(email){ // Fonction pour vérifier si un utilisateur existe
    const [userId] = await createPoolConnection().query(`SELECT * FROM users WHERE id = ?`, [email])
    if(userId.length){
        return userId
    }
    return
}

export async function addUserDb(username, email, password){ // Ajoute un utilisateur en base de donnée
    const [verify] = await createPoolConnection().query(`SELECT * FROM users WHERE user_id = ?`, [username])
    if(verify.length){
        const err = `Cet utilisateur existe déjà.`
        throw err
    }
    const [info] = await createPoolConnection().query(`INSERT INTO users (user_id, email, password)`, [username, email, password])
    return info
}
export async function searchUserDb(){ // Recherche un utilisateur en base de donnée en fonction de différent critère

}

export const users = {
    all: getUser,
    byEmail: getUserbyEmail,
    add: addUserDb,
    search: searchUserDb,
}