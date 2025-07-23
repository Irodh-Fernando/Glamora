import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber:{
        type: String,
        default: "NOT GIVEN",
    },
    password:{
        type: String,
        required: true,
    },
    isBlocked:{
        type: Boolean,
        default: false,
    },
    isEmailVerified:{
        type: Boolean,
        default: false,
    },
    role:{
        type: String,
        default: "User",
    },
    image:{
        type: String,
        default: "",
    }
});

const User = mongoose.model("users",userSchema);

export default User;