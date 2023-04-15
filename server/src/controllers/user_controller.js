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
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(password, 15)
    console.log("🚀 ~ file: user_controller.js:16 ~ addUser ~ hashedPassword:", hashedPassword)
    users.add(username, email, hashedPassword)
    .then(
        response => {
            res.status(201).json({response})
        }
    )
    .catch(
        err => {
            console.log(err)
            res.status(300).json({err})
        }
    )
}

