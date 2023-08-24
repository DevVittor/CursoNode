const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
require('dotenv').config();
require("./database/conn");

const AuthRegisterUserRoutes = require("./routes/AuthRegisterUserRoutes");

app.use(AuthRegisterUserRoutes);

app.set("view engine","ejs");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

// app.get("/",(req,res)=>{
//     res.send("Olá Mundo!");
// })

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Servidor rodando na porta ${port}`);
})