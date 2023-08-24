const mongoose = require("mongoose");

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const connect = ()=>{
    mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.4xpyebj.mongodb.net/test?retryWrites=true&w=majority`);
    const connection = mongoose.connection;
    connection.on("error",()=>{
        console.error("Erro ao conectar no banco de dados")
    })
    connection.on("open",()=>{
        console.log("Conectado no banco de dados")
    })
}
connect();

module.exports = mongoose;