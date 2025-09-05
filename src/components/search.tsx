"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Client, Databases, Query, Models } from "appwrite";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CircularProgress,
  Box,
  TextField,
  Paper,
  List,
  ListItemButton,
  InputAdornment,
  IconButton,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Lottie from "lottie-react";
import emptyAnimation from "@/lottie/empty.json"; // adjust path if needed


type Course = Models.Document & {
  title: string;
  description?: string;
  Price?: number;
  ImageUrl?: string;
};

const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COURSES_COLLECTION_ID!;

// Custom theme matching About page
const theme = createTheme({
  palette: {
    primary: { main: "#003366" },
    background: { default: "#ffffff", paper: "#e6f0ff" },
    text: { primary: "#000000", secondary: "#333333" },
  },
  typography: { fontFamily: "Roboto, Arial, sans-serif" },
});

const SearchPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Course[]>([]);

  const router = useRouter();
  const query = (router.query.query as string) ?? "";
  const byId = router.query.byId === "1";

  const fetchCourses = async (term: string, byId = false) => {
    setLoading(true);
    setError(null);

    const client = new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(PROJECT_ID);
    const databases = new Databases(client);

    try {
      let filters;
      if (!term) {
        filters = [Query.limit(60)];
      } else if (byId) {
        filters = [Query.equal("$id", term)];
      } else {
        filters = term
          .toLowerCase()
          .split(/\s+/)
          .map((t) => Query.search("title", t))
          .concat(Query.limit(60));
      }

      const response = await databases.listDocuments<Course>(DATABASE_ID, COLLECTION_ID, filters);
      setCourses(response.documents);
    } catch (e) {
      console.error("Fetch failed", e);
      setError("Failed to fetch courses");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!router.isReady) return;
    fetchCourses(query, byId);
  }, [query, byId, router.isReady]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchTerm.trim()) fetchSuggestions(searchTerm.toLowerCase());
      else setSuggestions([]);
    }, 300);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  const fetchSuggestions = async (term: string) => {
    const client = new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(PROJECT_ID);
    const databases = new Databases(client);

    try {
      const lastChar = term.charCodeAt(term.length - 1);
      const nextChar = String.fromCharCode(lastChar + 1);
      const endRange = term.slice(0, -1) + nextChar;

      const response = await databases.listDocuments<Course>(DATABASE_ID, COLLECTION_ID, [
        Query.orderAsc("title"),
        Query.limit(5),
        Query.greaterThanEqual("title", term),
        Query.lessThan("title", endRange),
      ]);

      setSuggestions(response.documents);
    } catch (e) {
      console.error("Suggestion fetch failed", e);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ px: 3, py: 6, background: "linear-gradient(to bottom, #87CEEB, #ffffff)", minHeight: "100vh" }}>
        {/* Search Bar */}
        <Box display="flex" justifyContent="center" mb={3}>
          <TextField
            variant="outlined"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
            sx={{
              width: "100%",
              maxWidth: 450,
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: 1,
              "& .MuiOutlinedInput-root": { height: "48px", borderRadius: "8px" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon sx={{ color: "#003366" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <Paper
            sx={{
              position: "absolute",
              zIndex: 10,
              maxWidth: "450px",
              width: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              mt: 1,
              borderRadius: "12px",
              boxShadow: 3,
              overflow: "hidden",
            }}
          >
            <List dense>
              {suggestions.map((course, idx) => (
                <React.Fragment key={course.$id}>
                  <ListItemButton
                    onClick={() => {
                      router.push(`/search?query=${course.$id}&byId=1`);
                      setSuggestions([]);
                    }}
                    sx={{ py: 1, "&:hover": { backgroundColor: "#f1f5f9" } }}
                  >
                    <Box>
                      <Typography variant="body1" fontWeight={600} noWrap sx={{ maxWidth: "380px" }}>
                        {course.title}
                      </Typography>
                      {course.description && (
                        <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: "380px" }}>
                          {course.description}
                        </Typography>
                      )}
                    </Box>
                  </ListItemButton>
                  {idx < suggestions.length - 1 && <Box sx={{ borderBottom: "1px solid #e5e7eb", mx: 2 }} />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        )}

        {/* Heading */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} mt={5}>
          <Typography variant="h5" fontWeight={600}>
            {query ? (
              <>
                Search results for{" "}
                <Typography component="span" color="primary" fontWeight={700}>
                  {byId && courses.length > 0 ? courses[0].title : query}
                </Typography>
              </>
            ) : (
              "All Courses"
            )}
          </Typography>

          <Typography
            sx={{ cursor: "pointer", color: "#003366", fontWeight: 500, "&:hover": { textDecoration: "underline" } }}
            onClick={() => { setSearchTerm(""); router.push("/search"); }}
          >
            Show All Courses
          </Typography>
        </Box>

        {/* Results */}
        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : courses.length === 0 ? (
  <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
    <Lottie animationData={emptyAnimation} style={{ width: 300, height: 300 }} />
    <Typography mt={2} variant="h6" color="text.secondary">
      No courses found.
    </Typography>
  </Box>
)

         : (
          <Grid container spacing={3}>
            {courses.map((course) => (
              <Grid key={course.$id} size={{ xs: 6, sm: 4, md: 3, lg: 3 }}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "12px",
                    backgroundColor: "background.paper",
                    boxShadow: 2,
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": { transform: "translateY(-5px)", boxShadow: "0 8px 20px rgba(0,0,0,0.2)" },
                  }}
                >
                  {course.ImageUrl && (
                    <CardMedia
                      component="img"
                      height="180"
                      image={course.ImageUrl}
                      alt={course.title}
                      sx={{ borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight={600} gutterBottom noWrap color="primary">
                      {course.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                    >
                      {course.description}
                    </Typography>
                    <Typography variant="subtitle1" color="success.main" fontWeight={600} mt={1}>
                      Price: ₹{course.Price ?? "N/A"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default SearchPage;
