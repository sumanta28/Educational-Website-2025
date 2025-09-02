// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   Button,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   CircularProgress,
//   Alert,
//   Grid,
//   Card,
//   CardContent,
//   Avatar,
//   Rating,
//   Chip,
//   Paper,
//   Dialog,
// } from "@mui/material";
// import {
//   PlayArrow as PlayArrowIcon,
//   ExpandMore as ExpandMoreIcon,
//   School as SchoolIcon,
//   People as PeopleIcon,
//   CheckCircle as CheckCircleIcon,
//   Star as StarIcon,
// } from "@mui/icons-material";
// import { useRouter } from "next/navigation";
// import { useQuery } from "@tanstack/react-query";
// import CountUp from "react-countup";
// import { motion, AnimatePresence } from "framer-motion";

// // --- Appwrite Environment ---
// const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
// const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
// const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
// const coursesCollectionId = process.env.NEXT_PUBLIC_APPWRITE_COURSES_COLLECTION_ID!;
// const instructorsCollectionId = process.env.NEXT_PUBLIC_APPWRITE_INSTRUCTORS_COLLECTION_ID!;
// const testimonialsCollectionId = process.env.NEXT_PUBLIC_APPWRITE_TESTIMONIALS_COLLECTION_ID!;
// const faqsCollectionId = process.env.NEXT_PUBLIC_APPWRITE_FAQS_COLLECTION_ID!;
// const statsCollectionId = process.env.NEXT_PUBLIC_APPWRITE_STATS_COLLECTION_ID!;

// // --- Generic fetcher ---
// const fetchDocuments = async <T>(collectionId: string): Promise<T[]> => {
//   const res = await fetch(`${endpoint}/databases/${databaseId}/collections/${collectionId}/documents`, {
//     headers: { "X-Appwrite-Project": projectId },
//   });
//   const data = await res.json();
//   return data.documents || [];
// };

// // --- Types ---
// interface Course { $id: string; title: string; description: string; category: string; Price?: number; ImageUrl?: string; }
// interface Instructor { $id: string; name: string; title: string; bio?: string; experience?: number; studentsCount?: number; rating?: number; profileImage?: string; specialities?: string[]; profileImageUrl?: string; }
// interface Testimonial { $id: string; studentName: string; studentImage?: string; courseName?: string; rating: number; review: string; }
// interface FAQ { question: string; answer: string; order: number; }
// interface Stats { totalStudents: number; totalCourses: number; completionRate: number; satisfactionRate: number; }

// // --- Main Component ---
// const EducationalWebsite: React.FC = () => {
//   const router = useRouter();
//   const videoRef = useRef<HTMLVideoElement>(null);

//   // --- State hooks ---
//   const [showVideo, setShowVideo] = useState(false);
//   const [openCourses, setOpenCourses] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);

//   const [openCourseModal, setOpenCourseModal] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

//   // --- Handlers ---
//   const handleOpenCourses = (category: string) => { setSelectedCategory(category); setOpenCourses(true); };
//   const handleCloseCourses = () => { setSelectedCategory(null); setOpenCourses(false); };

//   const handleOpenCourse = (course: Course) => { setSelectedCourse(course); setOpenCourseModal(true); };
//   const handleCloseCourse = () => { setSelectedCourse(null); setOpenCourseModal(false); };

//   // --- Fetch data ---
//   const { data: courses = [], isLoading: loadingCourses, error: coursesError } = useQuery({
//     queryKey: ["courses"],
//     queryFn: async () => fetchDocuments<Course>(coursesCollectionId),
//   });

//   const { data: instructorsData = [] } = useQuery({
//     queryKey: ["instructors"],
//     queryFn: async () => fetchDocuments<Instructor>(instructorsCollectionId),
//   });

//   const { data: testimonialsData = [] } = useQuery({
//     queryKey: ["testimonials"],
//     queryFn: async () => fetchDocuments<Testimonial>(testimonialsCollectionId),
//   });

//   const { data: faqs = [] } = useQuery({
//     queryKey: ["faqs"],
//     queryFn: async () => fetchDocuments<FAQ>(faqsCollectionId),
//   });

//   const { data: statsData = [] } = useQuery({
//     queryKey: ["stats"],
//     queryFn: async () => fetchDocuments<Stats>(statsCollectionId),
//   });

//   const stats = statsData[0] || null;

//   // --- Auto rotate testimonials ---
//   useEffect(() => {
//     if (testimonialsData.length > 0) {
//       const timer = setInterval(() => setCurrentTestimonial(prev => (prev + 1) % testimonialsData.length), 4000);
//       return () => clearInterval(timer);
//     }
//   }, [testimonialsData]);

//   if (loadingCourses) return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"><CircularProgress size={60} /></Box>;
//   if (coursesError) return <Box textAlign="center" py={10}><Alert severity="error" sx={{ mb: 3 }}>Failed to load content.</Alert><Button variant="contained" onClick={() => window.location.reload()}>Retry</Button></Box>;

//   const gradientBg = "linear-gradient(to bottom, #e0f0ff 0%, #f5faff 100%)";
//   const sectionTypographyProps = { color: "#1e3c72", fontWeight: "bold" };
//   const textTypographyProps = { color: "#2a5298" };

//   return (
//     <Box sx={{ minHeight: "100vh", background: gradientBg, px: 2 }}>

//       {/* Hero Section */}
//      <Box
//   sx={{
//     minHeight: "80vh",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     textAlign: "center",
//     mb: 8,
//   }}
// >
//   <Typography
//     variant="h2"
//     gutterBottom
//     {...sectionTypographyProps}
//   >
//     Transform Your Future with Premium Education
//   </Typography>
//   <Typography
//     variant="h5"
//     sx={{ mb: 4 }}
//     {...textTypographyProps}
//   >
//     Learn from industry experts and advance your career with our comprehensive courses
//   </Typography>

//   {/* Both buttons same style */}
//   <Button
//     variant="contained"
//     startIcon={<PlayArrowIcon />}
//     onClick={() => setShowVideo(true)}
//     sx={{
//       bgcolor: "#1e90ff",
//       color: "#fff",
//       "&:hover": { bgcolor: "#63b3ed" },
//       mb: 2,
//       width: "200px", // same size
//       height: "50px", // same size
//       textTransform: "none",
//     }}
//   >
//    Campus Tour
//   </Button>

//   <Button
//     variant="contained"
//     onClick={() => router.push("/courses")}
//     sx={{
//       bgcolor: "#1e90ff", // same color as first button
//       color: "#fff",
//       "&:hover": { bgcolor: "#63b3ed" },
//       mb: 2,
//       width: "200px", // same size
//       height: "50px", // same size
//       textTransform: "none",
//     }}
//   >
//     Browse Courses
//   </Button>

//   {showVideo && (
//     <Box
//       sx={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         bgcolor: "rgba(0,0,0,0.6)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         zIndex: 9999,
//       }}
//       onClick={() => setShowVideo(false)}
//     >
//       <Box
//         sx={{
//           width: "80%",
//           maxWidth: 800,
//           bgcolor: "black",
//           borderRadius: 2,
//           overflow: "hidden",
//         }}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <video
//           ref={videoRef}
//           width="100%"
//           controls
//           autoPlay
//         >
//           <source src="/videos/lesson1.mp4" type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       </Box>
//     </Box>
//   )}
// </Box>

//       {/* Stats Section */}
//       {stats && <Container maxWidth="lg" sx={{ mb: 8, bgcolor: "transparent" }}>
//         <Typography variant="h4" align="center" gutterBottom {...sectionTypographyProps}>Our Achievements</Typography>
//         <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>We are proud to share our journey of excellence and growth</Typography>
//         <Grid container spacing={4} justifyContent="center" alignItems="center">
//           {[
//             { icon: <PeopleIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />, value: stats.totalStudents, suffix: "+", label: "Happy Students" },
//             { icon: <SchoolIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />, value: stats.totalCourses, suffix: "+", label: "Expert Courses" },
//             { icon: <CheckCircleIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />, value: stats.completionRate, suffix: "%", label: "Completion Rate" },
//             { icon: <StarIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />, value: stats.satisfactionRate, suffix: "%", label: "Satisfaction Rate" }
//           ].map((stat, i) => (
//             <Grid size={{xs:12, sm:6, md:3}} key={i}>
//               <Paper sx={{ p: 3, textAlign: 'center', bgcolor: "background.paper" }}>
//                 {stat.icon}
//                 <Typography variant="h3" color="primary.main"><CountUp end={stat.value} duration={5} separator="," />{stat.suffix}</Typography>
//                 <Typography color="text.secondary">{stat.label}</Typography>
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>}

//       {/* Newly Launched Courses Section */}
//       <Container maxWidth="lg" sx={{ mb: 8 }}>
//   <Typography
//     variant="h4"
//     align="center"
//     gutterBottom
//     sx={{ mb: 2, color: "#1e3c72", fontWeight: "bold" }}  // updated
//   >
//     Newly Launched Courses
//   </Typography>
//   <Typography
//     variant="body2"
//     align="center"
//     sx={{ mb: 6, color: "#2a5298" }}  // updated
//   >
//     Choose from our wide range of professional courses
//   </Typography>

//         <Grid container spacing={4} justifyContent="center">
//           {courses.slice(-4).reverse().map((course) => (
//             <Grid size={{xs:12, sm:6, md:3, }}  key={course.$id}>
//               <Card sx={{ cursor: "pointer", "&:hover": { transform: "translateY(-4px)" }, transition: "transform 0.2s", bgcolor: "background.paper", boxShadow: 3 }}>
//                 <CardContent sx={{ textAlign: "center", p: 4 }}>
//                   <SchoolIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
//                   <Typography variant="h6" gutterBottom noWrap>{course.title}</Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                     {course.description.length > 50 ? course.description.slice(0, 50) + "..." : course.description}
//                   </Typography>
//                   <Button variant="outlined" color="primary" onClick={() => handleOpenCourse(course)}>View Course</Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Modal for Selected Course */}
//         {/* Modal for Selected Course */}
// <Dialog
//   open={openCourseModal}
//   onClose={handleCloseCourse}
//   fullWidth
//   maxWidth="md"
//   PaperProps={{ sx: { bgcolor: "background.paper", borderRadius: 2, p: 2 } }}
// >
//   {selectedCourse && (
//     <Box sx={{ p: 3 }}>
//       <Typography
//         variant="h5"
//         gutterBottom
//         textAlign="center"
//         sx={{ color: "#1e3c72", fontWeight: "bold" }}
//       >
//         {selectedCourse.title}
//       </Typography>

//       {selectedCourse.ImageUrl && (
//         <Box sx={{ textAlign: "center", mb: 2 }}>
//           <img
//             src={selectedCourse.ImageUrl}
//             alt={selectedCourse.title}
//             style={{
//               maxWidth: "300px",  // limit the width
//               maxHeight: "200px", // optional: limit height
//               borderRadius: "8px",
//               objectFit: "cover" // keep aspect ratio
//             }}
//           />
//         </Box>
//       )}

//       <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//         {selectedCourse.description}
//       </Typography>

//       {selectedCourse.Price && (
//         <Typography variant="subtitle1" color="primary" sx={{ mb: 2 }}>
//           Price: ${selectedCourse.Price}
//         </Typography>
//       )}

//       <Box display="flex" justifyContent="center" gap={2} mt={3}>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => router.push("/login")}
//           sx={{ bgcolor: "#1e90ff", "&:hover": { bgcolor: "#1565c0" } }}
//         >
//           Enroll Now
//         </Button>
//         <Button
//           variant="outlined"
//           onClick={handleCloseCourse}
//           sx={{ bgcolor: "white", "&:hover": { bgcolor: "#f0f0f0" } }}
//         >
//           Close
//         </Button>
//       </Box>
//     </Box>
//   )}
// </Dialog>
//       </Container>

//       {/* Instructors Section */}
//       {instructorsData.length > 0 && (
//         <Container id="instructors" maxWidth="lg" sx={{ py: 6, bgcolor: "transparent" }}>
//           <Typography variant="h4" textAlign="center" gutterBottom {...sectionTypographyProps}>Learn from Industry Experts</Typography>
//           <Typography variant="body2" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>Our instructors bring real-world experience to every lesson</Typography>
//           <Grid container spacing={2} justifyContent="center">
//             {instructorsData.slice(0, 4).map((instructor) => (
//               <Grid size={{xs:12, sm:6, md:3}} key={instructor.$id}>
//                 <Card sx={{ textAlign: "center", p: 2, height: "100%", bgcolor: "background.paper", boxShadow: 3, borderRadius: 2 }}>
//                   <Avatar src={instructor.profileImageUrl || instructor.profileImage || "/default-avatar.png"} sx={{ width: 90, height: 90, mx: "auto", mb: 1 }} />
//                   <Typography variant="subtitle1" gutterBottom noWrap>{instructor.name}</Typography>
//                   <Typography variant="caption" color="primary.main" display="block" gutterBottom>{instructor.title}</Typography>
//                   <Rating size="small" value={instructor.rating || 0} readOnly sx={{ mb: 1 }} />
//                   <Typography variant="body2" color="text.secondary" noWrap>{instructor.bio}</Typography>
//                   <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5, flexWrap: "wrap", mt: 1 }}>
//                     <Chip label={`${instructor.experience || 0}+ yrs`} size="small" />
//                     <Chip label={`${instructor.studentsCount || 0}+ students`} size="small" />
//                     {instructor.specialities?.map((spec, idx) => (<Chip key={idx} label={spec} size="small" />))}
//                   </Box>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       )}

//       {/* Testimonials Section */}
//       {testimonialsData.length > 0 && (
//         <Container maxWidth="lg" sx={{ mb: 8, bgcolor: "transparent" }}>
//           <Typography variant="h4" align="center" gutterBottom {...sectionTypographyProps}>What Our Students Say</Typography>
//           <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 6 }}>Real success stories from our learning community</Typography>
//           <Box sx={{ display: 'flex', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
//             <AnimatePresence initial={false}>
//               {testimonialsData.slice(currentTestimonial, currentTestimonial + 2).concat(
//                 testimonialsData.slice(0, Math.max(0, currentTestimonial + 2 - testimonialsData.length))
//               ).map(t => (
//                 <motion.div key={t.$id} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -200 }} transition={{ duration: 1.2, ease: 'easeOut' }} style={{ flex: '0 0 45%', margin: '0 1rem' }}>
//                   <Card sx={{ p: 3, textAlign: 'center', boxShadow: 4, borderRadius: 3, bgcolor: "background.paper" }}>
//                     <Avatar src={t.studentImage} sx={{ width: 64, height: 64, mx: "auto", mb: 1 }} />
//                     <Typography variant="subtitle1" gutterBottom>{t.studentName}</Typography>
//                     <Rating value={t.rating} readOnly size="small" sx={{ mb: 1 }} />
//                     <Typography variant="body2" color="text.secondary">{t.review}</Typography>
//                   </Card>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </Box>
//         </Container>
//       )}

//       {/* FAQ Section */}
//       {faqs.length > 0 && (
//         <Container maxWidth="md" sx={{ mb: 12, bgcolor: "transparent" }}>
//           <Typography variant="h4" textAlign="center" gutterBottom {...sectionTypographyProps}>Frequently Asked Questions</Typography>
//           <Typography variant="body2" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>Get answers to common queries from our learners</Typography>
//           {faqs.sort((a, b) => a.order - b.order).map((faq, idx) => (
//             <Accordion key={idx} sx={{ mb: 1, bgcolor: "background.paper" }}>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography>{faq.question}</Typography></AccordionSummary>
//               <AccordionDetails><Typography>{faq.answer}</Typography></AccordionDetails>
//             </Accordion>
//           ))}
//         </Container>
//       )}

//     </Box>
//   );
// };

// export default EducationalWebsite;

"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
  Chip,
  Paper,
  Dialog,
} from "@mui/material";
import {
  PlayArrow as PlayArrowIcon,
  ExpandMore as ExpandMoreIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import { motion, AnimatePresence } from "framer-motion";

// --- Appwrite Environment ---
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const coursesCollectionId =
  process.env.NEXT_PUBLIC_APPWRITE_COURSES_COLLECTION_ID!;
const instructorsCollectionId =
  process.env.NEXT_PUBLIC_APPWRITE_INSTRUCTORS_COLLECTION_ID!;
const testimonialsCollectionId =
  process.env.NEXT_PUBLIC_APPWRITE_TESTIMONIALS_COLLECTION_ID!;
const faqsCollectionId = process.env.NEXT_PUBLIC_APPWRITE_FAQS_COLLECTION_ID!;
const statsCollectionId = process.env.NEXT_PUBLIC_APPWRITE_STATS_COLLECTION_ID!;

// --- Generic fetcher ---
const fetchDocuments = async <T,>(collectionId: string): Promise<T[]> => {
  const res = await fetch(
    `${endpoint}/databases/${databaseId}/collections/${collectionId}/documents`,
    {
      headers: { "X-Appwrite-Project": projectId },
    }
  );
  const data = await res.json();
  return data.documents || [];
};

// --- Types ---
interface Course {
  $id: string;
  title: string;
  description: string;
  category: string;
  Price?: number;
  ImageUrl?: string;
}

interface Instructor {
  $id: string;
  name: string;
  title: string;
  bio?: string;
  experience?: number;
  studentsCount?: number;
  rating?: number;
  profileImage?: string;
  specialities?: string[];
  profileImageUrl?: string;
}

interface Testimonial {
  $id: string;
  studentName: string;
  studentImage?: string;
  courseName?: string;
  rating: number;
  review: string;
}

interface FAQ {
  question: string;
  answer: string;
  order: number;
}

interface Stats {
  totalStudents: number;
  totalCourses: number;
  completionRate: number;
  satisfactionRate: number;
}

// --- Main Component ---
const EducationalWebsite: React.FC = () => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  // --- State hooks ---
  const [showVideo, setShowVideo] = useState(false);
  const [openCourses, setOpenCourses] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [openCourseModal, setOpenCourseModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // --- Handlers ---
  const handleOpenCourses = (category: string) => {
    setSelectedCategory(category);
    setOpenCourses(true);
  };
  const handleCloseCourses = () => {
    setSelectedCategory(null);
    setOpenCourses(false);
  };
  const handleOpenCourse = (course: Course) => {
    setSelectedCourse(course);
    setOpenCourseModal(true);
  };
  const handleCloseCourse = () => {
    setSelectedCourse(null);
    setOpenCourseModal(false);
  };

  // --- Fetch data ---
  const {
    data: courses = [],
    isLoading: loadingCourses,
    error: coursesError,
  } = useQuery<Course[], Error>({
    queryKey: ["courses"],
    queryFn: async () => fetchDocuments<Course>(coursesCollectionId),
  });

  const { data: instructorsData = [] } = useQuery<Instructor[], Error>({
    queryKey: ["instructors"],
    queryFn: async () => fetchDocuments<Instructor>(instructorsCollectionId),
  });

  const { data: testimonialsData = [] } = useQuery<Testimonial[], Error>({
    queryKey: ["testimonials"],
    queryFn: async () => fetchDocuments<Testimonial>(testimonialsCollectionId),
  });

  const { data: faqs = [] } = useQuery<FAQ[], Error>({
    queryKey: ["faqs"],
    queryFn: async () => fetchDocuments<FAQ>(faqsCollectionId),
  });

  const { data: statsData = [] } = useQuery<Stats[], Error>({
    queryKey: ["stats"],
    queryFn: async () => fetchDocuments<Stats>(statsCollectionId),
  });

  const stats = statsData[0] || null;

  // --- Auto rotate testimonials ---
  useEffect(() => {
    if (testimonialsData.length > 0) {
      const timer = setInterval(
        () =>
          setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length),
        4000
      );
      return () => clearInterval(timer);
    }
  }, [testimonialsData]);

  if (loadingCourses)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  if (coursesError)
    return (
      <Box textAlign="center" py={10}>
        <Alert severity="error" sx={{ mb: 3 }}>
          Failed to load content.
        </Alert>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Box>
    );

  const gradientBg = "linear-gradient(to bottom, #e0f0ff 0%, #f5faff 100%)";
  const sectionTypographyProps = { color: "#1e3c72", fontWeight: "bold" };
  const textTypographyProps = { color: "#2a5298" };

  return (
    <Box sx={{ minHeight: "100vh", background: gradientBg, px: 2 }}>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          mb: 8,
        }}
      >
        <Typography variant="h2" gutterBottom {...sectionTypographyProps}>
          Transform Your Future with Premium Education
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }} {...textTypographyProps}>
          Learn from industry experts and advance your career with our
          comprehensive courses
        </Typography>
        <Button
          variant="contained"
          startIcon={<PlayArrowIcon />}
          onClick={() => setShowVideo(true)}
          sx={{
            bgcolor: "#1e90ff",
            color: "#fff",
            "&:hover": { bgcolor: "#63b3ed" },
            mb: 2,
            width: "200px",
            height: "50px",
            textTransform: "none",
          }}
        >
          Campus Tour
        </Button>
        <Button
          variant="contained"
          onClick={() => router.push("/courses")}
          sx={{
            bgcolor: "#1e90ff",
            color: "#fff",
            "&:hover": { bgcolor: "#63b3ed" },
            mb: 2,
            width: "200px",
            height: "50px",
            textTransform: "none",
          }}
        >
          Browse Courses
        </Button>
        {showVideo && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bgcolor: "rgba(0,0,0,0.6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
            onClick={() => setShowVideo(false)}
          >
            <Box
              sx={{
                width: "80%",
                maxWidth: 800,
                bgcolor: "black",
                borderRadius: 2,
                overflow: "hidden",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <video ref={videoRef} width="100%" controls autoPlay>
                <source src="/videos/lesson1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
          </Box>
        )}
      </Box>

      {/* Stats Section */}
      {stats && (
        <Container maxWidth="lg" sx={{ mb: 8, bgcolor: "transparent" }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            {...sectionTypographyProps}
          >
            Our Achievements
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            We are proud to share our journey of excellence and growth
          </Typography>
          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="center"
          >
            {[
              {
                icon: (
                  <PeopleIcon
                    sx={{ fontSize: 48, color: "primary.main", mb: 2 }}
                  />
                ),
                value: stats.totalStudents,
                suffix: "+",
                label: "Happy Students",
              },
              {
                icon: (
                  <SchoolIcon
                    sx={{ fontSize: 48, color: "primary.main", mb: 2 }}
                  />
                ),
                value: stats.totalCourses,
                suffix: "+",
                label: "Expert Courses",
              },
              {
                icon: (
                  <CheckCircleIcon
                    sx={{ fontSize: 48, color: "primary.main", mb: 2 }}
                  />
                ),
                value: stats.completionRate,
                suffix: "%",
                label: "Completion Rate",
              },
              {
                icon: (
                  <StarIcon
                    sx={{ fontSize: 48, color: "primary.main", mb: 2 }}
                  />
                ),
                value: stats.satisfactionRate,
                suffix: "%",
                label: "Satisfaction Rate",
              },
            ].map((stat, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                <Paper
                  sx={{
                    p: 3,
                    textAlign: "center",
                    bgcolor: "background.paper",
                  }}
                >
                  {stat.icon}
                  <Typography variant="h3" color="primary.main">
                    <CountUp end={stat.value} duration={5} separator="," />
                    {stat.suffix}
                  </Typography>
                  <Typography color="text.secondary">{stat.label}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      {/* Newly Launched Courses Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mb: 2, color: "#1e3c72", fontWeight: "bold" }}
        >
          Newly Launched Courses
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{ mb: 6, color: "#2a5298" }}
        >
          Choose from our wide range of professional courses
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {courses
            .slice(-4)
            .reverse()
            .map((course: Course) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={course.$id}>
                <Card
                  sx={{
                    cursor: "pointer",
                    "&:hover": { transform: "translateY(-4px)" },
                    transition: "transform 0.2s",
                    bgcolor: "background.paper",
                    boxShadow: 3,
                  }}
                >
                  <CardContent sx={{ textAlign: "center", p: 4 }}>
                    <SchoolIcon
                      sx={{ fontSize: 48, color: "primary.main", mb: 2 }}
                    />
                    <Typography variant="h6" gutterBottom noWrap>
                      {course.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {course.description.length > 50
                        ? course.description.slice(0, 50) + "..."
                        : course.description}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleOpenCourse(course)}
                    >
                      View Course
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>

        {/* Modal for Selected Course */}
        <Dialog
          open={openCourseModal}
          onClose={handleCloseCourse}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: { bgcolor: "background.paper", borderRadius: 2, p: 2 },
          }}
        >
          {selectedCourse && (
            <Box sx={{ p: 3 }}>
              <Typography
                variant="h5"
                gutterBottom
                textAlign="center"
                sx={{ color: "#1e3c72", fontWeight: "bold" }}
              >
                {selectedCourse.title}
              </Typography>
              {selectedCourse.ImageUrl && (
                <Box sx={{ textAlign: "center", mb: 2 }}>
                  <img
                    src={selectedCourse.ImageUrl}
                    alt={selectedCourse.title}
                    style={{
                      maxWidth: "300px",
                      maxHeight: "200px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedCourse.description}
              </Typography>
              {selectedCourse.Price && (
                <Typography variant="subtitle1" color="primary" sx={{ mb: 2 }}>
                  Price: ${selectedCourse.Price}
                </Typography>
              )}
              <Box display="flex" justifyContent="center" gap={2} mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => router.push("/login")}
                  sx={{ bgcolor: "#1e90ff", "&:hover": { bgcolor: "#1565c0" } }}
                >
                  Enroll Now
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCloseCourse}
                  sx={{ bgcolor: "white", "&:hover": { bgcolor: "#f0f0f0" } }}
                >
                  Close
                </Button>
              </Box>
            </Box>
          )}
        </Dialog>
      </Container>

      {/* Instructors Section */}
      {instructorsData.length > 0 && (
        <Container
          id="instructors"
          maxWidth="lg"
          sx={{ py: 6, bgcolor: "transparent" }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            gutterBottom
            {...sectionTypographyProps}
          >
            Learn from Industry Experts
          </Typography>
          <Typography
            variant="body2"
            textAlign="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Our instructors bring real-world experience to every lesson
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {instructorsData.slice(0, 4).map((instructor) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={instructor.$id}>
                <Card
                  sx={{
                    textAlign: "center",
                    p: 2,
                    height: "100%",
                    bgcolor: "background.paper",
                    boxShadow: 3,
                    borderRadius: 2,
                  }}
                >
                  <Avatar
                    src={
                      instructor.profileImageUrl ||
                      instructor.profileImage ||
                      "/default-avatar.png"
                    }
                    sx={{ width: 90, height: 90, mx: "auto", mb: 1 }}
                  />
                  <Typography variant="subtitle1" gutterBottom noWrap>
                    {instructor.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="primary.main"
                    display="block"
                    gutterBottom
                  >
                    {instructor.title}
                  </Typography>
                  <Rating
                    size="small"
                    value={instructor.rating || 0}
                    readOnly
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {instructor.bio}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 0.5,
                      flexWrap: "wrap",
                      mt: 1,
                    }}
                  >
                    <Chip
                      label={`${instructor.experience || 0}+ yrs`}
                      size="small"
                    />
                    <Chip
                      label={`${instructor.studentsCount || 0}+ students`}
                      size="small"
                    />
                    {instructor.specialities?.map((spec, idx) => (
                      <Chip key={idx} label={spec} size="small" />
                    ))}
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
      {/* Testimonials Section */}
      {testimonialsData.length > 0 && (
        <Container maxWidth="lg" sx={{ mb: 8, bgcolor: "transparent" }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            {...sectionTypographyProps}
          >
            What Our Students Say
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mb: 6 }}
          >
            Real success stories from our learning community
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <AnimatePresence initial={false}>
              {testimonialsData
                .slice(currentTestimonial, currentTestimonial + 2)
                .concat(
                  testimonialsData.slice(
                    0,
                    Math.max(
                      0,
                      currentTestimonial + 2 - testimonialsData.length
                    )
                  )
                )
                .map((t) => (
                  <motion.div
                    key={t.$id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -200 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    style={{ flex: "0 0 45%", margin: "0 1rem" }}
                  >
                    <Card
                      sx={{
                        p: 3,
                        textAlign: "center",
                        boxShadow: 4,
                        borderRadius: 3,
                        bgcolor: "background.paper",
                      }}
                    >
                      <Avatar
                        src={t.studentImage}
                        sx={{ width: 64, height: 64, mx: "auto", mb: 1 }}
                      />
                      <Typography variant="subtitle1" gutterBottom>
                        {t.studentName}
                      </Typography>
                      <Rating
                        value={t.rating}
                        readOnly
                        size="small"
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {t.review}
                      </Typography>
                    </Card>
                  </motion.div>
                ))}
            </AnimatePresence>
          </Box>
        </Container>
      )}

      {/* FAQs Section */}
      {faqs.length > 0 && (
        <Container id="faq" maxWidth="md" sx={{ py: 6 }}>
          <Typography
            variant="h4"
            textAlign="center"
            gutterBottom
            {...sectionTypographyProps}
          >
            Frequently Asked Questions
          </Typography>
          {faqs
            .sort((a, b) => a.order - b.order)
            .map((faq: FAQ, idx: number) => (
              <Accordion key={idx}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
        </Container>
      )}
    </Box>
  );
};

export default EducationalWebsite;
