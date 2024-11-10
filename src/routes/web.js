import express from "express"
import homeController from "../controller/homeController"
const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", homeController.handleHelloWord)
    router.get("/user", homeController.handleUserPage)
    router.post("/users/create-user", homeController.handleCreateNewUser)
    router.post("/delete-user/:id", homeController.handleDeleteUser)
    router.post("/users/update-user", homeController.handleUpdateUser)
    router.get("/update-user/:id", homeController.getUpdateUserPage)

    

    return app.use("/", router)
}

export default initWebRoutes;