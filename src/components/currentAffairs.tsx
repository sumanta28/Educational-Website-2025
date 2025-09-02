// "use client";

// import { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   CircularProgress,
//   Grid,
//   useTheme,
//   ThemeProvider,
//   createTheme,
// } from "@mui/material";
// import { Client, Databases } from "appwrite";

// interface CurrentAffair {
//   $id: string;
//   title: string;
//   description: string;
//   date: string;
// }

// // Appwrite client setup
// const client = new Client();
// const databases = new Databases(client);

// client
//   .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
//   .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

// // Sky blue & white MUI theme
// const theme = createTheme({
//   palette: {
//     mode: "light",
//     primary: {
//       main: "#87ceeb", // sky blue
//     },
//     background: {
//       default: "#f0f8ff", // white-ish background
//       paper: "#ffffff",
//     },
//     text: {
//       primary: "#000000", // black text for body
//       secondary: "#000000", // black for secondary text
//     },
//   },
//   typography: {
//     h4: {
//       color: "#00008B", // deep blue heading
//     },
//   },
// });

// export default function CurrentAffairsPage() {
//   const [affairs, setAffairs] = useState<CurrentAffair[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCurrentAffairs = async () => {
//       try {
//         const response = await databases.listDocuments(
//           process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
//           process.env.NEXT_PUBLIC_APPWRITE_CURRENTAFFAIRS_ID!
//         );

//         setAffairs(response.documents as CurrentAffair[]);
//       } catch (error) {
//         console.error("Error fetching current affairs:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCurrentAffairs();
//   }, []);

//   if (loading)
//     return (
//       <ThemeProvider theme={theme}>
//         <Box
//           display="flex"
//           justifyContent="center"
//           alignItems="center"
//           minHeight="80vh"
//           bgcolor={theme.palette.background.default}
//         >
//           <CircularProgress color="primary" />
//         </Box>
//       </ThemeProvider>
//     );

//   return (
//     <ThemeProvider theme={theme}>
//       <Box p={4} bgcolor={theme.palette.background.default} minHeight="100vh">
//         <Typography variant="h4" gutterBottom sx={{ color: "#00008B" }}>
//           Current Affairs
//         </Typography>
//         <Grid container spacing={2}>
//           {affairs.map((item) => (
//             <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.$id}>
//               <Card
//                 variant="outlined"
//                 sx={{
//                   borderColor: theme.palette.primary.main,
//                   backgroundColor: theme.palette.background.paper,
//                   "&:hover": { boxShadow: 4 },
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h6" sx={{ color: "#00008B" }}>
//                     {item.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" paragraph>
//                     {item.description}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     {new Date(item.date).toLocaleDateString()}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </ThemeProvider>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  useTheme,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Client, Databases } from "appwrite";

interface CurrentAffair {
  $id: string;
  title: string;
  description: string;
  date: string;
}

// Appwrite client setup
const client = new Client();
const databases = new Databases(client);

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

// Sky blue & white MUI theme
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#87ceeb", // sky blue
    },
    background: {
      default: "#f0f8ff", // white-ish background
      paper: "#ffffff",
    },
    text: {
      primary: "#000000", // black text for body
      secondary: "#000000", // black for secondary text
    },
  },
  typography: {
    h4: {
      color: "#00008B", // deep blue heading
    },
  },
});

export default function CurrentAffairsPage() {
  const [affairs, setAffairs] = useState<CurrentAffair[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentAffairs = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_CURRENTAFFAIRS_ID!
        );

        // Safe mapping to CurrentAffair type
        const mappedAffairs: CurrentAffair[] = response.documents.map((doc) => ({
          $id: doc.$id,
          title: doc.title ?? "No Title",
          description: doc.description ?? "No Description",
          date: doc.date ?? new Date().toISOString(),
        }));

        setAffairs(mappedAffairs);
      } catch (error) {
        console.error("Error fetching current affairs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentAffairs();
  }, []);

  if (loading)
    return (
      <ThemeProvider theme={theme}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
          bgcolor={theme.palette.background.default}
        >
          <CircularProgress color="primary" />
        </Box>
      </ThemeProvider>
    );

  return (
    <ThemeProvider theme={theme}>
      <Box p={4} bgcolor={theme.palette.background.default} minHeight="100vh">
        <Typography variant="h4" gutterBottom sx={{ color: "#00008B" }}>
          Current Affairs
        </Typography>
        <Grid container spacing={2}>
          {affairs.map((item) => (
            <Grid size={{xs:12, sm:6, md:4}} key={item.$id}>
              <Card
                variant="outlined"
                sx={{
                  borderColor: theme.palette.primary.main,
                  backgroundColor: theme.palette.background.paper,
                  "&:hover": { boxShadow: 4 },
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ color: "#00008B" }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {item.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(item.date).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
