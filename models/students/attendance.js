import mongoose from "mongoose";

const attendannceSchema = new mongoose.Schema({
    attendanceDate:{
        type: String,
        required: true,
        // default: Date.now
    },
    registerId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Present", "Absent"],
        // required: true
    },
    time: {
        type: String,
    }
}, { timestamps: true })

const Attendance = mongoose.model("Attendance", attendannceSchema)
export default Attendance