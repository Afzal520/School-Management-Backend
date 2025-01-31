import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Authentication from "../models/auth.js";

const jwtSecret = "your_jwt_secret_key"; // Replace with your actual secret key

export const Register = async (req, res) => {
  const { fullName, email, password, role } = req.body;
  console.log(role);

  if (!fullName || !email || !password || !role) {
    return res.status(400).json({ success: false, message: "Please fill all required fields" });
  }

  try {
    // Check if user already exists
    const existingUser = await Authentication.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new Authentication({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, jwtSecret, { expiresIn: "1h" });

    // Set cookie based on role
    if (role === "admin") {
      res.cookie("adminToken", token, { httpOnly: true });
    } else if (role === "teacher") {
      res.cookie("teacherToken", token, { httpOnly: true });
    } else {
      res.cookie("studentToken", token, { httpOnly: true });
    }

    // Send response
    return res.status(201).json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const fetchAuth = async(req,res)=>{
  const { id } = req.params;
 console.log(id)
  try {
    const getAuth = await Authentication.findOne({_id:id})
    console.log(getAuth)
    if(!getAuth){
      return res.status(400).json({success:false,message:"data not found"})
    }
    console.log(getAuth)
    res.status(200).json({success:true,message:"DATA found",data:{
      role:getAuth.role,
      id:getAuth._id
    }})

  } catch (error) {
    
  }
}
export const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Please fill all required fields" });
  }

  try {
    // Check if user exists
    const user = await Authentication.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User does not exist" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: "1h" });

    // Set cookie
    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({ success: true, message: "Logged in successfully", token ,user});
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};