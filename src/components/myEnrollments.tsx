
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
// import { Client, Databases, Account, Models, Query } from "appwrite";
// import Image from "next/image";
// import Lottie from "lottie-react";
// import emptyAnimation from "../../src/lottie/empty.json";

// import { useEnrollments } from "@/hooks/useEnrollments";
// import { useNotifications } from "@/components/notificationContext";

// const client = new Client()
//   .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
//   .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

// const databases = new Databases(client);
// const account = new Account(client);

// interface Enrollment extends Models.Document {
//   studentId: string;
//   courseId: string;
//   status: string;
//   progress: number;
//   enrolledAt: string;
// }

// interface Course extends Models.Document {
//   title: string;
// }

// interface EnrollButtonProps {
//   courseId: string;
//   userId?: string | null;
//   userName?: string | null;
//   courseName: string;
// }

// const EnrollButton: React.FC<EnrollButtonProps> = ({
//   courseId,
//   userId,
//   userName,
//   courseName,
// }) => {
//   const { createEnrollment } = useEnrollments(userId || "");
//   const { addNotification } = useNotifications();
//   const [loading, setLoading] = useState(false);

//   if (!userId) {
//     return null;
//   }

//   const handleEnroll = async () => {
//     if (!userId || !userName) return;
//     setLoading(true);
//     try {
//       await createEnrollment(courseId, courseName, userName);
//       addNotification("Enrollment successful 🎉", "success");
//     } catch (err) {
//       console.error(err);
//       addNotification("Error enrolling in course ❌", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button
//       disabled={loading}
//       onClick={handleEnroll}
//       className={`px-4 py-2 rounded text-white transition-all duration-300 ${
//         loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
//       }`}
//     >
//       {loading ? "Enrolling..." : "Enroll"}
//     </button>
//   );
// };

// const EnrollmentsPage: React.FC = () => {
//   const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [userId, setUserId] = useState<string | null>(null);
//   const [userName, setUserName] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const user = await account.get();
//         setUserId(user.$id);
//         setUserName(user.name || "Guest");
//       } catch {
//         console.error("No logged in user");
//       }
//     };
//     fetchUser();
//   }, []);

//   useEffect(() => {
//     if (!userId) return;

//     const fetchData = async () => {
//       try {
//         const enrollRes = await databases.listDocuments<Enrollment>(
//           process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
//           process.env.NEXT_PUBLIC_APPWRITE_ENROLLMENTS_COLLECTION_ID!,
//           [Query.equal("studentId", userId)]
//         );

//         const courseRes = await databases.listDocuments<Course>(
//           process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
//           process.env.NEXT_PUBLIC_APPWRITE_COURSES_COLLECTION_ID!
//         );

//         setEnrollments(enrollRes.documents);
//         setCourses(courseRes.documents);
//       } catch (err) {
//         console.error("Error fetching enrollments:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [userId]);

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
//     <Box sx={{ maxWidth: "900px", mx: "auto", mt: 5, p: 3 }}>
//       <Typography
//         variant="h4"
//         gutterBottom
//         sx={{ fontWeight: 700, textAlign: "center", mb: 4 }}
//       >
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
//           }}
//         >
//           <Lottie
//             animationData={emptyAnimation}
//             loop
//             style={{ width: 250, height: 250, margin: "0 auto" }}
//           />
//           <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
//             You haven’t enrolled in any course yet
//           </Typography>
//           <Button variant="contained" color="primary" href="/courses">
//             Browse Courses
//           </Button>
//         </Box>
//       ) : (
//         <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
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
import { Client, Databases, Account, Models, Query } from "appwrite";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import emptyAnimation from "../../src/lottie/empty.json";

import { useEnrollments } from "@/hooks/useEnrollments";
import { useNotifications } from "@/components/notificationContext";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);
const account = new Account(client);

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

interface EnrollButtonProps {
  courseId: string;
  userId?: string | null;
  userName?: string | null;
  courseName: string;
}

const EnrollButton: React.FC<EnrollButtonProps> = ({
  courseId,
  userId,
  userName,
  courseName,
}) => {
  const { createEnrollment } = useEnrollments(userId || "");
  const { addNotification } = useNotifications();
  const [loading, setLoading] = useState(false);

  if (!userId) return null;

  const handleEnroll = async () => {
    if (!userId || !userName) return;
    setLoading(true);
    try {
      await createEnrollment(courseId, courseName, userName);
      addNotification("Enrollment successful 🎉", "success");
    } catch (err) {
      console.error(err);
      addNotification("Error enrolling in course ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={handleEnroll}
      className={`px-4 py-2 rounded text-white transition-all duration-300 ${
        loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {loading ? "Enrolling..." : "Enroll"}
    </button>
  );
};

const EnrollmentsPage: React.FC = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUserId(user.$id);
        setUserName(user.name || "Guest");
      } catch {
        console.error("No logged in user");
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const enrollRes = await databases.listDocuments<Enrollment>(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_ENROLLMENTS_COLLECTION_ID!,
          [Query.equal("studentId", userId)]
        );

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

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await databases.deleteDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_ENROLLMENTS_COLLECTION_ID!,
          id
        );
        setEnrollments((prev) => prev.filter((enr) => enr.$id !== id));
        Swal.fire("Deleted!", "Your enrollment has been deleted.", "success");
      } catch (err) {
        console.error("Error deleting enrollment:", err);
        Swal.fire("Error!", "There was an issue deleting the enrollment.", "error");
      }
    }
  };

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
    <Box sx={{ maxWidth: "900px", mx: "auto", mt: 5, p: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 700, textAlign: "center", mb: 4 }}
      >
        My Enrollments
      </Typography>

      {enrollments.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            p: 6,
            borderRadius: 5,
            boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
            background: "linear-gradient(145deg, #f0f4ff, #e6ecf7)",
            maxWidth: 500,
            mx: "auto",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: "0 16px 50px rgba(0,0,0,0.1)",
            },
          }}
        >
          <Lottie
            animationData={emptyAnimation}
            loop
            style={{ width: 280, height: 280, margin: "0 auto" }}
          />
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: "#1a202c" }}>
            You haven’t enrolled in any course yet
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="/courses"
            sx={{
              px: 5,
              py: 1.5,
              fontWeight: 600,
              borderRadius: 3,
              textTransform: "none",
              boxShadow: "0 4px 15px rgba(0, 123, 255, 0.3)",
              "&:hover": {
                backgroundColor: "#0056b3",
                boxShadow: "0 6px 20px rgba(0, 123, 255, 0.35)",
              },
            }}
          >
            Browse Courses
          </Button>
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 4,
            boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
            overflow: "hidden",
          }}
        >
          <Table>
            <TableHead sx={{ bgcolor: "#e3f2fd" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Course Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Progress</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enrollments.map((enr) => {
                const course = courses.find((c) => c.$id === enr.courseId);
                return (
                  <TableRow
                    key={enr.$id}
                    sx={{
                      "&:hover": { backgroundColor: "#f5faff" },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <TableCell>{course?.title || "Unknown Course"}</TableCell>
                    <TableCell>{enr.status}</TableCell>
                    <TableCell>{enr.progress}%</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(enr.$id)}
                        sx={{
                          textTransform: "none",
                          fontWeight: 600,
                          "&:hover": { backgroundColor: "#f8d7da" },
                        }}
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
