import { users } from "../repository/user_repository.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function getAllUsers(req, res) {
    try {
        const allUsers = await users.all()
        const count = allUsers.length
        res.status(201).json({ success: "Tous les utilisateurs ont été récupérés avec succès.", count, allUsers })
    } catch (err) {
        console.error(err)
        res.status(500).json({ failure: "Erreur lors de la récupération de tous les utilisateurs", err })
    }
}

export async function addUser(req, res) {
    const { username, email, password } = req.body

    const now = new Date()
    const mysqlDate = now.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })
    const datetimeString = mysqlDate.replace('à', ' ')
    const last_connection = datetimeString.slice(6, 10) + '-' + datetimeString.slice(3, 5) + '-' + datetimeString.slice(0, 2) + ' ' + datetimeString.slice(11, 19)
    const created_at = last_connection

    if (typeof username !== 'string' || typeof email !== 'string' || !email.includes('@') || typeof password !== 'string') {
        res.status(400).json({ err: "Les données entrantes sont invalides." })
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 15)
        const newUser = await users.add(username, email, hashedPassword, created_at, last_connection)
        const tokenData = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            created_at: newUser.created_at,
            last_connection: newUser.last_connection,
        };
        const token = jwt.sign(tokenData, process.env.PRIVATE_KEY, { expiresIn: '1h' })
        await users.newToken(email, token)
        return res.status(201).json({
            tokenData: {
                ...tokenData,
                token,
            },
        });
    } catch (err) {
        console.error(err)
        return res.status(500).json({ err: 'Une erreur est survenue, veuillez réessayer.' })
    }
}


export async function connectUser(req, res) {
    const { email, password } = req.body

    const now = new Date()
    const mysqlDate = now.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })
    const datetimeString = mysqlDate.replace('à', ' ')
    const last_connection = datetimeString.slice(6, 10) + '-' + datetimeString.slice(3, 5) + '-' + datetimeString.slice(0, 2) + ' ' + datetimeString.slice(11, 19)

    if (typeof email !== 'string' || !email.includes('@') || typeof password !== 'string') {
        res.status(400).json({ err: "Les données entrantes sont invalides." })
        return;
    }

    try {
        const [user] = await users.login(email)
        if (!user) {
            res.status(401).json({ err: "Authentication failed." })
            return;
        }
        const verify = await bcrypt.compare(password, user.password)
        if (!verify) {
            res.status(401).json({ err: "Authentication failed." })
            return;
        }
        const created_at = new Date(user.created_at).toLocaleString("fr-FR", { timeZone: "Europe/Paris" })

        const tokenData = {
            id: user.id,
            username: user.username,
            email: user.email,
            first_name: user.first_name,
            number_phone: user.number_phone,
            permission: user.name,
            profil_picture: user.profil_picture,
            created_at,
            last_connection,
        };
        const token = jwt.sign(tokenData, process.env.PRIVATE_KEY, { expiresIn: "1h" })
        await Promise.all([
            users.lastConnection(last_connection, user.id),
            users.newToken(token, user.id),
        ]);
        res.status(200).json({
            tokenData: { ...tokenData, token },
            token
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ err: 'Une erreur est survenue, veuillez réessayer.' })
        return;
    }
}
export async function userLogout(req, res) {
    const id = req.params.id;
    try {
        await users.newToken(null, id);
        res.status(200).json({ success: "L'utilisateur est déconnecté." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ failure: 'Une erreur est survenue, veuillez réessayer.', error });
    }
}

export async function updateUser(req, res) {
    const id = req.params.id
    const { username, email, permission } = req.body
    if (typeof email !== 'string' || !email.includes('@') || typeof username !== 'string' || typeof permission !== "number") {
        res.status(400).json({ err: "Les données entrantes sont invalides." })
        return;
    }
    try {
        const userEdited = await users.update(id, username, email, permission)
        res.status(200).json({ success: userEdited })
    } catch (err) {
        console.error(err)
        res.status(500).json({ failure: err })
    }
}
export async function editUsername(req, res) {
    const id = req.params.id
    const { username } = req.body

    if (typeof username !== 'string') {
        res.status(400).json({ err: "Les données entrantes sont invalides." })
        return;
    }
    try {
        const user = await users.username(id, username)
        const token = jwt.sign(user[0], process.env.PRIVATE_KEY, { expiresIn: '1h' })
        res.status(200).json({ success: username, token: token })
    } catch (err) {
        console.error(err)
        res.status(500).json({ failure: err })
    }
}

export async function editEmail(req, res) {
    const id = req.params.id
    const { email } = req.body
    if (typeof email !== 'string' || !email.includes('@')) {
        res.status(400).json({ err: "Les données entrantes sont invalides." })
        return;
    }
    try {
        const user = await users.email(id, email)
        const token = jwt.sign(user[0], process.env.PRIVATE_KEY, { expiresIn: '1h' })
        res.status(200).json({ success: email, token: token })
    } catch (err) {
        console.error(err)
        res.status(500).json({ failure: err })
    }
}
export async function editNumberPhone(req, res) {
    const id = req.params.id
    const { numberphone } = req.body
    if (typeof numberphone !== 'string') {
        res.status(400).json({ err: "Les données entrantes sont invalides." })
        return;
    }
    try {
        const user = await users.number(id, numberphone)
        const token = jwt.sign(user[0], process.env.PRIVATE_KEY, { expiresIn: '1h' })
        res.status(200).json({ success: numberphone, token: token })
    } catch (err) {
        console.error(err)
        res.status(500).json({ failure: err })
    }
}
export async function editFirstName(req, res) {
    const id = req.params.id
    const { firstName } = req.body
    if (typeof firstName !== 'string')
    {
        res.status(400).json({ err: "Les données entrantes sont invalides." })
        return;
    }
    try {
        const user = await users.firstName(id, firstName)
        const token = jwt.sign(user[0], process.env.PRIVATE_KEY, { expiresIn: '1h' })
        res.status(200).json({ success: firstName, token: token })
    } catch (err) {
        console.error(err)
        res.status(500).json({ failure: err })
    }
}

export async function sessionIsValid(req, res) {
    const { token } = req.body

    try {
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY)
        res.status(200).json({ msg: `Session valide.`, decoded })
    } catch (err) {
        console.error(err)
        res.status(401).json({ msg: `Votre session a expiré, veuillez vous reconnecter.`, err })
    }
}
export async function userExist(req, res) {
    const { email } = req.body
    if (typeof email !== 'string' || !email.includes('@'))
    {
        res.status(400).json({ err: "Les données entrantes sont invalides." })
        return;
    }
    try {
        const user = await users.byEmail(email)
        res.status(200).json({ success: user })
    } catch (err) {
        console.error(err)
        res.status(404).json({ failure: err })
    }
}
export async function deleteUser(req, res) {
    const id = req.params.id

    try {
        const user = await users.delete(id)
        res.status(200).json({ success: user })
    } catch (err) {
        console.error(err)
        res.status(500).json({ failure: err })
    }
}