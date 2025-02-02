import Student from "../models/student.js";
import teacherModel from "../models/teacher.js";

export const checkStudentId = async (registerId) => {
    console.log(registerId)
    try {
        const student = await Student.findOne({ registerId: registerId });
        if (student) {
            return student;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error checking student ID:", error);
        throw error;
    }
};

export const checkTeacherId = async (registerId) => {
    try {
        const teacher = await teacherModel.findOne({ registerId: registerId })
        if (teacher) {
            return teacher
        }
        else {
            return null
        }
    } catch (error) {
        throw error
    }

}
