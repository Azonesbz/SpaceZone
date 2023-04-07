import express from 'express'

const app = express()
const PORT = process.env.PORT || 3000

app.post('/', (req, res) => {
    res.json({Azones: "hello"})
})
