// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { Client, Databases, Query, Storage, ID } from "appwrite";
// import {
//   Box,
//   Card,
//   CardContent,
//   Avatar,
//   TextField,
//   Button,
//   Grid,
//   CircularProgress,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { useAuth } from "@/components/AuthContext";
// import Navbar from "@/components/Navbar";
// import {
//   FormControl,
//   FormLabel,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
// } from "@mui/material";

// interface StudentProfile {
//   userId: string;
//   fullName: string;
//   email: string;
//   mobile: string;
//   dob?: string;
//   address?: string;
//   course?: string;
//   imageUrl?: string;
//   gender?: string;
//   graduationYear?: string;
//   college?: string;
// }

// export default function StudentProfilePage() {
//   const { user, isLoggedIn } = useAuth();
//   const router = useRouter();
//   const [profile, setProfile] = useState<StudentProfile | null>(null);
//   const [formData, setFormData] = useState<Partial<StudentProfile>>({});
//   const [loading, setLoading] = useState(true);
//   const [uploading, setUploading] = useState(false);
//   const [updating, setUpdating] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   const client = new Client()
//     .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
//     .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

//   const databases = new Databases(client);
//   const storage = new Storage(client);

//   const fetchProfile = async () => {
//     try {
//       const res = await databases.listDocuments(
//         process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
//         process.env.NEXT_PUBLIC_APPWRITE_STUDENTSPROFILE_COLLECTION_ID!,
//         [Query.equal("userId", user.id)]
//       );

//       if (res.documents.length > 0) {
//         const doc = res.documents[0];
//         const fetchedProfile: StudentProfile = {
//           userId: doc.$id,
//           fullName: doc.fullName || "",
//           email: doc.email || "",
//           mobile: doc.mobile || "",
//           dob: doc.dob || "",
//           address: doc.address || "",
//           course: doc.course || "",
//           gender: doc.gender || "",
//           graduationYear: doc.graduationYear || "",
//           college: doc.college || "",
//           imageUrl: doc.imageUrl || "",
//         };
//         setProfile(fetchedProfile);
//         setFormData(fetchedProfile);
//       }
//     } catch (err) {
//       console.error("Error fetching profile:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!isLoggedIn) {
//       router.replace("/login");
//       return;
//     }
//     if (!user?.id) {
//       setLoading(false);
//       return;
//     }
//     fetchProfile();
//   }, [user, isLoggedIn, router]);

//   const handleChange = (field: keyof StudentProfile, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files || e.target.files.length === 0) return;
//     const file = e.target.files[0];

//     try {
//       setUploading(true);
//       const uploadedFile = await storage.createFile(
//         process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
//         ID.unique(),
//         file
//       );

//       const fileUrl = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${uploadedFile.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
//       setFormData((prev) => ({ ...prev, imageUrl: fileUrl }));
//     } catch (err) {
//       console.error("Image upload failed:", err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleUpdate = async () => {
//     if (!profile) return;
//     try {
//       setUpdating(true);

//       const startTime = Date.now();

//       await databases.updateDocument(
//         process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
//         process.env.NEXT_PUBLIC_APPWRITE_STUDENTSPROFILE_COLLECTION_ID!,
//         profile.userId,
//         formData
//       );

//       const elapsed = Date.now() - startTime;
//       if (elapsed < 2000) {
//         await new Promise((resolve) => setTimeout(resolve, 2000 - elapsed));
//       }

//       setSnackbarOpen(true);
//       await fetchProfile();
//     } catch (err) {
//       console.error("Error updating profile:", err);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (loading) {
//     return (
//       <>
//         <Navbar /> {/* Navbar at top */}
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
//           <CircularProgress />
//         </Box>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar /> {/* Navbar at top */}

//       <Box display="flex" justifyContent="center" alignItems="center" mt={2} px={2}>
//         <Card
//           sx={{
//             maxWidth: 500,
//             margin: "0 auto",
//             padding: 2,
//             border: "2px solid blue",
//             overflow: "visible",
//             height: "auto",
//           }}
//         >
//           {/* Go Home Button */}
//           <Box display="flex" justifyContent="flex-start" mb={2}>
//             <Button
//               variant="outlined"
//               color="secondary"
//               onClick={() => router.push("/")}
//               sx={{ textTransform: "none", fontWeight: "bold" }}
//             >
//               ⬅ Go Home
//             </Button>
//           </Box>

//           {/* Avatar & Upload */}
//           <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
//             <Avatar
//               src={formData.imageUrl || ""}
//               alt={formData.fullName || "Profile"}
//               sx={{ width: 100, height: 100, mb: 1 }}
//             />
//             <Button
//               variant="outlined"
//               component="label"
//               size="small"
//               disabled={uploading}
//             >
//               {uploading ? "Uploading..." : "Change Picture"}
//               <input
//                 type="file"
//                 hidden
//                 accept="image/*"
//                 onChange={handleImageUpload}
//               />
//             </Button>
//           </Box>

//           {/* Fields */}
//           <CardContent sx={{ p: 0 }}>
//             <Grid container spacing={1}>
//               {[
//                 { label: "Full Name", key: "fullName" },
//                 { label: "Email", key: "email" },
//                 { label: "Mobile", key: "mobile" },
//                 { label: "Date of Birth", key: "dob" },
//                 { label: "Address", key: "address" },
//                 { label: "Course", key: "course" },
//                 { label: "Gender", key: "gender" },
//                 { label: "Graduation Year", key: "graduationYear" },
//                 { label: "College", key: "college" },
//               ].map((field) => (
//                 <Grid size={{xs:12, sm:4}} key={field.key}>
//                   {field.key === "gender" ? (
//                     <FormControl component="fieldset" fullWidth>
//                       <FormLabel component="legend">{field.label}</FormLabel>
//                       <RadioGroup
//                         row
//                         value={formData.gender || ""}
//                         onChange={(e) => handleChange("gender", e.target.value)}
//                       >
//                         <FormControlLabel value="Male" control={<Radio />} label="Male" />
//                         <FormControlLabel value="Female" control={<Radio />} label="Female" />
//                         <FormControlLabel value="Other" control={<Radio />} label="Other" />
//                       </RadioGroup>
//                     </FormControl>
//                   ) : (
//                     <TextField
//                       label={field.label}
//                       type={field.key === "dob" ? "date" : "text"}
//                       value={formData[field.key as keyof StudentProfile] || ""}
//                       onChange={(e) =>
//                         handleChange(field.key as keyof StudentProfile, e.target.value)
//                       }
//                       fullWidth
//                       size="medium"
//                       InputLabelProps={
//                         field.key === "dob" ? { shrink: true } : undefined
//                       }
//                     />
//                   )}
//                 </Grid>
//               ))}
//             </Grid>

//             {/* Update Button */}
//             <Box display="flex" justifyContent="center" mt={3}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 size="medium"
//                 sx={{
//                   borderRadius: 3,
//                   px: 4,
//                   fontWeight: "bold",
//                   textTransform: "none",
//                 }}
//                 onClick={handleUpdate}
//                 disabled={updating}
//               >
//                 {updating ? <CircularProgress size={20} color="inherit" /> : "Update Profile"}
//               </Button>
//             </Box>
//           </CardContent>
//         </Card>
//       </Box>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           onClose={() => setSnackbarOpen(false)}
//           severity="success"
//           sx={{ width: "100%" }}
//         >
//           Profile updated successfully!
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Client, Databases, Query, Storage, ID } from "appwrite";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useAuth } from "@/components/AuthContext";
import Navbar from "@/components/Navbar";

interface StudentProfile {
  userId: string;
  fullName: string;
  email: string;
  mobile: string;
  dob?: string;
  address?: string;
  course?: string;
  imageUrl?: string;
  gender?: string;
  graduationYear?: string;
  college?: string;
}

export default function StudentProfilePage() {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [formData, setFormData] = useState<Partial<StudentProfile>>({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

  const databases = new Databases(client);
  const storage = new Storage(client);

  const fetchProfile = async () => {
    if (!user?.id) {
      console.warn("User ID not available, skipping profile fetch.");
      setLoading(false);
      return;
    }

    try {
      const res = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_STUDENTSPROFILE_COLLECTION_ID!,
        [Query.equal("userId", user.id)]
      );

      if (res.documents.length > 0) {
        const doc = res.documents[0];
        const fetchedProfile: StudentProfile = {
          userId: doc.$id,
          fullName: doc.fullName || "",
          email: doc.email || "",
          mobile: doc.mobile || "",
          dob: doc.dob || "",
          address: doc.address || "",
          course: doc.course || "",
          gender: doc.gender || "",
          graduationYear: doc.graduationYear || "",
          college: doc.college || "",
          imageUrl: doc.imageUrl || "",
        };
        setProfile(fetchedProfile);
        setFormData(fetchedProfile);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }
    fetchProfile();
  }, [user, isLoggedIn, router]);

  const handleChange = (field: keyof StudentProfile, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    try {
      setUploading(true);
      const uploadedFile = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
        ID.unique(),
        file
      );

      const fileUrl = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${uploadedFile.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
      setFormData((prev) => ({ ...prev, imageUrl: fileUrl }));
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async () => {
    if (!profile) return;
    try {
      setUpdating(true);

      const startTime = Date.now();

      await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_STUDENTSPROFILE_COLLECTION_ID!,
        profile.userId,
        formData
      );

      const elapsed = Date.now() - startTime;
      if (elapsed < 2000) {
        await new Promise((resolve) => setTimeout(resolve, 2000 - elapsed));
      }

      setSnackbarOpen(true);
      await fetchProfile();
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
          <CircularProgress />
        </Box>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <Box display="flex" justifyContent="center" alignItems="center" mt={2} px={2}>
        <Card
          sx={{
            maxWidth: 500,
            margin: "0 auto",
            padding: 2,
            border: "2px solid blue",
            overflow: "visible",
            height: "auto",
          }}
        >
          <Box display="flex" justifyContent="flex-start" mb={2}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => router.push("/")}
              sx={{ textTransform: "none", fontWeight: "bold" }}
            >
              ⬅ Go Home
            </Button>
          </Box>

          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <Avatar
              src={formData.imageUrl || ""}
              alt={formData.fullName || "Profile"}
              sx={{ width: 100, height: 100, mb: 1 }}
            />
            <Button variant="outlined" component="label" size="small" disabled={uploading}>
              {uploading ? "Uploading..." : "Change Picture"}
              <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
            </Button>
          </Box>

          <CardContent sx={{ p: 0 }}>
            <Grid container spacing={1}>
              {[
                { label: "Full Name", key: "fullName" },
                { label: "Email", key: "email" },
                { label: "Mobile", key: "mobile" },
                { label: "Date of Birth", key: "dob" },
                { label: "Address", key: "address" },
                { label: "Course", key: "course" },
                { label: "Gender", key: "gender" },
                { label: "Graduation Year", key: "graduationYear" },
                { label: "College", key: "college" },
              ].map((field) => (
                <Grid size={{xs:12, sm:4,}} key={field.key}>
                  {field.key === "gender" ? (
                    <FormControl component="fieldset" fullWidth>
                      <FormLabel component="legend">{field.label}</FormLabel>
                      <RadioGroup
                        row
                        value={formData.gender || ""}
                        onChange={(e) => handleChange("gender", e.target.value)}
                      >
                        <FormControlLabel value="Male" control={<Radio />} label="Male" />
                        <FormControlLabel value="Female" control={<Radio />} label="Female" />
                        <FormControlLabel value="Other" control={<Radio />} label="Other" />
                      </RadioGroup>
                    </FormControl>
                  ) : (
                    <TextField
                      label={field.label}
                      type={field.key === "dob" ? "date" : "text"}
                      value={formData[field.key as keyof StudentProfile] || ""}
                      onChange={(e) =>
                        handleChange(field.key as keyof StudentProfile, e.target.value)
                      }
                      fullWidth
                      size="medium"
                      InputLabelProps={
                        field.key === "dob" ? { shrink: true } : undefined
                      }
                    />
                  )}
                </Grid>
              ))}
            </Grid>

            <Box display="flex" justifyContent="center" mt={3}>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                sx={{
                  borderRadius: 3,
                  px: 4,
                  fontWeight: "bold",
                  textTransform: "none",
                }}
                onClick={handleUpdate}
                disabled={updating}
              >
                {updating ? <CircularProgress size={20} color="inherit" /> : "Update Profile"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
