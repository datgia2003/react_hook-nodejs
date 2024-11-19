import bcrypt, { hash } from "bcryptjs"
import mysql from "mysql2/promise"
//import bluebird from "bluebird"
import db from "../models/index.js"

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
    await db.User.create({
        name: name,
        email: email,
        password: hashPassword
    })

    //const [rows, fields] = await (await connection).execute('INSERT INTO user (email, password, name) VALUES (?, ?, ?)', [email, hashPassword, name])

}

const getUserList = async()=>{
    // const [rows, fields] = await (await connection).query('SELECT* from user')
    // return rows;

    return await db.User.findAll()
}

const deleteUser = async(id) =>{
    // const [rows, fields] = await (await connection).query(`
    //     DELETE FROM user WHERE id =?`,[id])

    await db.User.destroy({
        where: {
            id: id
        }
    })
}

const getUserByID = async(id) =>{
    // const [rows, fields] = await (await connection).query(`
    //     SELECT * FROM user WHERE id =?`,[id])
    
    // return rows;
    let user = await db.User.findOne({
        where: {
            id: id
        }
    })
    return user;
}

const updateUser = async(email, username,id)=>{
    // const [rows, fields] = await (await connection).query(`
    //     UPDATE user SET email =?, name=? WHERE id=?`,[email,username,id])

    await db.User.update(
        {email: email, name: username},{
            where :{
                id: id
            }});
}

module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    getUserByID,
    updateUser
}