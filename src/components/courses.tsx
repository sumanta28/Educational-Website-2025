// // "use client";

// // import React, { useEffect, useState } from "react";
// // import {
// //   Grid,
// //   Card,
// //   CardContent,
// //   Typography,
// //   CardMedia,
// //   CircularProgress,
// //   Button,
// //   ToggleButton,
// //   ToggleButtonGroup,
// //   Box,
// //   Chip,
// //   Pagination,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   ThemeProvider,
// //   createTheme,
// //   CssBaseline,
// // } from "@mui/material";
// // import { Client, Databases, Query, ID, Account } from "appwrite";
// // import { useCart } from "../components/CartContext";
// // import ViewModuleIcon from "@mui/icons-material/ViewModule";
// // import ViewListIcon from "@mui/icons-material/ViewList";
// // import { toast } from "sonner";
// // import { useNotifications } from "@/components/notificationContext";
// // import { useAuth } from "@/components/AuthContext"; 

// // const client = new Client()
// //   .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
// //   .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

// // const databases = new Databases(client);
// // const account = new Account(client);

// // // Theme matching About page
// // const theme = createTheme({
// //   palette: {
// //     primary: { main: "#003366" },
// //     secondary: { main: "#1976d2" },
// //     background: { default: "#ffffff", paper: "#e6f0ff" },
// //     text: { primary: "#000000", secondary: "#333333" },
// //   },
// //   typography: { fontFamily: "Roboto, Arial, sans-serif" },
// // });

// // interface Course {
// //   $id: string;
// //   title: string;
// //   description: string;
// //   Price?: number;
// //   ImageUrl?: string;
// //   category?: string;
// //   syllabus?: string; 
// // }

// // const CoursesComponent: React.FC = () => {
// //   const [courses, setCourses] = useState<Course[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [view, setView] = useState<"grid" | "list">("grid");
// //   const { addNotification } = useNotifications();
// //   const { user, isLoggedIn } = useAuth(); 
// //   const [selectedCategory, setSelectedCategory] = useState("All");
// //   const [page, setPage] = useState(1);
// //   const itemsPerPage = 9;
// //   const { cart, addToCart } = useCart();
// //   const [enrolledCourses, setEnrolledCourses] = useState<Set<string>>(new Set());
// //   const [openModal, setOpenModal] = useState(false);
// //   const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

// //   useEffect(() => {
// //     const fetchUserEnrollments = async () => {
// //       if (!isLoggedIn || !user) return;
// //       try {
// //         const res = await databases.listDocuments(
// //           process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
// //           process.env.NEXT_PUBLIC_APPWRITE_ENROLLMENTS_COLLECTION_ID!,
// //           [Query.equal("studentId", user.id)]
// //         );
// //         setEnrolledCourses(new Set(res.documents.map((doc: any) => doc.courseId)));
// //       } catch (err) {
// //         console.error("No enrollments found", err);
// //       }
// //     };
// //     fetchUserEnrollments();
// //   }, [isLoggedIn, user]);

// //   useEffect(() => {
// //     const fetchCourses = async () => {
// //       try {
// //         const response = await databases.listDocuments(
// //           process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
// //           process.env.NEXT_PUBLIC_APPWRITE_COURSES_COLLECTION_ID!,
// //           [Query.limit(100)]
// //         );
// //         const mappedCourses: Course[] = response.documents.map((doc: any) => ({
// //           $id: doc.$id,
// //           title: doc.title,
// //           description: doc.description,
// //           Price: doc.Price,
// //           ImageUrl: doc.ImageUrl,
// //           category: doc.category || "General",
// //           syllabus: doc.syllabus || "No syllabus available",
// //         }));
// //         setCourses(mappedCourses);
// //       } catch (err) {
// //         console.error("Error fetching courses:", err);
// //         setError("Failed to fetch courses.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchCourses();
// //   }, []);

// //   const handleEnroll = async (course: Course) => {
// //     if (!isLoggedIn || !user) {
// //       toast.error("⚠️ Please log in to enroll in a course.");
// //       return;
// //     }
// //     if (enrolledCourses.has(course.$id)) {
// //       toast.info(" You are already enrolled in this course.");
// //       return;
// //     }
// //     try {
// //       await databases.createDocument(
// //         process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
// //         process.env.NEXT_PUBLIC_APPWRITE_ENROLLMENTS_COLLECTION_ID!,
// //         ID.unique(),
// //         {
// //           studentId: user.id,
// //           studentName: user.name,
// //           courseId: course.$id,
// //           courseName: course.title,
// //           status: "active",
// //           progress: 0,
// //           enrolledAt: new Date().toISOString(),
// //         }
// //       );
// //       addNotification(`You are enrolled in ${course.title}`, "success");
// //       toast.success(`You are enrolled in ${course.title}`);
// //       setEnrolledCourses((prev) => new Set(prev).add(course.$id));
// //     } catch (err: any) {
// //       console.error("❌ Enrollment failed:", err.message || err);
// //       toast.error("Enrollment failed. Please try again.");
// //     }
// //   };

// //   const filteredCourses =
// //     selectedCategory === "All"
// //       ? courses
// //       : courses.filter((c) => c.category === selectedCategory);

// //   const paginatedCourses = filteredCourses.slice(
// //     (page - 1) * itemsPerPage,
// //     page * itemsPerPage
// //   );

// //   const categories = ["All", ...new Set(courses.map((c) => c.category))];

// //   return (
// //     <ThemeProvider theme={theme}>
// //       <CssBaseline />

// //       {/* Filters */}
// //       <Box
// //         sx={{
// //           display: "flex",
// //           flexWrap: "wrap",
// //           gap: 2,
// //           alignItems: "center",
// //           p: 2,
// //           borderBottom: "1px solid #ddd",
// //           bgcolor: "background.default",
// //         }}
// //       >
// //         <Box sx={{ flex: 1 }}>
// //           {categories.map((cat) => (
// //             <Chip
// //               key={cat}
// //               label={cat}
// //               clickable
// //               color={selectedCategory === cat ? "primary" : "default"}
// //               onClick={() => {
// //                 setSelectedCategory(cat);
// //                 setPage(1);
// //               }}
// //               sx={{
// //                 mr: 1,
// //                 mb: 1,
// //                 fontWeight: 600,
// //                 "&.MuiChip-colorPrimary": { backgroundColor: "#003366" },
// //               }}
// //             />
// //           ))}
// //         </Box>
// //         <ToggleButtonGroup
// //           value={view}
// //           exclusive
// //           onChange={(e, newView) => newView && setView(newView)}
// //           size="small"
// //         >
// //           <ToggleButton value="grid">
// //             <ViewModuleIcon />
// //           </ToggleButton>
// //           <ToggleButton value="list">
// //             <ViewListIcon />
// //           </ToggleButton>
// //         </ToggleButtonGroup>
// //       </Box>

// //       {/* Courses */}
// //       {loading ? (
// //         <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />
// //       ) : error ? (
// //         <Typography color="error">{error}</Typography>
// //       ) : (
// //         <Grid container spacing={3} sx={{ p: 3 }}>
// //           {paginatedCourses.map((course) => {
// //             const isEnrolled = enrolledCourses.has(course.$id);
// //             return (
// //               <Grid
// //                 size={{
// //                   xs: 12,
// //                   sm: view === "grid" ? 6 : 12,
// //                   md: view === "grid" ? 4 : 12,
// //                 }}
// //                 key={course.$id}
// //               >
// //                 <Card
// //                   onClick={() => {
// //                     setSelectedCourse(course);
// //                     setOpenModal(true);
// //                   }}
// //                   sx={{
// //                     borderRadius: 3,
// //                     boxShadow: 3,
// //                     display: view === "list" ? "flex" : "block",
// //                     alignItems: "center",
// //                     height: view === "grid" ? 350 : "auto",
// //                     cursor: "pointer",
// //                     transition: "transform 0.3s, box-shadow 0.3s",
// //                     "&:hover": {
// //                       transform: "translateY(-5px)",
// //                       boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
// //                     },
// //                     backgroundColor: "background.paper",
// //                   }}
// //                 >
// //                   {course.ImageUrl && (
// //                     <CardMedia
// //                       component="img"
// //                       sx={{
// //                         width: view === "list" ? 160 : "100%",
// //                         height: view === "list" ? "100%" : 180,
// //                         objectFit: "cover",
// //                         borderRadius: view === "list" ? "0 0 0 0" : 2,
// //                       }}
// //                       image={course.ImageUrl}
// //                       alt={course.title}
// //                     />
// //                   )}
// //                   <CardContent sx={{ flex: 1 }}>
// //                     <Typography variant="h6" fontWeight="bold" color="primary">
// //                       {course.title}
// //                     </Typography>
// //                     <Typography variant="body2" color="text.secondary">
// //                       {course.description}
// //                     </Typography>
// //                     <Typography variant="body1" color="secondary">
// //                       {course.Price ? `Price: $${course.Price}` : "Free"}
// //                     </Typography>
// //                   </CardContent>
// //                 </Card>
// //               </Grid>
// //             );
// //           })}
// //         </Grid>
// //       )}

// //       {/* Pagination */}
// //       <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 6 }}>
// //         <Pagination
// //           count={Math.ceil(filteredCourses.length / itemsPerPage)}
// //           page={page}
// //           onChange={(e, value) => setPage(value)}
// //           color="primary"
// //           shape="rounded"
// //           size="large"
// //         />
// //       </Box>

// //       {/* Modal */}
// //       {selectedCourse && (
// //         <Dialog
// //           open={openModal}
// //           onClose={() => setOpenModal(false)}
// //           maxWidth="sm"
// //           fullWidth
// //         >
// //           <DialogTitle>{selectedCourse.title}</DialogTitle>
// //           <DialogContent dividers>
// //             {selectedCourse.ImageUrl && (
// //               <Box sx={{ textAlign: "center", mb: 2 }}>
// //                 <img
// //                   src={selectedCourse.ImageUrl}
// //                   alt={selectedCourse.title}
// //                   style={{ maxWidth: "100%", borderRadius: 8 }}
// //                 />
// //               </Box>
// //             )}
// //             <Typography variant="body1" gutterBottom>
// //               {selectedCourse.description}
// //             </Typography>
// //             <Typography variant="body2" color="text.secondary" gutterBottom>
// //               <strong>Category:</strong> {selectedCourse.category}
// //             </Typography>
// //             <Typography variant="body2" gutterBottom>
// //               <strong>Price:</strong>{" "}
// //               {selectedCourse.Price ? `$${selectedCourse.Price}` : "Free"}
// //             </Typography>
// //             {isLoggedIn ? (
// //               <Typography variant="body2" gutterBottom>
// //                 <strong>Syllabus:</strong> {selectedCourse.syllabus}
// //               </Typography>
// //             ) : (
// //               <Typography
// //                 variant="body2"
// //                 color="error"
// //                 sx={{ mt: 2, fontStyle: "italic" }}
// //               >
// //                 🔒 Please log in to view the syllabus.
// //               </Typography>
// //             )}
// //           </DialogContent>
// //           <DialogActions>
// //            {isLoggedIn ? (
// //   cart.some((c) => c.$id === selectedCourse.$id) ? (
// //     <Button variant="outlined" color="success" disabled>
// //       Added
// //     </Button>
// //   ) : (
// //     <Button
// //       variant="contained"
// //       color="primary"
// //       onClick={() => addToCart(selectedCourse)}
// //     >
// //       Add to Cart
// //     </Button>
// //   )
// // ) : (
// //   <Button
// //     variant="contained"
// //     color="primary"
// //     disabled
// //     onClick={() => toast.error("⚠️ Please log in to add to cart.")}
// //   >
// //     Add to Cart
// //   </Button>
// // )}

// //             {enrolledCourses.has(selectedCourse.$id) ? (
// //               <Button variant="outlined" color="success" disabled>
// //                 Enrolled
// //               </Button>
// //             ) : (
// //               <Button
// //                 variant="outlined"
// //                 color="secondary"
// //                 onClick={() => handleEnroll(selectedCourse)}
// //               >
// //                 Enroll
// //               </Button>
// //             )}
// //           </DialogActions>
// //         </Dialog>
// //       )}
// //     </ThemeProvider>
// //   );
// // };

// // export default CoursesComponent;



// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   CardMedia,
//   CircularProgress,
//   Button,
//   ToggleButton,
//   ToggleButtonGroup,
//   Box,
//   Chip,
//   Pagination,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   ThemeProvider,
//   createTheme,
//   CssBaseline,
// } from "@mui/material";
// import { Client, Databases, Query, ID, Account } from "appwrite";
// import { useCart } from "../components/CartContext";
// import ViewModuleIcon from "@mui/icons-material/ViewModule";
// import ViewListIcon from "@mui/icons-material/ViewList";
// import { toast } from "sonner";
// import { useNotifications } from "@/components/notificationContext";
// import { useAuth } from "@/components/AuthContext";

// const client = new Client()
//   .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
//   .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

// const databases = new Databases(client);
// const account = new Account(client);

// // Theme matching About page
// const theme = createTheme({
//   palette: {
//     primary: { main: "#003366" },
//     secondary: { main: "#1976d2" },
//     background: { default: "#ffffff", paper: "#e6f0ff" },
//     text: { primary: "#000000", secondary: "#333333" },
//   },
//   typography: { fontFamily: "Roboto, Arial, sans-serif" },
// });

// interface Course {
//   $id: string;
//   title: string;
//   description: string;
//   Price?: number;
//   ImageUrl?: string;
//   category?: string;
//   syllabus?: string;
// }

// // Type for Appwrite course document
// interface AppwriteCourseDoc {
//   $id: string;
//   title: string;
//   description: string;
//   Price?: number;
//   ImageUrl?: string;
//   category?: string;
//   syllabus?: string;
// }

// const CoursesComponent: React.FC = () => {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [view, setView] = useState<"grid" | "list">("grid");
//   const { addNotification } = useNotifications();
//   const { user, isLoggedIn } = useAuth();
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 9;
//   const { cart, addToCart } = useCart();
//   const [enrolledCourses, setEnrolledCourses] = useState<Set<string>>(new Set());
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

//   useEffect(() => {
//     const fetchUserEnrollments = async () => {
//       if (!isLoggedIn || !user) return;
//       try {
//         const res = await databases.listDocuments(
//           process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
//           process.env.NEXT_PUBLIC_APPWRITE_ENROLLMENTS_COLLECTION_ID!,
//           [Query.equal("studentId", user.id)]
//         );
//         setEnrolledCourses(new Set(res.documents.map((doc: { courseId: string }) => doc.courseId)));
//       } catch (err) {
//         console.error("No enrollments found", err);
//       }
//     };
//     fetchUserEnrollments();
//   }, [isLoggedIn, user]);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await databases.listDocuments(
//           process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
//           process.env.NEXT_PUBLIC_APPWRITE_COURSES_COLLECTION_ID!,
//           [Query.limit(100)]
//         );
//         const mappedCourses: Course[] = response.documents.map((doc: AppwriteCourseDoc) => ({
//           $id: doc.$id,
//           title: doc.title,
//           description: doc.description,
//           Price: doc.Price,
//           ImageUrl: doc.ImageUrl,
//           category: doc.category || "General",
//           syllabus: doc.syllabus || "No syllabus available",
//         }));
//         setCourses(mappedCourses);
//       } catch (err) {
//         console.error("Error fetching courses:", err);
//         setError("Failed to fetch courses.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCourses();
//   }, []);

//   const handleEnroll = async (course: Course) => {
//     if (!isLoggedIn || !user) {
//       toast.error("⚠️ Please log in to enroll in a course.");
//       return;
//     }
//     if (enrolledCourses.has(course.$id)) {
//       toast.info(" You are already enrolled in this course.");
//       return;
//     }
//     try {
//       await databases.createDocument(
//         process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
//         process.env.NEXT_PUBLIC_APPWRITE_ENROLLMENTS_COLLECTION_ID!,
//         ID.unique(),
//         {
//           studentId: user.id,
//           studentName: user.name,
//           courseId: course.$id,
//           courseName: course.title,
//           status: "active",
//           progress: 0,
//           enrolledAt: new Date().toISOString(),
//         }
//       );
//       addNotification(`You are enrolled in ${course.title}`, "success");
//       toast.success(`You are enrolled in ${course.title}`);
//       setEnrolledCourses((prev) => new Set(prev).add(course.$id));
//     } catch (err) {
//       console.error("❌ Enrollment failed:", err);
//       toast.error("Enrollment failed. Please try again.");
//     }
//   };

//   const filteredCourses =
//     selectedCategory === "All"
//       ? courses
//       : courses.filter((c) => c.category === selectedCategory);

//   const paginatedCourses = filteredCourses.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//   const categories = ["All", ...new Set(courses.map((c) => c.category))];

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />

//       {/* Filters */}
//       <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           gap: 2,
//           alignItems: "center",
//           p: 2,
//           borderBottom: "1px solid #ddd",
//           bgcolor: "background.default",
//         }}
//       >
//         <Box sx={{ flex: 1 }}>
//           {categories.map((cat) => (
//             <Chip
//               key={cat}
//               label={cat}
//               clickable
//               color={selectedCategory === cat ? "primary" : "default"}
//               onClick={() => {
//                 setSelectedCategory(cat);
//                 setPage(1);
//               }}
//               sx={{
//                 mr: 1,
//                 mb: 1,
//                 fontWeight: 600,
//                 "&.MuiChip-colorPrimary": { backgroundColor: "#003366" },
//               }}
//             />
//           ))}
//         </Box>
//         <ToggleButtonGroup
//           value={view}
//           exclusive
//           onChange={(e, newView) => newView && setView(newView)}
//           size="small"
//         >
//           <ToggleButton value="grid">
//             <ViewModuleIcon />
//           </ToggleButton>
//           <ToggleButton value="list">
//             <ViewListIcon />
//           </ToggleButton>
//         </ToggleButtonGroup>
//       </Box>

//       {/* Courses */}
//       {loading ? (
//         <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />
//       ) : error ? (
//         <Typography color="error">{error}</Typography>
//       ) : (
//         <Grid container spacing={3} sx={{ p: 3 }}>
//           {paginatedCourses.map((course) => {
//             const isEnrolled = enrolledCourses.has(course.$id);
//             return (
//               <Grid
//                 size={{
//                   xs: 12,
//                   sm: view === "grid" ? 6 : 12,
//                   md: view === "grid" ? 4 : 12,
//                 }}
//                 key={course.$id}
//               >
//                 <Card
//                   onClick={() => {
//                     setSelectedCourse(course);
//                     setOpenModal(true);
//                   }}
//                   sx={{
//                     borderRadius: 3,
//                     boxShadow: 3,
//                     display: view === "list" ? "flex" : "block",
//                     alignItems: "center",
//                     height: view === "grid" ? 350 : "auto",
//                     cursor: "pointer",
//                     transition: "transform 0.3s, box-shadow 0.3s",
//                     "&:hover": {
//                       transform: "translateY(-5px)",
//                       boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
//                     },
//                     backgroundColor: "background.paper",
//                   }}
//                 >
//                   {course.ImageUrl && (
//                     <CardMedia
//                       component="img"
//                       sx={{
//                         width: view === "list" ? 160 : "100%",
//                         height: view === "list" ? "100%" : 180,
//                         objectFit: "cover",
//                         borderRadius: view === "list" ? "0 0 0 0" : 2,
//                       }}
//                       image={course.ImageUrl}
//                       alt={course.title}
//                     />
//                   )}
//                   <CardContent sx={{ flex: 1 }}>
//                     <Typography variant="h6" fontWeight="bold" color="primary">
//                       {course.title}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       {course.description}
//                     </Typography>
//                     <Typography variant="body1" color="secondary">
//                       {course.Price ? `Price: $${course.Price}` : "Free"}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             );
//           })}
//         </Grid>
//       )}

//       {/* Pagination */}
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 6 }}>
//         <Pagination
//           count={Math.ceil(filteredCourses.length / itemsPerPage)}
//           page={page}
//           onChange={(e, value) => setPage(value)}
//           color="primary"
//           shape="rounded"
//           size="large"
//         />
//       </Box>

//       {/* Modal */}
//       {selectedCourse && (
//         <Dialog
//           open={openModal}
//           onClose={() => setOpenModal(false)}
//           maxWidth="sm"
//           fullWidth
//         >
//           <DialogTitle>{selectedCourse.title}</DialogTitle>
//           <DialogContent dividers>
//             {selectedCourse.ImageUrl && (
//               <Box sx={{ textAlign: "center", mb: 2 }}>
//                 <img
//                   src={selectedCourse.ImageUrl}
//                   alt={selectedCourse.title}
//                   style={{ maxWidth: "100%", borderRadius: 8 }}
//                 />
//               </Box>
//             )}
//             <Typography variant="body1" gutterBottom>
//               {selectedCourse.description}
//             </Typography>
//             <Typography variant="body2" color="text.secondary" gutterBottom>
//               <strong>Category:</strong> {selectedCourse.category}
//             </Typography>
//             <Typography variant="body2" gutterBottom>
//               <strong>Price:</strong>{" "}
//               {selectedCourse.Price ? `$${selectedCourse.Price}` : "Free"}
//             </Typography>
//             {isLoggedIn ? (
//               <Typography variant="body2" gutterBottom>
//                 <strong>Syllabus:</strong> {selectedCourse.syllabus}
//               </Typography>
//             ) : (
//               <Typography
//                 variant="body2"
//                 color="error"
//                 sx={{ mt: 2, fontStyle: "italic" }}
//               >
//                 🔒 Please log in to view the syllabus.
//               </Typography>
//             )}
//           </DialogContent>
//           <DialogActions>
//             {isLoggedIn ? (
//               cart.some((c) => c.$id === selectedCourse.$id) ? (
//                 <Button variant="outlined" color="success" disabled>
//                   Added
//                 </Button>
//               ) : (
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={() => addToCart(selectedCourse)}
//                 >
//                   Add to Cart
//                 </Button>
//               )
//             ) : (
//               <Button
//                 variant="contained"
//                 color="primary"
//                 disabled
//                 onClick={() => toast.error("⚠️ Please log in to add to cart.")}
//               >
//                 Add to Cart
//               </Button>
//             )}

//             {enrolledCourses.has(selectedCourse.$id) ? (
//               <Button variant="outlined" color="success" disabled>
//                 Enrolled
//               </Button>
//             ) : (
//               <Button
//                 variant="outlined"
//                 color="secondary"
//                 onClick={() => handleEnroll(selectedCourse)}
//               >
//                 Enroll
//               </Button>
//             )}
//           </DialogActions>
//         </Dialog>
//       )}
//     </ThemeProvider>
//   );
// };

// export default CoursesComponent;


"use client";

import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  CircularProgress,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Chip,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { Client, Databases, Query, ID, Account, Models } from "appwrite";
import { useCart } from "../components/CartContext";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import { toast } from "sonner";
import { useNotifications } from "@/components/notificationContext";
import { useAuth } from "@/components/AuthContext";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);
const account = new Account(client);

// Theme matching About page
const theme = createTheme({
  palette: {
    primary: { main: "#003366" },
    secondary: { main: "#1976d2" },
    background: { default: "#ffffff", paper: "#e6f0ff" },
    text: { primary: "#000000", secondary: "#333333" },
  },
  typography: { fontFamily: "Roboto, Arial, sans-serif" },
});

interface Course {
  $id: string;
  title: string;
  description: string;
  Price?: number;
  ImageUrl?: string;
  category?: string;
  syllabus?: string;
}

const CoursesComponent: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const { addNotification } = useNotifications();
  const { user, isLoggedIn } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;
  const { cart, addToCart } = useCart();
  const [enrolledCourses, setEnrolledCourses] = useState<Set<string>>(new Set());
  const [openModal, setOpenModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Fetch user enrollments
  useEffect(() => {
    const fetchUserEnrollments = async () => {
      if (!isLoggedIn || !user) return;
      try {
        const res = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_ENROLLMENTS_COLLECTION_ID!
        );
        // Transform DefaultDocument to get courseId safely
        const enrolled = new Set(
          res.documents
            .map((doc: Models.Document) => (doc as any).courseId)
            .filter((id: string | undefined): id is string => !!id)
        );
        setEnrolledCourses(enrolled);
      } catch (err) {
        console.error("No enrollments found", err);
      }
    };
    fetchUserEnrollments();
  }, [isLoggedIn, user]);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_COURSES_COLLECTION_ID!,
          [Query.limit(100)]
        );
        const mappedCourses: Course[] = response.documents.map((doc: Models.Document) => ({
          $id: doc.$id,
          title: (doc as any).title || "Untitled",
          description: (doc as any).description || "No description",
          Price: (doc as any).Price,
          ImageUrl: (doc as any).ImageUrl,
          category: (doc as any).category || "General",
          syllabus: (doc as any).syllabus || "No syllabus available",
        }));
        setCourses(mappedCourses);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to fetch courses.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (course: Course) => {
    if (!isLoggedIn || !user) {
      toast.error("⚠️ Please log in to enroll in a course.");
      return;
    }
    if (enrolledCourses.has(course.$id)) {
      toast.info(" You are already enrolled in this course.");
      return;
    }
    try {
      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_ENROLLMENTS_COLLECTION_ID!,
        ID.unique(),
        {
          studentId: user.id,
          studentName: user.name,
          courseId: course.$id,
          courseName: course.title,
          status: "active",
          progress: 0,
          enrolledAt: new Date().toISOString(),
        }
      );
      addNotification(`You are enrolled in ${course.title}`, "success");
      toast.success(`You are enrolled in ${course.title}`);
      setEnrolledCourses((prev) => new Set(prev).add(course.$id));
    } catch (err) {
      console.error("❌ Enrollment failed:", err);
      toast.error("Enrollment failed. Please try again.");
    }
  };

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((c) => c.category === selectedCategory);

  const paginatedCourses = filteredCourses.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const categories = ["All", ...Array.from(new Set(courses.map((c) => c.category)))];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Filters */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid #ddd",
          bgcolor: "background.default",
        }}
      >
        <Box sx={{ flex: 1 }}>
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              clickable
              color={selectedCategory === cat ? "primary" : "default"}
              onClick={() => {
                setSelectedCategory(cat ?? "All");
                setPage(1);
              }}
              sx={{
                mr: 1,
                mb: 1,
                fontWeight: 600,
                "&.MuiChip-colorPrimary": { backgroundColor: "#003366" },
              }}
            />
          ))}
        </Box>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(e, newView) => newView && setView(newView)}
          size="small"
        >
          <ToggleButton value="grid">
            <ViewModuleIcon />
          </ToggleButton>
          <ToggleButton value="list">
            <ViewListIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Courses */}
      {loading ? (
        <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={3} sx={{ p: 3 }}>
          {paginatedCourses.map((course) => {
            const isEnrolled = enrolledCourses.has(course.$id);
            return (
              <Grid
                size={{
                  xs: 12,
                  sm: view === "grid" ? 6 : 12,
                  md: view === "grid" ? 4 : 12,
                }}
                key={course.$id}
              >
                <Card
                  onClick={() => {
                    setSelectedCourse(course);
                    setOpenModal(true);
                  }}
                  sx={{
                    borderRadius: 3,
                    boxShadow: 3,
                    display: view === "list" ? "flex" : "block",
                    alignItems: "center",
                    height: view === "grid" ? 350 : "auto",
                    cursor: "pointer",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                    },
                    backgroundColor: "background.paper",
                  }}
                >
                  {course.ImageUrl && (
                    <CardMedia
                      component="img"
                      sx={{
                        width: view === "list" ? 160 : "100%",
                        height: view === "list" ? "100%" : 180,
                        objectFit: "cover",
                        borderRadius: view === "list" ? "0 0 0 0" : 2,
                      }}
                      image={course.ImageUrl}
                      alt={course.title}
                    />
                  )}
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      {course.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {course.description}
                    </Typography>
                    <Typography variant="body1" color="secondary">
                      {course.Price ? `Price: $${course.Price}` : "Free"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 6 }}>
        <Pagination
          count={Math.ceil(filteredCourses.length / itemsPerPage)}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
          shape="rounded"
          size="large"
        />
      </Box>

      {/* Modal */}
      {selectedCourse && (
        <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>{selectedCourse.title}</DialogTitle>
          <DialogContent dividers>
            {selectedCourse.ImageUrl && (
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <img
                  src={selectedCourse.ImageUrl}
                  alt={selectedCourse.title}
                  style={{ maxWidth: "100%", borderRadius: 8 }}
                />
              </Box>
            )}
            <Typography variant="body1" gutterBottom>
              {selectedCourse.description}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Category:</strong> {selectedCourse.category}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Price:</strong>{" "}
              {selectedCourse.Price ? `$${selectedCourse.Price}` : "Free"}
            </Typography>
            {isLoggedIn ? (
              <Typography variant="body2" gutterBottom>
                <strong>Syllabus:</strong> {selectedCourse.syllabus}
              </Typography>
            ) : (
              <Typography
                variant="body2"
                color="error"
                sx={{ mt: 2, fontStyle: "italic" }}
              >
                🔒 Please log in to view the syllabus.
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            {isLoggedIn ? (
              cart.some((c) => c.$id === selectedCourse.$id) ? (
                <Button variant="outlined" color="success" disabled>
                  Added
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addToCart(selectedCourse as any)}
                >
                  Add to Cart
                </Button>
              )
            ) : (
              <Button
                variant="contained"
                color="primary"
                disabled
                onClick={() => toast.error("⚠️ Please log in to add to cart.")}
              >
                Add to Cart
              </Button>
            )}

            {enrolledCourses.has(selectedCourse.$id) ? (
              <Button variant="outlined" color="success" disabled>
                Enrolled
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleEnroll(selectedCourse)}
              >
                Enroll
              </Button>
            )}
          </DialogActions>
        </Dialog>
      )}
    </ThemeProvider>
  );
};

export default CoursesComponent;
