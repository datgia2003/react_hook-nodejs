import express from "express"
import configViewEngine from "./config/viewEngine"
import initWebRoutes from "./routes/web"
import bodyParser from "body-parser"
//import connection from "./config/connectDB"
require("dotenv").config()

const app =express();

configViewEngine(app);
const PORT = process.env.PORT || 8080

//config body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//connection();

initWebRoutes(app);

app.listen(PORT, ()=>{
    console.log("Running on port = " +PORT)
})