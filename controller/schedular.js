

// export const createNotice = async(req,res)=>{
//     const {title,content} = req.body
//     try {
        
//     } catch (error) {
        
//     }
// }



// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTeacher } from "../redux/teacherSlice";

// const TeacherList = () => {
//   const dispatch = useDispatch();
//   const { teacherData, loading, error } = useSelector((state) => state.teacher);

//   useEffect(() => {
//     dispatch(fetchTeacher()); // Dispatch the fetch action when the component mounts
//   }, [dispatch]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
//         <span className="ml-4">Fetching Data, Please Wait...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-600">
//         <p>Error: {error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-semibold text-gray-800 mb-4">Teachers List</h1>
//       <ul>
//         {teacherData.map((teacher) => (
//           <li key={teacher.id} className="p-4 border-b">
//             <h3 className="text-xl font-semibold">{teacher.name}</h3>
//             <p>{teacher.email}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TeacherList;
