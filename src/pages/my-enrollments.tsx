// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
// } from "@mui/material";
// import { Client, Databases, Account } from "appwrite";
// import Image from "next/image"

// // Appwrite setup
// const client = new Client()
//   .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
//   .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

// const databases = new Databases(client);
// const account = new Account(client);

// // Interfaces
// interface Enrollment {
//   $id: string;
//   studentId: string;
//   courseId: string;
//   status: string;
//   progress: number;
//   enrolledAt: string;
// }

// interface Course {
//   $id: string;
//   title: string;
// }

// const EnrollmentsPage: React.FC = () => {
//   const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [userId, setUserId] = useState<string | null>(null);

//   // Fetch logged-in user
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const user = await account.get();
//         setUserId(user.$id);
//       } catch (err) {
//         console.error("No logged in user", err);
//       }
//     };
//     fetchUser();
//   }, []);

//   // Fetch Enrollments + Courses
//   useEffect(() => {
//     if (!userId) return;

//     const fetchData = async () => {
//       try {
//         // Get Enrollments
//         const enrollRes = await databases.listDocuments(
//           process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
//           process.env.NEXT_PUBLIC_APPWRITE_ENROLLMENTS_COLLECTION_ID!
//         );

//         // Get Courses
//         const courseRes = await databases.listDocuments(
//           process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
//           process.env.NEXT_PUBLIC_APPWRITE_COURSES_COLLECTION_ID!
//         );

//         setEnrollments(enrollRes.documents as Enrollment[]);
//         setCourses(courseRes.documents as Course[]);
//       } catch (err) {
//         console.error("Error fetching enrollments:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [userId]);

//   // Delete Enrollment
//   const handleDelete = async (id: string) => {
//     try {
//       await databases.deleteDocument(
//         process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
//         process.env.NEXT_PUBLIC_APPWRITE_ENROLLMENTS_COLLECTION_ID!,
//         id
//       );
//       setEnrollments((prev) => prev.filter((enr) => enr.$id !== id));
//     } catch (err) {
//       console.error("Error deleting enrollment:", err);
//     }
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <CircularProgress
//         sx={{
//           display: "block",
//           mx: "auto",
//           mt: 10,
//         }}
//       />
//     );
//   }

//   return (
//     <Box sx={{ maxWidth: "800px", mx: "auto", mt: 5, p: 3 }}>
//       <Typography variant="h5" gutterBottom>
//         My Enrollments
//       </Typography>

//       {enrollments.length === 0 ? (
      
//         <Box
//           sx={{
//             textAlign: "center",
//             p: 5,
//             borderRadius: 4,
//             boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
//             background: "linear-gradient(145deg, #f8faff, #eef2f7)",
//             maxWidth: 500,
//             mx: "auto",
//             animation: "fadeIn 0.6s ease-in-out",
//             "@keyframes fadeIn": {
//               from: { opacity: 0, transform: "translateY(10px)" },
//               to: { opacity: 1, transform: "translateY(0)" },
//             },
//           }}
//         >
//           <img
//             src="/images/empty-learning.svg" 
//             alt="No enrollments"
//             style={{
//               maxWidth: "250px",
//               marginBottom: "1rem",
//               animation: "float 3s ease-in-out infinite",
//             }}
//           />
//           <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: "#2b2d42" }}>
//             You haven’t enrolled in any course yet
//           </Typography>
//           <Typography sx={{ color: "#6c757d", mb: 3 }}>
//             Start your learning journey today — explore our premium courses and unlock your
//             potential.
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             sx={{
//               borderRadius: "50px",
//               px: 4,
//               py: 1,
//               fontWeight: 600,
//               textTransform: "none",
//               fontSize: "1rem",
//             }}
//             href="/courses"
//           >
//             Browse Courses
//           </Button>

//           <style>
//             {`
//               @keyframes float {
//                 0% { transform: translateY(0px); }
//                 50% { transform: translateY(-6px); }
//                 100% { transform: translateY(0px); }
//               }
//             `}
//           </style>
//         </Box>
//       ) : (
     
//         <TableContainer
//           component={Paper}
//           sx={{ borderRadius: 3, boxShadow: 3, bgcolor: "#f0f8ff" }}
//         >
//           <Table>
//             <TableHead sx={{ bgcolor: "#e3f2fd" }}>
//               <TableRow>
//                 <TableCell>
//                   <b>Course Name</b>
//                 </TableCell>
//                 <TableCell>
//                   <b>Status</b>
//                 </TableCell>
//                 <TableCell>
//                   <b>Progress</b>
//                 </TableCell>
//                 <TableCell>
//                   <b>Actions</b>
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {enrollments.map((enr) => {
//                 const course = courses.find((c) => c.$id === enr.courseId);
//                 return (
//                   <TableRow key={enr.$id}>
//                     <TableCell>{course?.title || "Unknown Course"}</TableCell>
//                     <TableCell>{enr.status}</TableCell>
//                     <TableCell>{enr.progress}%</TableCell>
//                     <TableCell>
//                       <Button
//                         variant="outlined"
//                         color="error"
//                         size="small"
//                         onClick={() => handleDelete(enr.$id)}
//                       >
//                         Delete
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// };

// export default EnrollmentsPage;


"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { Client, Databases, Account, Models } from "appwrite"; // ✅ Added Models
import Image from "next/image";

// Appwrite setup
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);
const account = new Account(client);

// Interfaces
interface Enrollment extends Models.Document {
  studentId: string;
  courseId: string;
  status: string;
  progress: number;
  enrolledAt: string;
}

interface Course extends Models.Document {
  title: string;
}

const EnrollmentsPage: React.FC = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUserId(user.$id);
      } catch (err) {
        console.error("No logged in user", err);
      }
    };
    fetchUser();
  }, []);

  // Fetch Enrollments + Courses
  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        // Get Enrollments
        const enrollRes = await databases.listDocuments<Enrollment>(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_ENROLLMENTS_COLLECTION_ID!
        );

        // Get Courses
        const courseRes = await databases.listDocuments<Course>(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_COURSES_COLLECTION_ID!
        );

        setEnrollments(enrollRes.documents);
        setCourses(courseRes.documents);
      } catch (err) {
        console.error("Error fetching enrollments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // Delete Enrollment
  const handleDelete = async (id: string) => {
    try {
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_ENROLLMENTS_COLLECTION_ID!,
        id
      );
      setEnrollments((prev) => prev.filter((enr) => enr.$id !== id));
    } catch (err) {
      console.error("Error deleting enrollment:", err);
    }
  };

  // Loading state
  if (loading) {
    return (
      <CircularProgress
        sx={{
          display: "block",
          mx: "auto",
          mt: 10,
        }}
      />
    );
  }

  return (
    <Box sx={{ maxWidth: "800px", mx: "auto", mt: 5, p: 3 }}>
      <Typography variant="h5" gutterBottom>
        My Enrollments
      </Typography>

      {enrollments.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            p: 5,
            borderRadius: 4,
            boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
            background: "linear-gradient(145deg, #f8faff, #eef2f7)",
            maxWidth: 500,
            mx: "auto",
            animation: "fadeIn 0.6s ease-in-out",
            "@keyframes fadeIn": {
              from: { opacity: 0, transform: "translateY(10px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          <Image
            src="/images/empty-learning.svg"
            alt="No enrollments"
            width={250}
            height={250}
            style={{
              marginBottom: "1rem",
              animation: "float 3s ease-in-out infinite",
            }}
          />
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, mb: 1, color: "#2b2d42" }}
          >
            You haven’t enrolled in any course yet
          </Typography>
          <Typography sx={{ color: "#6c757d", mb: 3 }}>
            Start your learning journey today — explore our premium courses and
            unlock your potential.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: "50px",
              px: 4,
              py: 1,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "1rem",
            }}
            href="/courses"
          >
            Browse Courses
          </Button>

          <style>
            {`
              @keyframes float {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-6px); }
                100% { transform: translateY(0px); }
              }
            `}
          </style>
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ borderRadius: 3, boxShadow: 3, bgcolor: "#f0f8ff" }}
        >
          <Table>
            <TableHead sx={{ bgcolor: "#e3f2fd" }}>
              <TableRow>
                <TableCell>
                  <b>Course Name</b>
                </TableCell>
                <TableCell>
                  <b>Status</b>
                </TableCell>
                <TableCell>
                  <b>Progress</b>
                </TableCell>
                <TableCell>
                  <b>Actions</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enrollments.map((enr) => {
                const course = courses.find((c) => c.$id === enr.courseId);
                return (
                  <TableRow key={enr.$id}>
                    <TableCell>{course?.title || "Unknown Course"}</TableCell>
                    <TableCell>{enr.status}</TableCell>
                    <TableCell>{enr.progress}%</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(enr.$id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default EnrollmentsPage;
