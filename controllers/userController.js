import User from "../models/user.js"

export function createUser(req,res){
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,

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