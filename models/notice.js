import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    // description: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     maxlength: 1000
    // },
   
    
}, {
    timestamps: true
});

const Notice = mongoose.model("Notice", noticeSchema);
export default Notice;