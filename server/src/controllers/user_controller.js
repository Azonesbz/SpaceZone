import { users } from "../repository/user_repository.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function getAllUsers(req, res){
    users.all().then(
        response => {
            res.status(200).json({response})
        }
    )
}

export async function addUser(req, res) {
    const {username, email, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 15)
    
    if(username, email, password){
        users.add(username, email, hashedPassword)
        .then(
            response => {
                console.log(response)
                const token = jwt.sign({response}, process.env.PRIVATE_KEY, {expiresIn: '1h'})
    
                users.newToken(email, token)
                .then(() => res.status(201).json({response, token}))
                .catch(() => res.status(300).send('Une erreur est survenue, veuillez réessayer.'))
            }
        )
        .catch(
            err => {
                console.log(err)
                res.status(300).json({err})
            }
        )
    } else {
        const err = "Tout les champs doivent être rempli avant de soumettre le formulaire."
        throw err
    }
}


export async function connectUser(req, res) {
    const {email, password} = req.body
    users.login(email)
    .then(
        async response => {
            const verify = await bcrypt.compare(password, response[0].password)
            if(verify)
            {
                let tokenData = {
                    id: response[0].id,
                    user_id: response[0].user_id,
                    email: response[0].email,
                    name: response[0].prenom,
                    surname: response[0].nom,
                    numberphone: response[0].numberphone,
                    permission: response[0].permission
                }
                const token = jwt.sign(tokenData, process.env.PRIVATE_KEY, {expiresIn: '1h'})
                users.newToken(email, JSON.stringify(token))
                .then(() => {
                    res.status(201).json({token, id: response[0].id, email});
                    return;
                })
                .catch(err => {
                    console.log(err)
                    res.status(300).send('Une erreur est survenue, veuillez réessayer dans quelque instants.');
                    return;
                });
            }
            else
            {
                res.status(401).send('Mot de passe incorrect')
            }
        }
    )
    .catch(
        err => {
            console.log(err + 'ok')
            res.status(300).json({err})
        }
    )
}
        
export async function userLogout(req, res){
    const id = req.params.id
    users.newToken(id, null).then(() => {
        res.status(200).send('OK')
    })
    .catch(err => {
        res.status(500).json({msg:'Erreur, veuillez réessayer.', err})
    })
    
}




