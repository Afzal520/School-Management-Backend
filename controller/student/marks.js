import marksModel from "../../models/students/marks.js"

export const addMarks = async (req, res) => {
    const { schoolName, boardName, studentName, registerId, studentEmail, subjects } = req.body;
    console.log("school:", schoolName)

    console.log("boardName:", boardName)
    console.log("stuentname:", studentName)

    console.log("subject:", subjects)
    const existingResult = await marksModel.findOne({ registerId })
    // if(existingResult.defaultStudentId == defaultStudentId){
    //     return res.status(405).json({success:false,message:"Result already uploaded"})
    // }
    try {
        const newMarks = new marksModel({
            schoolName,
            boardName,
            studentName,
            registerId,
            studentEmail,
            subjects,

        });

        await newMarks.save();
        res.status(201).json({ success: true, message: "Marks added successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};


export const GetStudentResult = async (req, res) => {
  const {id} = req.params
    try {
        const GetStudentResult = await marksModel.findOne({registerId:id})
        if (!GetStudentResult) {
            return res.status(400).json({ success: false, message: "Studnet result Not found" })
        }
        res.status(200).json({ success: true, message: "Student result successfully" ,GetStudentResult})
    } catch (error) {
        res.status(500).json({ success: false, message: "Enternal error", error: error.message })
    }
}