import { createPoolConnection } from "../lib/db.js"

async function getUsers(){ // Fonction pour récupérer tout les utilisateurs en base de donnée
    const [result] = await createPoolConnection().query(`SELECT users.id, users.username, users.email, users.first_name, users.number_phone, users.profil_picture, CONVERT_TZ(users.created_at, '+00:00', '+02:00') AS created_at , users.last_connection, r.name  FROM users INNER JOIN roles r ON users.role_id = r.id`)
    if(result.length){
        return result
    }
    return null
}
async function countUserDb(){ // Fonction pour récupérer tout les utilisateurs en base de donnée
    const [result] = await createPoolConnection().query(`SELECT COUNT(*) as total_users FROM users`)
    return result
}
async function getUserbyEmail(email){ // Fonction pour vérifier si un utilisateur existe
    const [user] = await createPoolConnection().query(`SELECT * FROM users WHERE email = ?`, [email])
    if(user.length){
        return user
    }
    const err = 'Aucun utilisateur n\'a été trouvé pour cette adresse email'
    throw err
}

async function addUserDb(username, email, password, date, last_connection){ // Ajoute un utilisateur en base de donnée
    const [verify] = await createPoolConnection().query(`SELECT * FROM users WHERE email = ?`, [email])
    if(verify.length){
        const err = `Cet utilisateur existe déjà.`
        throw err
    }
    await createPoolConnection().query(`INSERT INTO users (role_id, username, email, password, created_at, last_connection) VALUES (?, ?, ?, ?, ?, ?)`, [3, username, email, password, date, last_connection])
    const [info] = await createPoolConnection().query(`SELECT users.id, users.password, users.username, users.email, users.first_name, users.number_phone, users.profil_picture, CONVERT_TZ(users.created_at, '+00:00', '+02:00') AS created_at, CONVERT_TZ(users.last_connection, '+00:00', '+02:00') AS last_connection, roles.name FROM users INNER JOIN roles ON users.role_id = roles.id WHERE email = ?`, [email])

    return info
}



async function loginUserDb(email){
    const [info] = await createPoolConnection().query(`SELECT users.id, users.password, users.username, users.email, users.first_name, users.number_phone, users.profil_picture, CONVERT_TZ(users.created_at, '+00:00', '+02:00') AS created_at, CONVERT_TZ(users.last_connection, '+00:00', '+02:00') AS last_connection, roles.name FROM users INNER JOIN roles ON users.role_id = roles.id WHERE email = ?`, [email])
    if(!info.length){
        const err = 'Une erreur est survenue, veuillez réessayer.'
        throw err
    }
    return info
}
async function updateLastConnection(date, id) {
    await createPoolConnection().query(`UPDATE users SET last_connection = ? WHERE id = ?`, [date, id])
    return
}
async function updateToken(token, id) {
    await createPoolConnection().query(`UPDATE users SET token = ? WHERE id = ?`, [token, id])
    return
}
async function deleteTokenDb(token, id) {
    await createPoolConnection().query(`UPDATE users SET token = ? WHERE id = ?`, [token, id])
    return
}

async function deleteUserDb(id){
    // Supprimer tous les enregistrements de la table carts_items qui font référence aux produits de l'utilisateur
    await createPoolConnection().query(`DELETE FROM carts_items WHERE product_id IN (SELECT id FROM products WHERE user_id = ?)`, [id]);

    // Supprimer tous les enregistrements de la table carts qui appartiennent à l'utilisateur
    await createPoolConnection().query(`DELETE FROM carts WHERE user_id = ?`, [id]);

    // Supprimer tous les enregistrements de la table products qui appartiennent à l'utilisateur
    await createPoolConnection().query(`DELETE FROM products WHERE user_id = ?`, [id]);

    // Supprimer l'utilisateur
    const [info] = await createPoolConnection().query(`DELETE FROM users WHERE id = ?`, [id]);
    return info;
}


async function updateUserDb(id, username, email, permission) {
    console.table({
        id, username, email, permission
    })
    try{
        const [result] = await createPoolConnection().query(`UPDATE users SET username = ?, email = ?, role_id = ? WHERE id = ?`, [username, email, permission, id])
          return result
    } catch(err) {
        console.log('Une erreur lors de la modification' + err)
        return
    }
  }

async function editUsernameDb(id, username) {
    try {
        await createPoolConnection().query(`UPDATE users SET username = ? WHERE id = ?`, [username, id])
        return username
    } catch (err) {
        console.log('Une erreur lors de la modification' + err)
        return
    }
}


async function editEmailDb(id, email){
    try {
        await createPoolConnection().query(`UPDATE users SET email = ? WHERE id = ?`, [email, id])
        return email
    } catch (err) {
        console.log('Une erreur lors de la modification' + err)
        return
    }
}
async function editNumberDb(id, number){
    JSON.stringify(number)
    try {
        await createPoolConnection().query(`UPDATE users SET number_phone = ? WHERE id = ?`, [number, id])
        return number
    } catch (err) {
        console.log('Une erreur lors de la modification' + err)
        return
    }
}
async function editFirstNameDb(id, firstName){
    try {
        await createPoolConnection().query(`UPDATE users SET first_name = ? WHERE id = ?`, [firstName, id])
        return firstName
    } catch (err) {
        console.log('Une erreur lors de la modification' + err)
        return
    }
}
async function editPictureDb(id, picture){
    console.log(picture)
    try {
        await createPoolConnection().query(`UPDATE users SET profil_picture = ? WHERE id = ?`, [picture, id])
        return
    } catch (err) {
        console.log('Une erreur lors de la modification' + err)
        return
    }
}

export const users = {
    all: getUsers,
    byEmail: getUserbyEmail,
    add: addUserDb,
    login: loginUserDb,
    delete: deleteUserDb,
    update: updateUserDb,
    username: editUsernameDb,
    email: editEmailDb,
    number: editNumberDb,
    firstName: editFirstNameDb,
    newToken: updateToken,
    deleteToken: deleteTokenDb,
    picture: editPictureDb,
    total: countUserDb,
    lastConnection: updateLastConnection,
}