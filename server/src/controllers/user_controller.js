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
    const token = jwt.sign(req.body, process.env.PRIVATE_KEY, {expiresIn: '1h'})

    users.add(username, email, hashedPassword, token)
    .then(
        response => {
            res.status(201).json({response, token})
        }
    )
    .catch(
        err => {
            console.log(err)
            res.status(300).json({err})
        }
    )
}


export async function connectUser(req, res) {
    const {email, password} = req.body
   console.log(email)
    users.login(email)
    .then(
        async response => {
            console.log(response)
            const verify = await bcrypt.compare(password, response[0].password)
            if(verify)
            {
                const token = jwt.sign({response}, process.env.PRIVATE_KEY, {expiresIn: '1h'})

                users.newToken(email, token)
                .then(() => {
                    res.status(201).json({token, id: response[0].id, email});
                    return;
                })
                .catch(() => {
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

}




