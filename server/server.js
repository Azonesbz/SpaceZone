import express from 'express'
import { createDB } from './src/lib/createDB.js'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(route)

createDB()

app.listen(PORT, () => {
    console.log(`Le serveur est ouvert: http://localhost:${PORT}/`)
})