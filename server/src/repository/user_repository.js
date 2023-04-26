import { createPoolConnection } from "../lib/db.js"

export async function getUsers(){ // Fonction pour récupérer tout les utilisateurs en base de donnée
    const [result] = await createPoolConnection().query(`SELECT users.id, users.username, users.email, users.first_name, users.number_phone, r.name  FROM users INNER JOIN roles r ON users.role_id = r.id`)
    if(result.length){
        return result
    }
    return null
}
export async function getUserbyEmail(email){ // Fonction pour vérifier si un utilisateur existe
    const [user] = await createPoolConnection().query(`SELECT * FROM users WHERE email = ?`, [email])
    if(user.length){
        return user
    }
    const err = 'Aucun utilisateur n\'a été trouvé pour cette adresse email'
    throw err
}

export async function addUserDb(username, email, password){ // Ajoute un utilisateur en base de donnée
    const [verify] = await createPoolConnection().query(`SELECT * FROM users WHERE email = ?`, [email])
    if(verify.length){
        const err = `Cet utilisateur existe déjà.`
        throw err
    }
    await createPoolConnection().query(`INSERT INTO users (role_id, username, email, password) VALUES (?, ?, ?, ?)`, [3, username, email, password])
    const [info] = await createPoolConnection().query(`SELECT users.id, users.password, users.username, users.email, users.first_name, users.number_phone, roles.name FROM users INNER JOIN roles ON users.role_id = roles.id WHERE email = ?`, [email])

    return info
}



export async function loginUserDb(email){
    const [info] = await createPoolConnection().query(`SELECT users.id, users.password, users.username, users.email, users.first_name, users.number_phone, roles.name FROM users INNER JOIN roles ON users.role_id = roles.id WHERE email = ?`, [email])
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

export async function deleteUserDb(id){
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


export async function updateUserDb(id, username, email, permission) {
    console.table({
        id, username, email, permission
    })
    try{
        await createPoolConnection(
            `UPDATE users SET username = ? WHERE id = ?`,
            [username, id]
          );
          return
    } catch(err) {
        console.log('Une erreur lors de la modification' + err)
        return
    }
  }
export async function updateEmail(id, email){
    await createPoolConnection().query(`UPDATE users SET email = ? WHERE id = ?`, [email, id])
    const [info] = await createPoolConnection().query(`SELECT users.id, users.password, users.user_id, users.email, users.prenom, users.nom, users.numberphone, role.permission FROM users INNER JOIN role ON users.role_id = role.id WHERE email = ?`, [email])
    return info
}
export async function updateNumber(id, number){
    await createPoolConnection().query(`UPDATE users SET numberphone = ? WHERE id = ?`, [pseudo, id])
    const [info] = await createPoolConnection().query(`SELECT users.id, users.password, users.user_id, users.email, users.prenom, users.nom, users.numberphone, role.permission FROM users INNER JOIN role ON users.role_id = role.id WHERE email = ?`, [email])
    return info
}
export async function updateName(id, name){
    await createPoolConnection().query(`UPDATE users SET name = ? WHERE id = ?`, [name, id])
    const [info] = await createPoolConnection().query(`SELECT users.id, users.password, users.user_id, users.email, users.prenom, users.nom, users.numberphone, role.permission FROM users INNER JOIN role ON users.role_id = role.id WHERE email = ?`, [email])
    return info
}

export const users = {
    all: getUsers,
    byEmail: getUserbyEmail,
    add: addUserDb,
    delete: deleteUserDb,
    login: loginUserDb,
    newToken: updateToken,
    update: updateUserDb,
    newEmail: updateEmail,
    newNumber: updateNumber,
    newName: updateName,
}