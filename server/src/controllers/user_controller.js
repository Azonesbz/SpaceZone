import { users } from "../repository/user_repository.js"
import bcrypt from 'bcrypt'

export async function getAllUsers(req, res){
    users.all().then(
        response => {
            res.status(200).json({response})
        }
    )
}

export async function addUser(req, res) {
    const {username, email, password} = req.body
    const hashedPassword = bcrypt.hash(JSON.stringify(password), 15)
    users.addUser(username, email, hashedPassword)
    .then(
        res => {
            res.json({res})
        }
    )
    .catch(
        err => {
            res.status(300).json({err})
        }
    )
}

