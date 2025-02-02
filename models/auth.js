import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    registerId: {
        type: String,
        required: true,
       
    },
    mobile: {
        type: String,
        required: true
      
    },
    role: { type: String, enum: ["student", "teacher", "admin"], },
});

const Authentication = mongoose.model("authentication", userSchema);

export default Authentication;