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
                let tokenData = {
                    id: response[0].id,
                    username: response[0].username,
                    email: response[0].email,
                    first_name: response[0].first_name,
                    number_phone: response[0].number_phone,
                    permission: response[0].name
                }
                const token = jwt.sign(tokenData, process.env.PRIVATE_KEY, {expiresIn: '1h'})
    
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
                    username: response[0].username,
                    email: response[0].email,
                    first_name: response[0].first_name,
                    number_phone: response[0].number_phone,
                    permission: response[0].name
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

export async function updateUser(req, res){
    const id = req.params.id
    const {username, email, permission} = req.body
    users.update(id, username, email, permission).then((userEdited) => {
        res.status(200).json({response: userEdited})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err})
    }) 
}
export async function editUsername(req, res){
    const id = req.params.id
    console.log(req.body)
    const {username} = req.body
    users.username(id, username).then(() => {
        res.status(200).json({username: username})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err})
    }) 
}
export async function editEmail(req, res){
    const id = req.params.id
    const {email} = req.body
    users.email(id, email).then(() => {
        res.status(200).json({email: email})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err})
    }) 
}
export async function editNumberPhone(req, res){
    const id = req.params.id
    const {numberphone} = req.body
    users.number(id, numberphone).then(() => {
        res.status(200).json({numberPhone: numberphone})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err})
    }) 
}
export async function editFirstName(req, res){
    const id = req.params.id
    const {firstName} = req.body
    users.firstName(id, firstName).then(() => {
        res.status(200).json({firstName: firstName})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err})
    }) 
}

export async function sessionIsValid(req, res){
    const { token } = req.body
    jwt.verify(token, process.env.PRIVATE_KEY, function(err, decoded){
        if(err){
            console.log(err)
            res.status(401).json({msg: `Votre session a expirer, veuillez vous reconnecter.`, err})
        } else {
            res.status(200).json({msg: `Session valide.`, decoded})
        }
    })
}
export async function userExist(req, res){
    const { email } = req.body
    users.byEmail(email).then(user => {
        res.status(200).json({user: user})
    })
    .catch(err => {
        res.status(404).json({err: err})
    })
}
export async function deleteUser(req, res){
    const id = req.params.id
    users.delete(id).then(user => {
        res.status(200).json({user: user})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err: err})
    })
}



