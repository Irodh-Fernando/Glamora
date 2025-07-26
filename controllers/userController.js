import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createUser(req,res){
    const passwordHash = bcrypt.hashSync(req.body.password, 10)

    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: passwordHash,

    }
    const user = new User(userData)

    user.save().then(()=>{
        res.json({
            message : "User created successfully"
        })
    }).catch(()=>{
        res.json({
            message : "Failed to create user"
        })
    })
}

export function loginUser(req,res){
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
        email: email
    }).then(
        (user)=>{
            if(user==null){
                res.status(404).json({
                    message : "User not found"
                })
            }else{
                const isPasswordCorrect = bcrypt.compareSync(password, user.password)
                if(isPasswordCorrect){
                    const token = jwt.sign({
                        firstName : user.firstName,
                        lastName : user.lastName,
                        email : user.email,
                        role : user.role,
                        isBlocked : user.isBlocked,
                        isEmailVerified : user.isEmailVerified,
                        image : user.image
                    },process.env.JWT_TOKEN_KEY)

                    res.json({
                        token : token,
                        message : "Login Successful !",
                        role : user.role
                    })

                }else{
                    res.status(403).json({
                        message : "Incorrect Password"
                    })
                }
            }
        }
    )
}