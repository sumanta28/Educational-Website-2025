// // import { useAuth } from "@/components/AuthContext";
// // import { useState } from "react";
// // import { useRouter } from "next/router";
// // import Cookies from "js-cookie";
// // import { account } from "@/lib/appwrite";

// // import {
// //   TextField,
// //   Button,
// //   Typography,
// //   Box,
// //   Card,
// //   CardContent,
// //   Avatar,
// //   Divider,
// //   CircularProgress,
// // } from "@mui/material";
// // import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

// // export default function LoginPage() {
// //   const router = useRouter();
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false); // loader state
// //   const { login } = useAuth();

// //   const handleLogin = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true); // show loader

// //     try {
// //       const session = await account.createEmailPasswordSession(email, password);
// //       Cookies.set("session", JSON.stringify(session), { expires: 1 });

// //       login(); // update context immediately

// //       // Simulate a short delay before redirect so spinner is visible
// //       setTimeout(() => {
// //         router.push("/"); // Redirect to home
// //       }, 1500);
// //     } catch (err: any) {
// //       setError(err.message);
// //       setLoading(false); // stop loader on error
// //     }
// //   };

// //   return (
// //     <Box
// //       sx={{
// //         minHeight: "100vh",
// //         display: "flex",
// //         alignItems: "center",
// //         justifyContent: "center",
// //         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
// //         p: 2,
// //       }}
// //     >
// //       <Card
// //         sx={{
// //           width: "100%",
// //           maxWidth: 400,
// //           borderRadius: 4,
// //           boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
// //           backgroundColor: "#fff",
// //         }}
// //       >
// //         <CardContent sx={{ p: 4 }}>
// //           <Box display="flex" flexDirection="column" alignItems="center">
// //             <Avatar sx={{ bgcolor: "primary.main", mb: 2 }}>
// //               <LockOutlinedIcon />
// //             </Avatar>
// //             <Typography variant="h5" fontWeight="bold">
// //               Welcome Back
// //             </Typography>
// //             <Typography
// //               variant="body2"
// //               color="text.secondary"
// //               align="center"
// //               sx={{ mb: 3 }}
// //             >
// //               Login to continue and access your account
// //             </Typography>
// //           </Box>

// //           {error && (
// //             <Typography color="error" align="center" sx={{ mb: 2 }}>
// //               {error}
// //             </Typography>
// //           )}

// //           {/* 🔄 Show loader while logging in */}
// //           {loading ? (
// //             <Box display="flex" justifyContent="center" my={4}>
// //               <CircularProgress />
// //             </Box>
// //           ) : (
// //             <form onSubmit={handleLogin}>
// //               <TextField
// //                 fullWidth
// //                 label="Email Address"
// //                 margin="normal"
// //                 type="email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 variant="outlined"
// //               />
// //               <TextField
// //                 fullWidth
// //                 label="Password"
// //                 margin="normal"
// //                 type="password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 variant="outlined"
// //               />

// //               <Button
// //                 fullWidth
// //                 type="submit"
// //                 variant="contained"
// //                 sx={{
// //                   mt: 3,
// //                   py: 1.2,
// //                   fontWeight: "bold",
// //                   fontSize: "1rem",
// //                   borderRadius: "8px",
// //                   background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
// //                   boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
// //                   "&:hover": {
// //                     background:
// //                       "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
// //                   },
// //                 }}
// //               >
// //                 Login
// //               </Button>

// //               <Divider sx={{ my: 3 }}>OR</Divider>

// //               <Button
// //                 fullWidth
// //                 variant="text"
// //                 sx={{
// //                   fontSize: "0.9rem",
// //                   fontWeight: "medium",
// //                   color: "primary.main",
// //                 }}
// //                 onClick={() => router.push("/register")}
// //               >
// //                 Don&apos;t have an account? <b>Register</b>
// //               </Button>
// //             </form>
// //           )}
// //         </CardContent>
// //       </Card>
// //     </Box>
// //   );
// // }

// import { useAuth } from "@/components/AuthContext";
// import { useState } from "react";
// import { useRouter } from "next/router";
// import Cookies from "js-cookie";
// import { account } from "@/lib/appwrite";

// import {
//   TextField,
//   Button,
//   Typography,
//   Box,
//   Card,
//   CardContent,
//   Avatar,
//   Divider,
//   CircularProgress,
// } from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false); // loader state
//   const { login } = useAuth();

//   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true); // show loader

//     try {
//       const session = await account.createEmailPasswordSession(email, password);
//       Cookies.set("session", JSON.stringify(session), { expires: 1 });

//       login(); // update context immediately

//       // Simulate a short delay before redirect so spinner is visible
//       setTimeout(() => {
//         router.push("/"); // Redirect to home
//       }, 1500);
//     } catch (err) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError("An unexpected error occurred");
//       }
//       setLoading(false); // stop loader on error
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         p: 2,
//       }}
//     >
//       <Card
//         sx={{
//           width: "100%",
//           maxWidth: 400,
//           borderRadius: 4,
//           boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
//           backgroundColor: "#fff",
//         }}
//       >
//         <CardContent sx={{ p: 4 }}>
//           <Box display="flex" flexDirection="column" alignItems="center">
//             <Avatar sx={{ bgcolor: "primary.main", mb: 2 }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography variant="h5" fontWeight="bold">
//               Welcome Back
//             </Typography>
//             <Typography
//               variant="body2"
//               color="text.secondary"
//               align="center"
//               sx={{ mb: 3 }}
//             >
//               Login to continue and access your account
//             </Typography>
//           </Box>

//           {error && (
//             <Typography color="error" align="center" sx={{ mb: 2 }}>
//               {error}
//             </Typography>
//           )}

//           {loading ? (
//             <Box display="flex" justifyContent="center" my={4}>
//               <CircularProgress />
//             </Box>
//           ) : (
//             <form onSubmit={handleLogin}>
//               <TextField
//                 fullWidth
//                 label="Email Address"
//                 margin="normal"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 variant="outlined"
//               />
//               <TextField
//                 fullWidth
//                 label="Password"
//                 margin="normal"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 variant="outlined"
//               />

//               <Button
//                 fullWidth
//                 type="submit"
//                 variant="contained"
//                 sx={{
//                   mt: 3,
//                   py: 1.2,
//                   fontWeight: "bold",
//                   fontSize: "1rem",
//                   borderRadius: "8px",
//                   background:
//                     "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                   boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
//                   "&:hover": {
//                     background:
//                       "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
//                   },
//                 }}
//               >
//                 Login
//               </Button>

//               <Divider sx={{ my: 3 }}>OR</Divider>

//               <Button
//                 fullWidth
//                 variant="text"
//                 sx={{
//                   fontSize: "0.9rem",
//                   fontWeight: "medium",
//                   color: "primary.main",
//                 }}
//                 onClick={() => router.push("/register")}
//               >
//                 Don&apos;t have an account? <b>Register</b>
//               </Button>
//               {/* Add this inside CardContent, below the Register button */}

//               <Box display="flex" justifyContent="center" mt={2}>
//                 <Button
//                   variant="outlined"
//                   sx={{
//                     px: 4,
//                     py: 1,
//                     fontWeight: "bold",
//                     fontSize: "0.9rem",
//                     borderRadius: "20px",
//                     borderColor: "#764ba2",
//                     color: "#764ba2",
//                     textTransform: "none",
//                     boxShadow: "0px 2px 6px rgba(118, 75, 162, 0.3)",
//                     transition: "all 0.3s ease",
//                     "&:hover": {
//                       background:
//                         "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                       color: "#fff",
//                       borderColor: "#764ba2",
//                       boxShadow: "0px 5px 15px rgba(118, 75, 162, 0.4)",
//                     },
//                   }}
//                   onClick={() => router.push("/")}
//                 >
//                   Return to Homepage
//                 </Button>
//               </Box>
//             </form>
//           )}
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }


import { useAuth } from "@/components/AuthContext";
import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { account } from "@/lib/appwrite";

import {
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Divider,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import HomeIcon from "@mui/icons-material/Home";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const session = await account.createEmailPasswordSession(email, password);
      Cookies.set("session", JSON.stringify(session), { expires: 1 });

      login();

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
      setLoading(false);
    }
  };

  return (
  <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      p: 2,
      position: "relative",
    }}
  >
    <Card
      sx={{
        width: "100%",
        maxWidth: 400,
        borderRadius: 4,
        boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
        backgroundColor: "#fff",
        position: "relative",
        pt: 6, // to leave space for home button
      }}
    >
      {/* Home button inside the card */}
      <Button
        startIcon={<HomeIcon />}
        variant="text"
        onClick={() => router.push("/")}
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          color: "#667eea", // matching gradient primary color
          fontWeight: "bold",
          textTransform: "none",
          "&:hover": {
            textDecoration: "underline",
            backgroundColor: "transparent",
          },
        }}
      >
        Home
      </Button>

      <CardContent sx={{ p: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ bgcolor: "primary.main", mb: 2 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" fontWeight="bold">
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mb: 3 }}
          >
            Login to continue and access your account
          </Typography>
        </Box>

        {error && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                py: 1.2,
                fontWeight: "bold",
                fontSize: "1rem",
                borderRadius: "8px",
                background:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                },
              }}
            >
              Login
            </Button>

            <Divider sx={{ my: 3 }}>OR</Divider>

            <Button
              fullWidth
              variant="text"
              sx={{
                fontSize: "0.9rem",
                fontWeight: "medium",
                color: "primary.main",
                textTransform: "none",
              }}
              onClick={() => router.push("/register")}
            >
              Don't have an account? <b>register</b>
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  </Box>
);
}
