import express from 'express'
import { createDB } from './src/lib/createDB.js'
import dotenv from 'dotenv'
import router from './src/routes.js'
import bodyParser from 'body-parser'
import cors from 'cors'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)

createDB()

app.listen(PORT, () => {
    console.log(`Le serveur est ouvert: http://localhost:${PORT}/`)
})