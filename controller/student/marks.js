import marksModel from "../../models/students/marks.js"

export const addMarks = async (req, res) => {
    const { schoolName, boardName, studentName, studentID, defaultStudentId, rollNumber, subjects } = req.body;
    console.log("school:", schoolName)
    console.log("RollNo:", rollNumber)
    console.log("boardName:", boardName)
    console.log("stuentname:", studentName)
    console.log("studentId:", studentID)
    console.log("subject:", subjects)
    const existingResult = await marksModel.findOne({defaultStudentId})
// if(existingResult.defaultStudentId == defaultStudentId){
//     return res.status(405).json({success:false,message:"Result already uploaded"})
// }
    try {
        const newMarks = new marksModel({
            schoolName,
            boardName,
            studentName,
            studentID,
            rollNumber,
            subjects,
            defaultStudentId
        });

        await newMarks.save();
        res.status(201).json({ success: true, message: "Marks added successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};