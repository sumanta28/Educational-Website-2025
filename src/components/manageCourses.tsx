"use client";

import * as React from "react";
import Head from "next/head";

import NextLink from "next/link";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Snackbar,
  Pagination,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { databases, storage } from "@/lib/appwrite";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Query, ID } from "appwrite";

const APPWRITE_CONFIG = {
  DATABASE_ID: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  COURSES_COLLECTION_ID:
    process.env.NEXT_PUBLIC_APPWRITE_COURSES_COLLECTION_ID!,
  BUCKET_ID: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
  ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  PROJECT_ID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
};

type Course = {
  $id: string;
  title: string;
  description: string;
  Price: number;
  category: string;
  ImageUrl?: string;
  syllabus?: string;
};

const rowsPerPage = 5;

// Theme matching About Us
const theme = createTheme({
  palette: {
    primary: { main: "#003366" }, // deep blue
    secondary: { main: "#1976d2" }, // accent blue
    background: { default: "#ffffff", paper: "#e6f0ff" },
    text: { primary: "#000000", secondary: "#333333" },
  },
  typography: { fontFamily: "Roboto, Arial, sans-serif" },
});

const ManageCourses: React.FC = () => {
  const qc = useQueryClient();
  const [snackbar, setSnackbar] = React.useState<string | null>(null);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Course | null>(null);

  const { data, isLoading, error } = useQuery<
    { courses: Course[]; total: number },
    Error
  >({
    queryKey: ["courses", currentPage],
    queryFn: async () => {
      const offset = (currentPage - 1) * rowsPerPage;
      const res = await databases.listDocuments(
        APPWRITE_CONFIG.DATABASE_ID,
        APPWRITE_CONFIG.COURSES_COLLECTION_ID,
        [Query.limit(rowsPerPage), Query.offset(offset)]
      );
      const courses: Course[] = res.documents.map((doc: any) => ({
        $id: doc.$id,
        title: doc.title || "",
        description: doc.description || "",
        Price: Number(doc.Price ?? 0),
        category: doc.category || "",
        ImageUrl: doc.ImageUrl || "/placeholder.png",
        syllabus: doc.syllabus || "Not provided",
      }));
      return { courses, total: res.total };
    },
    placeholderData: (prev) => prev,
    onError: () => setSnackbar("Failed to fetch courses."),
  });

  const totalPages = data
    ? Math.max(1, Math.ceil(data.total / rowsPerPage))
    : 1;

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await databases.deleteDocument(
        APPWRITE_CONFIG.DATABASE_ID,
        APPWRITE_CONFIG.COURSES_COLLECTION_ID,
        id
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["courses"] });
      setSnackbar("Course deleted successfully!");
    },
    onError: () => setSnackbar("Failed to delete course."),
  });

  const updateMutation = useMutation({
    mutationFn: async (payload: { id: string; updates: Partial<Course> }) => {
      await databases.updateDocument(
        APPWRITE_CONFIG.DATABASE_ID,
        APPWRITE_CONFIG.COURSES_COLLECTION_ID,
        payload.id,
        payload.updates
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["courses"] });
      setOpen(false);
      setSnackbar("Course updated successfully!");
    },
    onError: () => setSnackbar("Failed to update course."),
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>Manage Courses</title>
      </Head>

      {/* Gradient background */}
      <Box
        sx={{
          background: "linear-gradient(to bottom, #87CEEB, #ffffff)",
          minHeight: "100vh",
          py: 8,
        }}
      >
        <Box sx={{ maxWidth: 1300, mx: "auto", px: 2 }}>
          <Stack direction="row" justifyContent="space-between" mb={3}>
            <Typography variant="h4" fontWeight={700} color="primary">
              Manage Courses
            </Typography>
            <Button
              component={NextLink}
              href="/courses"
              variant="contained"
              color="secondary"
            >
              Return
            </Button>
          </Stack>

          {isLoading ? (
            <Stack alignItems="center" mt={4}>
              <CircularProgress color="primary" />
              <Typography variant="body2" sx={{ mt: 2 }}>
                Loading courses...
              </Typography>
            </Stack>
          ) : error ? (
            <Typography color="error" align="center">
              Failed to load courses.
            </Typography>
          ) : (
            <>
              <TableContainer
                component={Paper}
                sx={{
                  border: "1px solid #ddd",
                  backgroundColor: "background.paper",
                }}
              >
                <Table>
                  <TableHead sx={{ backgroundColor: "#e6f0ff" }}>
                    <TableRow>
                      <TableCell>Thumbnail</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Price (₹)</TableCell>
                      <TableCell>Syllabus</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.courses.length ? (
                      data.courses.map((course) => (
                        <TableRow
                          key={course.$id}
                          hover
                          sx={{ "&:hover": { backgroundColor: "#d9eaff" } }}
                        >
                          <TableCell>
                            <img
                              src={course.ImageUrl}
                              alt="Thumbnail"
                              style={{
                                width: 100,
                                height: 70,
                                objectFit: "cover",
                                borderRadius: 6,
                                border: "1px solid #ccc",
                              }}
                            />
                          </TableCell>
                          <TableCell>{course.title}</TableCell>
                          <TableCell>{course.category}</TableCell>
                          <TableCell>₹{course.Price}</TableCell>
                          <TableCell>
                            {course.syllabus?.slice(0, 50)}...
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              onClick={() => {
                                setEditing(course);
                                setOpen(true);
                              }}
                              color="primary"
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => {
                                if (confirm("Delete this course?"))
                                  deleteMutation.mutate(course.$id);
                              }}
                              color="error"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          No courses found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              {totalPages > 1 && (
                <Stack mt={4} alignItems="center">
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(_, page) => setCurrentPage(page)}
                    color="primary"
                    shape="rounded"
                    size="large"
                    sx={{
                      "& .MuiPaginationItem-root": {
                        borderRadius: "12px",
                        fontWeight: 600,
                        boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
                      },
                      "& .Mui-selected": {
                        backgroundColor: "#003366 !important",
                        color: "#fff",
                      },
                    }}
                  />
                </Stack>
              )}
            </>
          )}
        </Box>
      </Box>

      {/* Edit Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Course</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <Stack spacing={1}>
              <Typography variant="subtitle2">Course Image</Typography>
              {editing?.ImageUrl && (
                <img
                  src={editing.ImageUrl}
                  alt="Course Image"
                  style={{
                    width: 150,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 6,
                  }}
                />
              )}
              <Button variant="outlined" component="label">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={async (e) => {
                    if (!e.target.files?.[0] || !editing) return;
                    const file = e.target.files[0];
                    try {
                      const res = await storage.createFile(
                        APPWRITE_CONFIG.BUCKET_ID,
                        ID.unique(),
                        file
                      );
                      const imageUrl = `${APPWRITE_CONFIG.ENDPOINT}/storage/buckets/${APPWRITE_CONFIG.BUCKET_ID}/files/${res.$id}/view?project=${APPWRITE_CONFIG.PROJECT_ID}`;
                      setEditing((c) => (c ? { ...c, ImageUrl: imageUrl } : c));
                      setSnackbar("Image uploaded successfully!");
                    } catch (err) {
                      console.error(err);
                      setSnackbar("Failed to upload image.");
                    }
                  }}
                />
              </Button>
            </Stack>

            <TextField
              label="Title"
              value={editing?.title ?? ""}
              onChange={(e) =>
                setEditing((c) => (c ? { ...c, title: e.target.value } : c))
              }
              fullWidth
            />
            <TextField
              label="Description"
              value={editing?.description ?? ""}
              onChange={(e) =>
                setEditing((c) =>
                  c ? { ...c, description: e.target.value } : c
                )
              }
              fullWidth
              multiline
              minRows={3}
            />
            <TextField
              label="Syllabus"
              value={editing?.syllabus ?? ""}
              onChange={(e) =>
                setEditing((c) => (c ? { ...c, syllabus: e.target.value } : c))
              }
              fullWidth
              multiline
              minRows={2}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                type="number"
                label="Price (₹)"
                value={editing?.Price ?? 0}
                onChange={(e) =>
                  setEditing((c) =>
                    c ? { ...c, Price: Number(e.target.value || 0) } : c
                  )
                }
                fullWidth
              />
              <TextField
                label="Category"
                value={editing?.category ?? ""}
                onChange={(e) =>
                  setEditing((c) =>
                    c ? { ...c, category: e.target.value } : c
                  )
                }
                fullWidth
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              if (!editing) return;
              const {
                $id,
                title,
                description,
                Price,
                category,
                syllabus,
                ImageUrl,
              } = editing;
              updateMutation.mutate({
                id: $id,
                updates: {
                  title,
                  description,
                  Price,
                  category,
                  syllabus,
                  ImageUrl,
                },
              });
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
<Snackbar
  open={!!snackbar}
  autoHideDuration={3000}
  onClose={() => setSnackbar(null)}
  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
>
  <Box
    sx={{
      bgcolor: snackbar?.includes("failed") ? "#ff5252" : "#003366", // red for error, deep blue for success
      color: "#fff",
      px: 3,
      py: 1.5,
      borderRadius: 2,
      fontWeight: 500,
      fontFamily: "Roboto, Arial, sans-serif",
    }}
  >
    {snackbar}
  </Box>
</Snackbar>

    </ThemeProvider>
  );
};

export default ManageCourses;
