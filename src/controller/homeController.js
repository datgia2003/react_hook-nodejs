import userService from "../service/userService"

const handleHelloWord = (req, res)=>{
    return res.render("home.ejs")
}

const handleUserPage = async(req, res)=>{
    let userList =  await userService.getUserList();
    return res.render("user.ejs", {userList})
}

const handleCreateNewUser = (req, res)=>{
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.username;

    userService.createNewUser(email, password, name)

    return res.redirect("/user")
}

const handleDeleteUser= (req,res)=>{
    userService.deleteUser(req.params.id);
    
    return res.redirect("/user")
}

const handleUpdateUser= async(req,res)=>{
    let email = req.body.email;
    let name = req.body.username;
    let id= req.body.id;

    await userService.updateUser(email,name,id)
    return res.redirect("/user")
}

const getUpdateUserPage= async(req,res)=>{
    let user  = await userService.getUserByID(req.params.id)
    let userData = []
    userData = user
    // if(user && user.length>0){
    //     userData = user[0]
    // }
    return res.render("user-update.ejs",{userData})
}

module.exports= {
    handleHelloWord,
    handleUserPage,
    handleCreateNewUser,
    handleDeleteUser,
    handleUpdateUser,
    getUpdateUserPage
}