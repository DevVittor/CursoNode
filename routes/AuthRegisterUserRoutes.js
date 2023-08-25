const router = require("express").Router();
const AuthRegisterUserController = require("../controllers/AuthRegisterUserController");

const multer = require("multer");

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload = multer({storage})



router.get("/",AuthRegisterUserController.init);
router.post("/auth/register/user",upload.single("image"),AuthRegisterUserController.registerUser);

module.exports = router;