import Attendance from "../../models/students/attendance.js";

export const StudentAttendance = async (req, res) => {
  const { status, attendanceDate, registerId, time } = req.body
  console.log(time)
  console.log(status)
  if (!status || !attendanceDate || !registerId) {
    return res.status(404).json({ success: false, message: "All field required" })
  }
  try {
    const attendanceData = await Attendance.findOne({ attendanceDate, registerId })
    if (attendanceData) {
      if (status === "Absent") {
        attendanceData.status = status,
          attendanceData.time = time,
          attendanceData.registerId,
          await attendanceData.save()
        return res.status(200).json({ success: true, message: "attendance Status Absent update Successfully " })
      }
      else if (status === "Present") {
        attendanceData.status = status,
          attendanceData.time = time,
          attendanceData.registerId = registerId
        return await res.status(200).json({ success: true, message: "attendance Status Persent Update update Successfully" })
      }


    }
    const newAttendance = new Attendance({
      attendanceDate,
      registerId,
      status,
      time,
    })
    await newAttendance.save()
    res.status(201).json({ success: true, message: "Attendance Mark SuccessFully" })
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
}

export const getAttendanceDetails = async (req, res) => {
  try {
    const AttendanceData = await Attendance.find({})
    if (!AttendanceData) {
      return res.status(400).json({ success: false, message: "attendance records not found" })
    }
    res.status(200).json({ success: true, message: "Record found successfully", AttendanceData })
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }

}