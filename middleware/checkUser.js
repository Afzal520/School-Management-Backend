// import Authentication from "../models/auth.js";

// export const Checkuser = async (req, res, next) => {
//     // Assuming you're checking for a specific user (perhaps by their ID)
//     const { userId } = req.body

//     const user = await Authentication.findOne({ _id: userId }); // You may need to adjust this query to suit your authentication flow
    
//     if (!user) {
//         return res.status(404).json({ success: false, message: "User not found" });
//     }

//     console.log(user.fullName); // Now `user` is an object, not an array

//     // Now you can check the role
//     if (user.role === "student") {
//         return res.status(401).json({ success: false, message: "Student not Authorized" });
//     }

//     next(); // Proceed if the user is authorized
// };
