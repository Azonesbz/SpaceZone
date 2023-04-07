import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const options = {
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
}

let pool = null

export function createPoolConnection(){
    if(pool){
        return pool
    }
    pool = mysql.createPool(options).promise()
    return pool
}