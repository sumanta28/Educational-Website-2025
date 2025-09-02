// "use client";

// import { useState } from "react";
// import Head from "next/head";
// import { useRouter } from "next/router";
// import {
//   Box,
//   Card,
//   CardContent,
//   CardHeader,
//   Typography,
//   TextField,
//   Button,
//   Stack,
//   Snackbar,
//   Alert,
//   CircularProgress,
//   Divider,
//   ThemeProvider,
//   createTheme,
//   CssBaseline,
// } from "@mui/material";
// import { useForm, Controller } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useMutation } from "@tanstack/react-query";
// import { databases, storage, ID } from "@/lib/appwrite";

// // ✅ Validation Schema
// const schema = yup.object({
//   title: yup
//     .string()
//     .min(3, "Title should be at least 3 characters")
//     .required("Title is required"),
//   description: yup
//     .string()
//     .min(10, "Description should be at least 10 characters")
//     .required("Description is required"),
//   syllabus: yup
//     .string()
//     .min(5, "Syllabus should be at least 5 characters")
//     .required("Syllabus is required"),
//   Price: yup
//     .number()
//     .typeError("Enter a valid non-negative number")
//     .min(0, "Price cannot be negative")
//     .required("Price is required"),
//   category: yup
//     .string()
//     .min(2, "Category is required")
//     .required("Category is required"),
// });

// type FormValues = yup.InferType<typeof schema>;

// // MUI theme matching About Us page
// const theme = createTheme({
//   palette: {
//     primary: { main: "#003366" },
//     background: { default: "#ffffff", paper: "#e6f0ff" },
//     text: { primary: "#000000", secondary: "#333333" },
//   },
//   typography: { fontFamily: "Roboto, Arial, sans-serif" },
// });

// export default function AddCourse() {
//   const router = useRouter();

//   const [file, setFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [snack, setSnack] = useState<{
//     open: boolean;
//     msg: string;
//     sev: "success" | "error";
//   }>({
//     open: false,
//     msg: "",
//     sev: "success",
//   });

//   const { control, handleSubmit, reset } = useForm<FormValues>({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       title: "",
//       description: "",
//       syllabus: "",
//       Price: 0,
//       category: "",
//     },
//   });

//   const onSelectFile = (f: File | null) => {
//     setFile(f);
//     setPreview(f ? URL.createObjectURL(f) : null);
//   };

//   const createCourse = useMutation({
//     mutationFn: async (payload: { data: FormValues; image: File }) => {
//       const upload = await storage.createFile(
//         process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
//         ID.unique(),
//         payload.image
//       );

//       await databases.createDocument(
//         process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
//         process.env.NEXT_PUBLIC_APPWRITE_COURSES_COLLECTION_ID!,
//         ID.unique(),
//         {
//           title: payload.data.title,
//           description: payload.data.description,
//           syllabus: payload.data.syllabus,
//           Price: Number(payload.data.Price),
//           category: payload.data.category,
//           ImageUrl: `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${upload.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`,
//         }
//       );
//     },
//   });

//   const onSubmit = async (data: FormValues) => {
//     if (!file) {
//       setSnack({
//         open: true,
//         msg: "Please upload a course thumbnail",
//         sev: "error",
//       });
//       return;
//     }
//     try {
//       await createCourse.mutateAsync({
//         data: { ...data, Price: Number(data.Price) },
//         image: file,
//       });
//       setSnack({
//         open: true,
//         msg: "Course added successfully!",
//         sev: "success",
//       });

//       // Reset form & preview
//       reset();
//       onSelectFile(null);

//       // Redirect after 1.5s
//       setTimeout(() => {
//         router.push("/manage-courses");
//       }, 1500);
//     } catch (e) {
//       setSnack({
//         open: true,
//         msg: "Failed to add course. Please try again.",
//         sev: "error",
//       });
//       console.error(e);
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Head>
//         <title>Add Course</title>
//       </Head>

//       {/* Gradient Background */}
//       <Box
//         sx={{
//           background: "linear-gradient(to bottom, #87CEEB, #ffffff)",
//           minHeight: "100vh",
//           py: 8,
//         }}
//       >
//         <Box sx={{ maxWidth: 900, mx: "auto", px: 2 }}>
//           <Card
//             sx={{
//               borderRadius: 4,
//               boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
//               overflow: "hidden",
//               backgroundColor: "background.paper",
//               transition: "transform 0.3s, box-shadow 0.3s",
//               "&:hover": {
//                 transform: "translateY(-5px)",
//                 boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
//               },
//             }}
//           >
//             <CardHeader
//               title={
//                 <Typography variant="h4" fontWeight={700} color="primary">
//                   Create a New Course
//                 </Typography>
//               }
//               subheader={
//                 <Typography color="text.secondary">
//                   Fill in the details below and upload a thumbnail
//                 </Typography>
//               }
//             />
//             <CardContent>
//               <Box
//                 component="form"
//                 onSubmit={handleSubmit(onSubmit)}
//                 noValidate
//                 sx={{ mt: 2 }}
//               >
//                 <Stack spacing={3}>
//                   <Controller
//                     name="title"
//                     control={control}
//                     render={({ field, fieldState }) => (
//                       <TextField
//                         {...field}
//                         label="Course Title"
//                         error={!!fieldState.error}
//                         helperText={fieldState.error?.message}
//                         fullWidth
//                       />
//                     )}
//                   />
//                   <Controller
//                     name="description"
//                     control={control}
//                     render={({ field, fieldState }) => (
//                       <TextField
//                         {...field}
//                         label="Description"
//                         multiline
//                         minRows={4}
//                         error={!!fieldState.error}
//                         helperText={fieldState.error?.message}
//                         fullWidth
//                       />
//                     )}
//                   />
//                   <Controller
//                     name="syllabus"
//                     control={control}
//                     render={({ field, fieldState }) => (
//                       <TextField
//                         {...field}
//                         label="Syllabus"
//                         multiline
//                         minRows={3}
//                         error={!!fieldState.error}
//                         helperText={fieldState.error?.message}
//                         fullWidth
//                       />
//                     )}
//                   />
//                   <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//                     <Controller
//                       name="Price"
//                       control={control}
//                       render={({ field, fieldState }) => (
//                         <TextField
//                           {...field}
//                           type="number"
//                           label="Price (₹)"
//                           error={!!fieldState.error}
//                           helperText={fieldState.error?.message}
//                           fullWidth
//                           inputProps={{ min: 0 }}
//                         />
//                       )}
//                     />

//                     <Controller
//                       name="category"
//                       control={control}
//                       render={({ field, fieldState }) => (
//                         <TextField
//                           {...field}
//                           label="Category"
//                           error={!!fieldState.error}
//                           helperText={fieldState.error?.message}
//                           fullWidth
//                         />
//                       )}
//                     />
//                   </Stack>

//                   <Divider />

//                   <Stack spacing={1}>
//                     <Typography variant="subtitle1" fontWeight={600}>
//                       Course Thumbnail
//                     </Typography>
//                     <Stack
//                       direction={{ xs: "column", sm: "row" }}
//                       spacing={2}
//                       alignItems="center"
//                     >
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         component="label"
//                       >
//                         Select Image
//                         <input
//                           hidden
//                           accept="image/*"
//                           type="file"
//                           onChange={(e) =>
//                             onSelectFile(e.target.files?.[0] ?? null)
//                           }
//                         />
//                       </Button>
//                       <Typography variant="body2" color="text.secondary">
//                         JPG/PNG, up to ~5MB
//                       </Typography>
//                     </Stack>
//                     {preview && (
//                       <Box
//                         sx={{
//                           mt: 2,
//                           width: "100%",
//                           borderRadius: 2,
//                           overflow: "hidden",
//                           border: "1px dashed rgba(0,0,0,0.1)",
//                         }}
//                       >
//                         <img
//                           src={preview}
//                           alt="Preview"
//                           style={{
//                             width: "100%",
//                             height: 260,
//                             objectFit: "cover",
//                             display: "block",
//                           }}
//                         />
//                       </Box>
//                     )}
//                   </Stack>

//                   <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     size="large"
//                     disabled={createCourse.isPending}
//                     sx={{
//                       alignSelf: "flex-start",
//                       px: 4,
//                       py: 1.25,
//                       borderRadius: 2,
//                     }}
//                   >
//                     {createCourse.isPending ? (
//                       <Stack direction="row" gap={1} alignItems="center">
//                         <CircularProgress size={20} />
//                         <span>Saving…</span>
//                       </Stack>
//                     ) : (
//                       "Add Course"
//                     )}
//                   </Button>
//                 </Stack>
//               </Box>
//             </CardContent>
//           </Card>
//         </Box>
//       </Box>

//       <Snackbar
//         open={snack.open}
//         autoHideDuration={3000}
//         onClose={() => setSnack((s) => ({ ...s, open: false }))}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           severity={snack.sev}
//           onClose={() => setSnack((s) => ({ ...s, open: false }))}
//           variant="filled"
//         >
//           {snack.msg}
//         </Alert>
//       </Snackbar>
//     </ThemeProvider>
//   );
// }

"use client";

import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  Stack,
  Snackbar,
  Alert,
  CircularProgress,
  Divider,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { databases, storage, ID } from "@/lib/appwrite";

// ✅ Validation Schema
const schema = yup.object({
  title: yup
    .string()
    .min(3, "Title should be at least 3 characters")
    .required("Title is required"),
  description: yup
    .string()
    .min(10, "Description should be at least 10 characters")
    .required("Description is required"),
  syllabus: yup
    .string()
    .min(5, "Syllabus should be at least 5 characters")
    .required("Syllabus is required"),
  Price: yup
    .number()
    .typeError("Enter a valid non-negative number")
    .min(0, "Price cannot be negative")
    .required("Price is required"),
  category: yup
    .string()
    .min(2, "Category is required")
    .required("Category is required"),
});

type FormValues = yup.InferType<typeof schema>;

// MUI theme
const theme = createTheme({
  palette: {
    primary: { main: "#003366" },
    background: { default: "#ffffff", paper: "#e6f0ff" },
    text: { primary: "#000000", secondary: "#333333" },
  },
  typography: { fontFamily: "Roboto, Arial, sans-serif" },
});

export default function AddCourse() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [snack, setSnack] = useState<{
    open: boolean;
    msg: string;
    sev: "success" | "error";
  }>({
    open: false,
    msg: "",
    sev: "success",
  });

  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      syllabus: "",
      Price: "",
      category: "",
    }, // Price starts empty
  });

  const onSelectFile = (f: File | null) => {
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const createCourse = useMutation({
    mutationFn: async (payload: { data: FormValues; image: File }) => {
      const upload = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
        ID.unique(),
        payload.image
      );

      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COURSES_COLLECTION_ID!,
        ID.unique(),
        {
          title: payload.data.title,
          description: payload.data.description,
          syllabus: payload.data.syllabus,
          Price: Number(payload.data.Price),
          category: payload.data.category,
          ImageUrl: `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${upload.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`,
        }
      );
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!file) {
      setSnack({
        open: true,
        msg: "Please upload a course thumbnail",
        sev: "error",
      });
      return;
    }

    try {
      await createCourse.mutateAsync({
        data: { ...data, Price: Number(data.Price) },
        image: file,
      });
      setSnack({
        open: true,
        msg: "Course added successfully!",
        sev: "success",
      });
      reset();
      onSelectFile(null);
      setTimeout(() => router.push("/manage-courses"), 1500);
    } catch (e) {
      setSnack({
        open: true,
        msg: "Failed to add course. Please try again.",
        sev: "error",
      });
      console.error(e);
    }
  };

return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Head>
      <title>Add Course</title>
    </Head>

    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom, #87CEEB, #ffffff)",
        minHeight: "100vh",
        py: 8,
      }}
    >
      <Box sx={{ maxWidth: 900, width: "100%", px: 2 }}>
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            overflow: "hidden",
            backgroundColor: "background.paper",
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            },
          }}
        >
          <CardHeader
            title={
              <Typography variant="h4" fontWeight={700} color="primary">
                Create a New Course
              </Typography>
            }
           
          />
          <CardContent>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 2 }}
            >
              <Stack spacing={3}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Course Title"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Description"
                      multiline
                      minRows={4}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="syllabus"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Syllabus"
                      multiline
                      minRows={3}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      fullWidth
                    />
                  )}
                />
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Controller
                    name="Price"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        type="number"
                        label="Price (₹)"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        fullWidth
                        inputProps={{ min: 0 }}
                      />
                    )}
                  />
                  <Controller
                    name="category"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Category"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        fullWidth
                      />
                    )}
                  />
                </Stack>

                <Divider />

                {/* Image upload button */}
                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    px: 3,
                    py: 1.1,
                    fontWeight: 500,
                    fontSize: "0.95rem",
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.04)",
                    },
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  Select Image
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(e) =>
                      onSelectFile(e.target.files?.[0] ?? null)
                    }
                  />
                  {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      style={{
                        width: "100%",
                        maxHeight: 260,
                        objectFit: "cover",
                        display: "block",
                        borderRadius: 8,
                      }}
                    />
                  )}
                </Button>

                {/* Submit button */}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ py: 1.2, fontWeight: 600 }}
                >
                  {createCourse.isPending ? (
                    <Stack direction="row" gap={1} alignItems="center">
                      <CircularProgress size={20} />
                      <span>Saving…</span>
                    </Stack>
                  ) : (
                    "Add Course"
                  )}
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>

    <Snackbar
      open={snack.open}
      autoHideDuration={3000}
      onClose={() => setSnack((s) => ({ ...s, open: false }))}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        severity={snack.sev}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        variant="filled"
      >
        {snack.msg}
      </Alert>
    </Snackbar>
  </ThemeProvider>
);
}
