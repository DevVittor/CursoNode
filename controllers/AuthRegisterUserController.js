const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = class AuthRegisterUserController{
    static async init(req,res){
        //res.json({message:"Bem-vindo a API"});
        res.render("Home");
    }

    static async registerUser(req,res){

        const {
            name,
            email,
            age,
            password,
            confirmPassword
        }=req.body;

        let image = "";
        if(req.file){
            image = req.file.filename;
        }
        if(!name){
            return res.status(422).json({message:"Não pode deixar de escrever seu nome"})
        }
        if(!email){
            return res.status(422).json({message:"Cadastre um email corretamente"});
        }
        if(!age){
            return res.status(422).json({message:"Digite a sua idade"});
        }
        if(!password){
            return res.status(422).json({message:"É necessário criar uma senha"});
        }
        if(password !== confirmPassword){
            return res.status(422).json({message:"As senhas devem ser idênticas"});
        }

            const userEmailExist = await User.findOne({email:email});

            if(userEmailExist){
                return res.status(422).json({message:`O email ${email} já foi cadastrado`})
            }

            const hash = await bcrypt.genSalt(21);
            const passwordHash = await bcrypt.hash(password,hash);
            const user = new User({
                name,
                email,
                age,
                image,
                password:passwordHash
            });
            try{
                await user.save();
                res.redirect('/');
            }catch(error){
                res.status(500).json({message:`Ocorreu um error ${error} ao cadastrar o usuário`})
            }
    }
}