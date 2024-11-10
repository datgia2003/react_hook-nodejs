import bcrypt, { hash } from "bcryptjs"
import mysql from "mysql2/promise"
//import bluebird from "bluebird"

//connection to database
const connection = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    database: 'jwt'
})

//encrypt password with bcrypt sail
const sail = bcrypt.genSaltSync(10)

const hashUserPassword = (userPassword)=>{
    return bcrypt.hashSync(userPassword, sail)
}

const createNewUser = async(email, password, name)=>{
    let hashPassword = hashUserPassword(password)

    const [rows, fields] = await (await connection).execute('INSERT INTO users (email, password, name) VALUES (?, ?, ?)', [email, hashPassword, name])

}

const getUserList = async()=>{
    const [rows, fields] = await (await connection).query('SELECT* from users')
    return rows;
}

const deleteUser = async(id) =>{
    const [rows, fields] = await (await connection).query(`
        DELETE FROM users WHERE id =?`,[id])
}

const getUserByID = async(id) =>{
    const [rows, fields] = await (await connection).query(`
        SELECT * FROM users WHERE id =?`,[id])
    
        return rows;
}

const updateUser = async(email, username,id)=>{
    const [rows, fields] = await (await connection).query(`
        UPDATE users SET email =?, name=? WHERE id=?`,[email,username,id])
}

module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    getUserByID,
    updateUser
}