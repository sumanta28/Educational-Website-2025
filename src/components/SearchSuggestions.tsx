// // "use client";
// // import React, { useEffect, useState, useRef } from "react";
// // import { Box, Paper, Typography } from "@mui/material";
// // import { Client, Databases, Query } from "appwrite";
// // import { useRouter } from "next/router";

// // interface Course {
// //   $id: string;
// //   title: string;
// //   description?: string;
// // }

// // interface SearchSuggestionsProps {
// //   searchTerm: string;
// //   setSearchTerm: (value: string) => void;
// // }

// // const MAX_DESC_LENGTH = 50;

// // const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ searchTerm, setSearchTerm }) => {
// //   const [suggestions, setSuggestions] = useState<Course[]>([]);
// //   const router = useRouter();
// //   const containerRef = useRef<HTMLDivElement>(null);

// //   useEffect(() => {
// //     const delayDebounce = setTimeout(() => {
// //       if (searchTerm.trim()) fetchSuggestions(searchTerm.toLowerCase());
// //       else setSuggestions([]);
// //     }, 300);

// //     return () => clearTimeout(delayDebounce);
// //   }, [searchTerm]);

// //   const fetchSuggestions = async (term: string) => {
// //     const client = new Client()
// //       .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
// //       .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

// //     const databases = new Databases(client);

// //     try {
// //       const lastChar = term.charCodeAt(term.length - 1);
// //       const nextChar = String.fromCharCode(lastChar + 1);
// //       const endRange = term.slice(0, -1) + nextChar;

// //       const response = await databases.listDocuments<Course>(
// //         process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
// //         process.env.NEXT_PUBLIC_APPWRITE_COURSES_COLLECTION_ID!,
// //         [
// //           Query.orderAsc("title"),
// //           Query.limit(5),
// //           Query.greaterThanEqual("title", term),
// //           Query.lessThan("title", endRange),
// //         ]
// //       );

// //       setSuggestions(response.documents);
// //     } catch (err) {
// //       console.error("Failed to fetch suggestions", err);
// //     }
// //   };

// //   // Close suggestions when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event: MouseEvent) => {
// //       if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
// //         setSuggestions([]);
// //       }
// //     };

// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   if (!searchTerm || suggestions.length === 0) return null;

// //   return (
// //     <Box ref={containerRef} sx={{ position: "relative" }}>
// //       <Paper
// //         elevation={4}
// //         sx={{
// //           position: "absolute",
// //           zIndex: 20,
// //           width: "100%",
// //           maxWidth: 400,
// //           mt: 1,
// //           borderRadius: 2,
// //           overflow: "hidden",
// //           boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
// //         }}
// //       >
// //         {suggestions.map((course, idx) => {
// //           const shortDesc = course.description
// //             ? course.description.length > MAX_DESC_LENGTH
// //               ? course.description.slice(0, MAX_DESC_LENGTH) + "..."
// //               : course.description
// //             : "";

// //           return (
// //             <Box
// //               key={course.$id}
// //               sx={{
// //                 px: 3,
// //                 py: 1.5,
// //                 cursor: "pointer",
// //                 backgroundColor: "#e6f0ff",
// //                 "&:hover": { backgroundColor: "#d0e4ff" },
// //                 transition: "background-color 0.2s",
// //                 borderBottom: idx < suggestions.length - 1 ? "1px solid #cce0ff" : "none",
// //               }}
// //               onClick={() => {
// //                 router.push(`/search?query=${course.$id}&byId=1`);
// //                 setSearchTerm("");
// //                 setSuggestions([]);
// //               }}
// //             >
// //               <Typography variant="body1" fontWeight={600} sx={{ color: "#003366" }}>
// //                 {course.title}
// //               </Typography>
// //               {shortDesc && (
// //                 <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
// //                   {shortDesc}
// //                 </Typography>
// //               )}
// //             </Box>
// //           );
// //         })}
// //       </Paper>
// //     </Box>
// //   );
// // };

// // export default SearchSuggestions;


// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import { Box, Paper, Typography } from "@mui/material";
// import { Client, Databases, Query, Document } from "appwrite";
// import { useRouter } from "next/router";

// interface Course extends Document {
//   title: string;
//   description?: string;
// }

// interface SearchSuggestionsProps {
//   searchTerm: string;
//   setSearchTerm: (value: string) => void;
// }

// const MAX_DESC_LENGTH = 50;

// const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ searchTerm, setSearchTerm }) => {
//   const [suggestions, setSuggestions] = useState<Course[]>([]);
//   const router = useRouter();
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       if (searchTerm.trim()) fetchSuggestions(searchTerm.toLowerCase());
//       else setSuggestions([]);
//     }, 300);

//     return () => clearTimeout(delayDebounce);
//   }, [searchTerm]);

//   const fetchSuggestions = async (term: string) => {
//     const client = new Client()
//       .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
//       .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

//     const databases = new Databases(client);

//     try {
//       const lastChar = term.charCodeAt(term.length - 1);
//       const nextChar = String.fromCharCode(lastChar + 1);
//       const endRange = term.slice(0, -1) + nextChar;

//       const response = await databases.listDocuments<Course>(
//         process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
//         process.env.NEXT_PUBLIC_APPWRITE_COURSES_COLLECTION_ID!,
//         [
//           Query.orderAsc("title"),
//           Query.limit(5),
//           Query.greaterThanEqual("title", term),
//           Query.lessThan("title", endRange),
//         ]
//       );

//       setSuggestions(response.documents);
//     } catch (err) {
//       console.error("Failed to fetch suggestions", err);
//     }
//   };

//   // Close suggestions when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
//         setSuggestions([]);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   if (!searchTerm || suggestions.length === 0) return null;

//   return (
//     <Box ref={containerRef} sx={{ position: "relative" }}>
//       <Paper
//         elevation={4}
//         sx={{
//           position: "absolute",
//           zIndex: 20,
//           width: "100%",
//           maxWidth: 400,
//           mt: 1,
//           borderRadius: 2,
//           overflow: "hidden",
//           boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
//         }}
//       >
//         {suggestions.map((course, idx) => {
//           const shortDesc = course.description
//             ? course.description.length > MAX_DESC_LENGTH
//               ? course.description.slice(0, MAX_DESC_LENGTH) + "..."
//               : course.description
//             : "";

//           return (
//             <Box
//               key={course.$id}
//               sx={{
//                 px: 3,
//                 py: 1.5,
//                 cursor: "pointer",
//                 backgroundColor: "#e6f0ff",
//                 "&:hover": { backgroundColor: "#d0e4ff" },
//                 transition: "background-color 0.2s",
//                 borderBottom: idx < suggestions.length - 1 ? "1px solid #cce0ff" : "none",
//               }}
//               onClick={() => {
//                 router.push(`/search?query=${course.$id}&byId=1`);
//                 setSearchTerm("");
//                 setSuggestions([]);
//               }}
//             >
//               <Typography variant="body1" fontWeight={600} sx={{ color: "#003366" }}>
//                 {course.title}
//               </Typography>
//               {shortDesc && (
//                 <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
//                   {shortDesc}
//                 </Typography>
//               )}
//             </Box>
//           );
//         })}
//       </Paper>
//     </Box>
//   );
// };

// export default SearchSuggestions;



"use client";
import React, { useEffect, useState, useRef } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { Client, Databases, Query } from "appwrite";
import { useRouter } from "next/router";

// Define Appwrite document type
interface AppwriteDocument {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $collectionId: string;
  $databaseId: string;
}

// Course extends the document
interface Course extends AppwriteDocument {
  title: string;
  description?: string;
  $sequence: number;
}

interface SearchSuggestionsProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const MAX_DESC_LENGTH = 50;

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ searchTerm, setSearchTerm }) => {
  const [suggestions, setSuggestions] = useState<Course[]>([]);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim()) fetchSuggestions(searchTerm.toLowerCase());
      else setSuggestions([]);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const fetchSuggestions = async (term: string) => {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

    const databases = new Databases(client);

    try {
      const lastChar = term.charCodeAt(term.length - 1);
      const nextChar = String.fromCharCode(lastChar + 1);
      const endRange = term.slice(0, -1) + nextChar;

      const response = await databases.listDocuments<Course>(
  process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  process.env.NEXT_PUBLIC_APPWRITE_COURSES_COLLECTION_ID!,
  [
    Query.orderAsc("title"),
    Query.limit(5),
    Query.greaterThanEqual("title", term),
    Query.lessThan("title", endRange),
  ]
);


      setSuggestions(response.documents);
    } catch (err) {
      console.error("Failed to fetch suggestions", err);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!searchTerm || suggestions.length === 0) return null;

  return (
    <Box ref={containerRef} sx={{ position: "relative" }}>
      <Paper
        elevation={4}
        sx={{
          position: "absolute",
          zIndex: 20,
          width: "100%",
          maxWidth: 400,
          mt: 1,
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        }}
      >
        {suggestions.map((course, idx) => {
          const shortDesc = course.description
            ? course.description.length > MAX_DESC_LENGTH
              ? course.description.slice(0, MAX_DESC_LENGTH) + "..."
              : course.description
            : "";

          return (
            <Box
              key={course.$id}
              sx={{
                px: 3,
                py: 1.5,
                cursor: "pointer",
                backgroundColor: "#e6f0ff",
                "&:hover": { backgroundColor: "#d0e4ff" },
                transition: "background-color 0.2s",
                borderBottom: idx < suggestions.length - 1 ? "1px solid #cce0ff" : "none",
              }}
              onClick={() => {
                router.push(`/search?query=${course.$id}&byId=1`);
                setSearchTerm("");
                setSuggestions([]);
              }}
            >
              <Typography variant="body1" fontWeight={600} sx={{ color: "#003366" }}>
                {course.title}
              </Typography>
              {shortDesc && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
                  {shortDesc}
                </Typography>
              )}
            </Box>
          );
        })}
      </Paper>
    </Box>
  );
};

export default SearchSuggestions;
