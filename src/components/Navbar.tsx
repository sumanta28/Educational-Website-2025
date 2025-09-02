// // "use client";

// // import { useState } from "react";
// // import Link from "next/link";
// // import { useRouter } from "next/router";
// // import Image from "next/image";
// // import { useCart } from "@/components/CartContext";
// // import SearchSuggestions from "@/components/SearchSuggestions";
// // import {
// //   Badge,
// //   AppBar,
// //   Toolbar,
// //   Button,
// //   Box,
// //   TextField,
// //   IconButton,
// //   Avatar,
// //   Menu,
// //   MenuItem,
// //   Tooltip,
// //   Typography,
// //   Divider,
// //   Drawer,
// //   List,
// //   ListItem,
// //   ListItemText,
// // } from "@mui/material";
// // import MenuIcon from "@mui/icons-material/Menu";
// // import SearchIcon from "@mui/icons-material/Search";
// // import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// // import SchoolIcon from "@mui/icons-material/School";
// // import LogoutIcon from "@mui/icons-material/Logout";
// // import NotificationsIcon from "@mui/icons-material/Notifications";
// // import CartButtonWithBadge from "./CartButtonWithBadge";
// // import { useNotifications } from "@/components/notificationContext";
// // import { useAuth } from "@/components/AuthContext";
// // import { Poppins } from "next/font/google";

// // const poppins = Poppins({
// //   subsets: ["latin"],
// //   weight: ["400", "500", "600", "700"],
// // });

// // export default function Navbar() {
// //   const { notifications } = useNotifications();
// //   const { isLoggedIn, user, logout, isAdmin } = useAuth();
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
// //   const [notifAnchorEl, setNotifAnchorEl] = useState<null | HTMLElement>(null);
// //   const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
// //   const router = useRouter();
// //   const { clearCart } = useCart();

// //   const menuItems = [
// //     { text: "Home", href: "/" },
// //     { text: "Current Affairs", href: "/currentAffairs" },
// //     { text: "Courses", href: "/courses" },
// //     { text: "About Us", href: "/aboutUs" },
// //     { text: "Contact Us", href: "/contactUs" }, // updated text
// //   ];

// //   const handleSearch = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (searchQuery.trim()) {
// //       router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
// //     }
// //   };

// //   const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) =>
// //     setAnchorEl(event.currentTarget);
// //   const handleMenuClose = () => setAnchorEl(null);
// //   const handleNotifClick = (event: React.MouseEvent<HTMLElement>) =>
// //     setNotifAnchorEl(event.currentTarget);
// //   const handleNotifClose = () => setNotifAnchorEl(null);

// //   const handleLogoutClick = async () => {
// //     handleMenuClose();
// //     clearCart();
// //     await logout();
// //     router.replace("/");
// //   };

// //   return (
// //     <AppBar
// //       position="sticky"
// //       elevation={3}
// //       sx={{
// //         backdropFilter: "blur(15px)",
// //         backgroundColor: "rgba(255, 255, 255, 0.85)",
// //         color: "#0d47a1",
// //         fontFamily: poppins.style.fontFamily,
// //         transition: "all 0.3s ease",
// //       }}
// //     >
// //       <Toolbar
// //         sx={{
// //           display: "flex",
// //           alignItems: "center",
// //           gap: 2,
// //           px: { xs: 1, sm: 3 },
// //         }}
// //       >
// //         {/* Logo */}
// //         <Link href="/" passHref legacyBehavior>
// //           <a style={{ display: "flex", alignItems: "center", height: "100%" }}>
// //             <Image
// //               src="/logo.png"
// //               alt="AiStudy Logo"
// //               width={160}
// //               height={50}
// //               priority
// //               style={{
// //                 height: "auto",
// //                 width: "auto",
// //                 maxHeight: "60px",
// //                 objectFit: "contain",
// //                 transition: "transform 0.3s ease",
// //               }}
// //             />
// //           </a>
// //         </Link>

// //         {/* Desktop Menu */}
// //         <Box
// //           sx={{
// //             display: { xs: "none", md: "flex" },
// //             gap: 2,
// //             whiteSpace: "nowrap",
// //             overflowX: "hidden",
// //           }}
// //         >
// //           {menuItems.map((item) => (
// //             <Button
// //               key={item.text}
// //               component={Link}
// //               href={item.href}
// //               sx={{
// //                 fontWeight: 600,
// //                 color: "#0d47a1",
// //                 textTransform: "none",
// //                 borderRadius: "50px",
// //                 px: 2,
// //                 "&:hover": { bgcolor: "rgba(135,206,235,0.25)" },
// //               }}
// //             >
// //               {item.text}
// //             </Button>
// //           ))}
// //         </Box>

// //         {/* Right Side / Mobile Hamburger */}
// //         <Box
// //           sx={{
// //             display: "flex",
// //             alignItems: "center",
// //             marginLeft: "auto",
// //             gap: 1,
// //           }}
// //         >
// //           {/* Desktop Right */}
// //           <Box
// //             sx={{
// //               display: { xs: "none", md: "flex" },
// //               alignItems: "center",
// //               gap: 1,
// //             }}
// //           >
// //             {isLoggedIn && (
// //               <>
// //                 {/* Search */}
// //                 <Box
// //                   component="form"
// //                   onSubmit={handleSearch}
// //                   sx={{ display: "flex", alignItems: "center", mx: 2 }}
// //                 />

// //                 <Box sx={{ position: "relative", width: 300 }}>
// //                   <TextField
// //                     variant="outlined"
// //                     size="small"
// //                     placeholder="Search courses..."
// //                     value={searchQuery}
// //                     onChange={(e) => setSearchQuery(e.target.value)}
// //                     sx={{
// //                       backgroundColor: "rgba(135,206,235,0.2)",
// //                       borderRadius: "50px",
// //                       "& input": { fontWeight: 500 },
// //                       "& .MuiOutlinedInput-root": {
// //                         paddingRight: 0,
// //                         "& fieldset": { border: "none" },
// //                       },
// //                       "&:hover": { backgroundColor: "rgba(135,206,235,0.3)" },
// //                     }}
// //                   />
// //                   <SearchSuggestions
// //                     searchTerm={searchQuery}
// //                     setSearchTerm={setSearchQuery}
// //                   />
// //                 </Box>

// //                 <CartButtonWithBadge />
// //                 <Tooltip title="Notifications">
// //                   <IconButton
// //                     sx={{ color: "#0d47a1" }}
// //                     onClick={handleNotifClick}
// //                   >
// //                     <Badge badgeContent={notifications.length} color="error">
// //                       <NotificationsIcon />
// //                     </Badge>
// //                   </IconButton>
// //                 </Tooltip>
// //                 {isAdmin && (
// //                   <Box sx={{ display: "flex", gap: 2, whiteSpace: "nowrap" }}>
// //                     <Button
// //                       onClick={() => router.push("/addCourse")}
// //                       sx={{
// //                         fontWeight: 600,
// //                         color: "#0d47a1",
// //                         textTransform: "none",
// //                         borderRadius: "50px",
// //                         px: 2,
// //                         "&:hover": { bgcolor: "rgba(135,206,235,0.25)" },
// //                       }}
// //                     >
// //                       Add Course
// //                     </Button>
// //                     <Button
// //                       onClick={() => router.push("/manage-courses")}
// //                       sx={{
// //                         fontWeight: 600,
// //                         color: "#0d47a1",
// //                         textTransform: "none",
// //                         borderRadius: "50px",
// //                         px: 2,
// //                         "&:hover": { bgcolor: "rgba(135,206,235,0.25)" },
// //                       }}
// //                     >
// //                       Manage Courses
// //                     </Button>
// //                   </Box>
// //                 )}

// //                 <IconButton onClick={handleAvatarClick}>
// //                   <Avatar src={user?.imageUrl || ""}>
// //                     {!user?.imageUrl && user?.name?.[0]}
// //                   </Avatar>
// //                 </IconButton>
// //               </>
// //             )}

// //             {!isLoggedIn && (
// //               <>
// //                 <Button
// //                   component={Link}
// //                   href="/login"
// //                   sx={{
// //                     fontWeight: 600,
// //                     color: "#0d47a1",
// //                     textTransform: "none",
// //                     borderRadius: "50px",
// //                     px: 2,
// //                     "&:hover": { bgcolor: "rgba(135,206,235,0.25)" },
// //                   }}
// //                 >
// //                   Log In
// //                 </Button>
// //                 <Button
// //                   component={Link}
// //                   href="/register"
// //                   sx={{
// //                     fontWeight: 600,
// //                     color: "#0d47a1",
// //                     textTransform: "none",
// //                     borderRadius: "50px",
// //                     px: 2,
// //                     "&:hover": { bgcolor: "rgba(135,206,235,0.25)" },
// //                   }}
// //                 >
// //                   Sign Up
// //                 </Button>
// //               </>
// //             )}
// //           </Box>

// //           {/* Mobile Hamburger */}
// //           <Box sx={{ display: { xs: "flex", md: "none" } }}>
// //             <IconButton onClick={() => setMobileDrawerOpen(true)}>
// //               <MenuIcon sx={{ color: "#0d47a1" }} />
// //             </IconButton>
// //           </Box>
// //         </Box>

// //         {/* Notifications Menu */}
// //         <Menu
// //           anchorEl={notifAnchorEl}
// //           open={Boolean(notifAnchorEl)}
// //           onClose={handleNotifClose}
// //         >
// //           {notifications.length === 0 ? (
// //             <MenuItem disabled>No notifications</MenuItem>
// //           ) : (
// //             notifications.map((n, i) => (
// //               <MenuItem key={i} onClick={handleNotifClose}>
// //                 {n.message}
// //               </MenuItem>
// //             ))
// //           )}
// //         </Menu>

// //         {/* Avatar Menu */}
// //         <Menu
// //           anchorEl={anchorEl}
// //           open={Boolean(anchorEl)}
// //           onClose={handleMenuClose}
// //           disableScrollLock
// //           PaperProps={{
// //             sx: {
// //               bgcolor: "rgba(255,255,255,0.95)",
// //               backdropFilter: "blur(12px)",
// //               borderRadius: 2,
// //               boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
// //               minWidth: 200,
// //             },
// //           }}
// //         >
// //           <MenuItem
// //             disabled
// //             sx={{
// //               fontWeight: 600,
// //               color: "#0d47a1",
// //               cursor: "default",
// //               py: 1.2,
// //               px: 3,
// //             }}
// //           >
// //             {user?.name}
// //           </MenuItem>
// //           <Divider />
// //           <MenuItem
// //             component={Link}
// //             href="/student-profile"
// //             sx={{
// //               fontWeight: 600,
// //               color: "#0d47a1",
// //               borderRadius: "50px",
// //               px: 2,
// //               py: 1,
// //               "&:hover": { bgcolor: "rgba(135,206,235,0.25)" },
// //               display: "flex",
// //               alignItems: "center",
// //               gap: 1,
// //             }}
// //           >
// //             <AccountCircleIcon /> Account
// //           </MenuItem>
// //           <MenuItem
// //             component={Link}
// //             href="/my-enrollments"
// //             sx={{
// //               fontWeight: 600,
// //               color: "#0d47a1",
// //               borderRadius: "50px",
// //               px: 2,
// //               py: 1,
// //               "&:hover": { bgcolor: "rgba(135,206,235,0.25)" },
// //               display: "flex",
// //               alignItems: "center",
// //               gap: 1,
// //             }}
// //           >
// //             <SchoolIcon /> My Enrollments
// //           </MenuItem>
// //           <Divider />
// //           <MenuItem
// //             onClick={handleLogoutClick}
// //             sx={{
// //               fontWeight: 600,
// //               color: "#0d47a1",
// //               borderRadius: "50px",
// //               px: 2,
// //               py: 1,
// //               "&:hover": { bgcolor: "rgba(135,206,235,0.25)" },
// //               display: "flex",
// //               alignItems: "center",
// //               gap: 1,
// //             }}
// //           >
// //             <LogoutIcon /> Sign out
// //           </MenuItem>
// //         </Menu>
// //       </Toolbar>

// //       {/* Mobile Drawer */}
// //       <Drawer
// //         anchor="left"
// //         open={mobileDrawerOpen}
// //         onClose={() => setMobileDrawerOpen(false)}
// //       >
// //         <Box sx={{ width: 250, p: 2 }}>
// //           <List>
// //             {menuItems.map((item) => (
// //               <ListItem
// //                 button
// //                 key={item.text}
// //                 onClick={() => router.push(item.href)}
// //               >
// //                 <ListItemText primary={item.text} />
// //               </ListItem>
// //             ))}
// //             {isLoggedIn && (
// //               <>
// //                 <ListItem
// //                   button
// //                   onClick={() => router.push("/student-profile")}
// //                 >
// //                   Account
// //                 </ListItem>
// //                 <ListItem button onClick={() => router.push("/my-enrollments")}>
// //                   My Enrollments
// //                 </ListItem>
// //                 {isAdmin && (
// //                   <>
// //                     <ListItem button onClick={() => router.push("/addCourse")}>
// //                       Add Course
// //                     </ListItem>
// //                     <ListItem
// //                       button
// //                       onClick={() => router.push("/manage-courses")}
// //                     >
// //                       Manage Courses
// //                     </ListItem>
// //                   </>
// //                 )}
// //                 <ListItem button onClick={handleLogoutClick}>
// //                   Sign Out
// //                 </ListItem>
// //               </>
// //             )}
// //             {!isLoggedIn && (
// //               <>
// //                 <ListItem button onClick={() => router.push("/login")}>
// //                   Log In
// //                 </ListItem>
// //                 <ListItem button onClick={() => router.push("/register")}>
// //                   Sign Up
// //                 </ListItem>
// //               </>
// //             )}
// //           </List>
// //         </Box>
// //       </Drawer>
// //     </AppBar>
// //   );
// // }

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import Image from "next/image";
// import { useCart } from "@/components/CartContext";
// import SearchSuggestions from "@/components/SearchSuggestions";
// import {
//   Badge,
//   AppBar,
//   Toolbar,
//   Button,
//   Box,
//   TextField,
//   IconButton,
//   Avatar,
//   Menu,
//   MenuItem,
//   Tooltip,
//   Divider,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import SchoolIcon from "@mui/icons-material/School";
// import LogoutIcon from "@mui/icons-material/Logout";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import CartButtonWithBadge from "./CartButtonWithBadge";
// import { useNotifications } from "@/components/notificationContext";
// import { useAuth } from "@/components/AuthContext";
// import { Poppins } from "next/font/google";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
// });

// export default function Navbar() {
//   const { notifications } = useNotifications();
//   const { isLoggedIn, user, logout, isAdmin } = useAuth();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [notifAnchorEl, setNotifAnchorEl] = useState<null | HTMLElement>(null);
//   const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
//   const router = useRouter();
//   const { clearCart } = useCart();

//   const menuItems = [
//     { text: "Home", href: "/" },
//     { text: "Current Affairs", href: "/currentAffairs" },
//     { text: "Courses", href: "/courses" },
//     { text: "About Us", href: "/aboutUs" },
//     { text: "Contact Us", href: "/contactUs" },
//   ];

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
//     }
//   };

//   const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) =>
//     setAnchorEl(event.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);
//   const handleNotifClick = (event: React.MouseEvent<HTMLElement>) =>
//     setNotifAnchorEl(event.currentTarget);
//   const handleNotifClose = () => setNotifAnchorEl(null);

//   const handleLogoutClick = async () => {
//     handleMenuClose();
//     clearCart();
//     await logout();
//     router.replace("/");
//   };

//   return (
//     <AppBar
//       position="sticky"
//       elevation={3}
//       sx={{
//         backdropFilter: "blur(15px)",
//         backgroundColor: "rgba(255, 255, 255, 0.85)",
//         color: "#0d47a1",
//         fontFamily: poppins.style.fontFamily,
//         transition: "all 0.3s ease",
//       }}
//     >
//       <Toolbar
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           gap: 2,
//           px: { xs: 1, sm: 3 },
//         }}
//       >
//         {/* Logo */}
//         <Link href="/" passHref legacyBehavior>
//           <a style={{ display: "flex", alignItems: "center", height: "100%" }}>
//             <Image
//               src="/logo.png"
//               alt="AiStudy Logo"
//               width={160}
//               height={50}
//               priority
//               style={{
//                 height: "auto",
//                 width: "auto",
//                 maxHeight: "60px",
//                 objectFit: "contain",
//                 transition: "transform 0.3s ease",
//               }}
//             />
//           </a>
//         </Link>

//         {/* Desktop Menu */}
//         <Box
//           sx={{
//             display: { xs: "none", md: "flex" },
//             gap: 2,
//             whiteSpace: "nowrap",
//             overflowX: "hidden",
//             ml: 3,
//           }}
//         >
//           {menuItems.map((item) => (
//             <Button
//               key={item.text}
//               component={Link}
//               href={item.href}
//               sx={{
//                 fontWeight: 600,
//                 color: "#0d47a1",
//                 textTransform: "none",
//                 borderRadius: "50px",
//                 px: 2,
//                 "&:hover": { bgcolor: "rgba(135,206,235,0.25)" },
//               }}
//             >
//               {item.text}
//             </Button>
//           ))}
//         </Box>

//         {/* Spacer */}
//         <Box sx={{ flexGrow: 1 }} />

//         {/* Right Side */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: "auto" }}>
//           {isLoggedIn && (
//             <>
//               {/* Search + Admin Buttons */}
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 1 }}>
//                 <Box sx={{ position: "relative", width: 300, flexShrink: 1 }}>
//                   <form onSubmit={handleSearch}>
//                     <TextField
//                       variant="outlined"
//                       size="small"
//                       placeholder="Search courses..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       sx={{
//                         width: "100%",
//                         backgroundColor: "rgba(135,206,235,0.2)",
//                         borderRadius: "50px",
//                         "& input": { fontWeight: 500 },
//                         "& .MuiOutlinedInput-root": {
//                           paddingRight: 0,
//                           "& fieldset": { border: "none" },
//                         },
//                         "&:hover": { backgroundColor: "rgba(135,206,235,0.3)" },
//                       }}
//                     />
//                   </form>
//                   <SearchSuggestions searchTerm={searchQuery} setSearchTerm={setSearchQuery} />
//                 </Box>

//                 {isAdmin && (
//                   <Box sx={{ display: "flex", gap: 1 }}>
//                     <Button
//                       onClick={() => router.push("/addCourse")}
//                       sx={{
//                         fontWeight: 600,
//                         color: "#0d47a1",
//                         textTransform: "none",
//                         borderRadius: "50px",
//                         px: 2,
//                         "&:hover": { bgcolor: "rgba(135,206,235,0.25)" },
//                       }}
//                     >
//                       Add Course
//                     </Button>
//                     <Button
//                       onClick={() => router.push("/manage-courses")}
//                       sx={{
//                         fontWeight: 600,
//                         color: "#0d47a1",
//                         textTransform: "none",
//                         borderRadius: "50px",
//                         px: 2,
//                         "&:hover": { bgcolor: "rgba(135,206,235,0.25)" },
//                       }}
//                     >
//                       Manage Courses
//                     </Button>
//                   </Box>
//                 )}
//               </Box>

//               {/* Cart, Notifications & Avatar */}
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
//                 <CartButtonWithBadge />
//                 <Tooltip title="Notifications">
//                   <IconButton sx={{ color: "#0d47a1" }} onClick={handleNotifClick}>
//                     <Badge badgeContent={notifications.length} color="error">
//                       <NotificationsIcon />
//                     </Badge>
//                   </IconButton>
//                 </Tooltip>
//                 <IconButton onClick={handleAvatarClick}>
//                   <Avatar src={user?.imageUrl || ""}>
//                     {!user?.imageUrl && user?.name?.[0]}
//                   </Avatar>
//                 </IconButton>
//               </Box>
//             </>
//           )}

//           {!isLoggedIn && (
//             <>
//               <Button
//                 component={Link}
//                 href="/login"
//                 sx={{
//                   fontWeight: 600,
//                   color: "#0d47a1",
//                   textTransform: "none",
//                   borderRadius: "50px",
//                   px: 2,
//                   "&:hover": { bgcolor: "rgba(135,206,235,0.25)" },
//                 }}
//               >
//                 Log In
//               </Button>
//               <Button
//                 component={Link}
//                 href="/register"
//                 sx={{
//                   fontWeight: 600,
//                   color: "#0d47a1",
//                   textTransform: "none",
//                   borderRadius: "50px",
//                   px: 2,
//                   "&:hover": { bgcolor: "rgba(135,206,235,0.25)" },
//                 }}
//               >
//                 Sign Up
//               </Button>
//             </>
//           )}

//           {/* Mobile Hamburger */}
//           <Box sx={{ display: { xs: "flex", md: "none" } }}>
//             <IconButton onClick={() => setMobileDrawerOpen(true)}>
//               <MenuIcon sx={{ color: "#0d47a1" }} />
//             </IconButton>
//           </Box>
//         </Box>

//         {/* Notifications Menu */}
//         <Menu
//           anchorEl={notifAnchorEl}
//           open={Boolean(notifAnchorEl)}
//           onClose={handleNotifClose}
//         >
//           {notifications.length === 0 ? (
//             <MenuItem disabled>No notifications</MenuItem>
//           ) : (
//             notifications.map((n, i) => (
//               <MenuItem key={i} onClick={handleNotifClose}>
//                 {n.message}
//               </MenuItem>
//             ))
//           )}
//         </Menu>

//         {/* Avatar Menu */}
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleMenuClose}
//           disableScrollLock
//           PaperProps={{
//             sx: {
//               bgcolor: "rgba(255,255,255,0.95)",
//               backdropFilter: "blur(12px)",
//               borderRadius: 2,
//               boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
//               minWidth: 200,
//             },
//           }}
//         >
//           <MenuItem
//             disabled
//             sx={{
//               fontWeight: 600,
//               color: "#0d47a1",
//               cursor: "default",
//               py: 1.2,
//               px: 3,
//             }}
//           >
//             {user?.name}
//           </MenuItem>
//           <Divider />
//           <MenuItem
//             component={Link}
//             href="/student-profile"
//             sx={{
//               fontWeight: 600,
//               color: "#0d47a1",
//               borderRadius: "50px",
//               px: 2,
//               py: 1,
//               "&:hover": { bgcolor: "rgba(135,206,235,0.25)" },
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//             }}
//           >
//             <AccountCircleIcon /> Account
//           </MenuItem>
//           <MenuItem
//             component={Link}
//             href="/my-enrollments"
//             sx={{
//               fontWeight: 600,
//               color: "#0d47a1",
//               borderRadius: "50px",
//               px: 2,
//               py: 1,
//               "&:hover": { bgcolor: "rgba(135,206,235,0.25)" },
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//             }}
//           >
//             <SchoolIcon /> My Enrollments
//           </MenuItem>
//           <Divider />
//           <MenuItem
//             onClick={handleLogoutClick}
//             sx={{
//               fontWeight: 600,
//               color: "#0d47a1",
//               borderRadius: "50px",
//               px: 2,
//               py: 1,
//               "&:hover": { bgcolor: "rgba(135,206,235,0.25)" },
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//             }}
//           >
//             <LogoutIcon /> Sign out
//           </MenuItem>
//         </Menu>
//       </Toolbar>

//       {/* Mobile Drawer */}
//       <Drawer
//         anchor="left"
//         open={mobileDrawerOpen}
//         onClose={() => setMobileDrawerOpen(false)}
//       >
//         <Box sx={{ width: 250, p: 2 }}>
//           <List>
//             {menuItems.map((item) => (
//               <ListItem
//                 button
//                 key={item.text}
//                 onClick={() => router.push(item.href)}
//               >
//                 <ListItemText primary={item.text} />
//               </ListItem>
//             ))}
//             {isLoggedIn && (
//               <>
//                 <ListItem
//                   button
//                   onClick={() => router.push("/student-profile")}
//                 >
//                   Account
//                 </ListItem>
//                 <ListItem button onClick={() => router.push("/my-enrollments")}>
//                   My Enrollments
//                 </ListItem>
//                 {isAdmin && (
//                   <>
//                     <ListItem button onClick={() => router.push("/addCourse")}>
//                       Add Course
//                     </ListItem>
//                     <ListItem
//                       button
//                       onClick={() => router.push("/manage-courses")}
//                     >
//                       Manage Courses
//                     </ListItem>
//                   </>
//                 )}
//                 <ListItem button onClick={handleLogoutClick}>
//                   Sign Out
//                 </ListItem>
//               </>
//             )}
//             {!isLoggedIn && (
//               <>
//                 <ListItem button onClick={() => router.push("/login")}>
//                   Log In
//                 </ListItem>
//                 <ListItem button onClick={() => router.push("/register")}>
//                   Sign Up
//                 </ListItem>
//               </>
//             )}
//           </List>
//         </Box>
//       </Drawer>
//     </AppBar>
//   );
// }


"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import SearchSuggestions from "@/components/SearchSuggestions";
import {
  Badge,
  AppBar,
  Toolbar,
  Button,
  Box,
  TextField,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SchoolIcon from "@mui/icons-material/School";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CartButtonWithBadge from "./CartButtonWithBadge";
import { useNotifications } from "@/components/notificationContext";
import { useAuth } from "@/components/AuthContext";
import { Poppins } from "next/font/google";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Navbar() {
  const { notifications } = useNotifications();
  const { isLoggedIn, user, logout, isAdmin } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const router = useRouter();
  const { clearCart } = useCart();

  const menuItems = [
    { text: "Home", href: "/" },
    { text: "Current Affairs", href: "/currentAffairs" },
    { text: "Courses", href: "/courses" },
    { text: "About Us", href: "/aboutUs" },
    { text: "Contact Us", href: "/contactUs" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleNotifClick = (event: React.MouseEvent<HTMLElement>) =>
    setNotifAnchorEl(event.currentTarget);
  const handleNotifClose = () => setNotifAnchorEl(null);

  const handleLogoutClick = async () => {
    handleMenuClose();
    clearCart();
    await logout();
    router.replace("/");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: "blur(15px)",
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        color: "#0d47a1",
        fontFamily: poppins.style.fontFamily,
        transition: "all 0.3s ease",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          px: { xs: 1, sm: 3 },
        }}
      >
        {/* Logo */}
        <Link href="/" passHref legacyBehavior>
          <a style={{ display: "flex", alignItems: "center", height: "100%" }}>
            <Image
              src="/logo.png"
              alt="AiStudy Logo"
              width={160}
              height={50}
              priority
              style={{
                height: "auto",
                width: "auto",
                maxHeight: "60px",
                objectFit: "contain",
                transition: "transform 0.3s ease",
              }}
            />
          </a>
        </Link>

        {/* Desktop Menu */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 2,
            whiteSpace: "nowrap",
            overflowX: "hidden",
            ml: 3,
          }}
        >
          {menuItems.map((item) => (
            <Button
              key={item.text}
              component={Link}
              href={item.href}
              sx={{
                fontWeight: 600,
                color: "#0d47a1",
                textTransform: "none",
                borderRadius: "50px",
                px: 2,
                "&:hover": { bgcolor: "rgba(135,206,235,0.25)" },
              }}
            >
              {item.text}
            </Button>
          ))}
        </Box>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Right Side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: "auto" }}>
          {isLoggedIn && (
            <>
              {/* Search */}
              <Box sx={{ position: "relative", width: 300, flexShrink: 1 }}>
                <form onSubmit={handleSearch}>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{
                      width: "100%",
                      backgroundColor: "rgba(135,206,235,0.2)",
                      borderRadius: "50px",
                      "& input": { fontWeight: 500 },
                      "& .MuiOutlinedInput-root": {
                        paddingRight: 0,
                        "& fieldset": { border: "none" },
                      },
                      "&:hover": { backgroundColor: "rgba(135,206,235,0.3)" },
                    }}
                  />
                </form>
                <SearchSuggestions searchTerm={searchQuery} setSearchTerm={setSearchQuery} />
              </Box>

              {/* Cart, Notifications & Avatar */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
                <CartButtonWithBadge />
                <Tooltip title="Notifications">
                  <IconButton sx={{ color: "#0d47a1" }} onClick={handleNotifClick}>
                    <Badge badgeContent={notifications.length} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <IconButton onClick={handleAvatarClick}>
                  <Avatar src={user?.imageUrl || ""}>
                    {!user?.imageUrl && user?.name?.[0]}
                  </Avatar>
                </IconButton>
              </Box>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Button
                component={Link}
                href="/login"
                sx={{
                  fontWeight: 600,
                  color: "#0d47a1",
                  textTransform: "none",
                  borderRadius: "50px",
                  px: 2,
                  "&:hover": { bgcolor: "rgba(135,206,235,0.25)" },
                }}
              >
                Log In
              </Button>
              <Button
                component={Link}
                href="/register"
                sx={{
                  fontWeight: 600,
                  color: "#0d47a1",
                  textTransform: "none",
                  borderRadius: "50px",
                  px: 2,
                  "&:hover": { bgcolor: "rgba(135,206,235,0.25)" },
                }}
              >
                Sign Up
              </Button>
            </>
          )}

          {/* Mobile Hamburger */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={() => setMobileDrawerOpen(true)}>
              <MenuIcon sx={{ color: "#0d47a1" }} />
            </IconButton>
          </Box>
        </Box>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notifAnchorEl}
          open={Boolean(notifAnchorEl)}
          onClose={handleNotifClose}
        >
          {notifications.length === 0 ? (
            <MenuItem disabled>No notifications</MenuItem>
          ) : (
            notifications.map((n, i) => (
              <MenuItem key={i} onClick={handleNotifClose}>
                {n.message}
              </MenuItem>
            ))
          )}
        </Menu>

        {/* Avatar Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          disableScrollLock
          PaperProps={{
            sx: {
              bgcolor: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(12px)",
              borderRadius: 2,
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              minWidth: 200,
            },
          }}
        >
          <MenuItem disabled sx={{ fontWeight: 600, color: "#0d47a1", cursor: "default", py: 1.2, px: 3 }}>
            {user?.name}
          </MenuItem>
          <Divider />
          <MenuItem component={Link} href="/student-profile" sx={{ fontWeight: 600, color: "#0d47a1", borderRadius: "50px", px: 2, py: 1, "&:hover": { bgcolor: "rgba(135,206,235,0.25)" }, display: "flex", alignItems: "center", gap: 1 }}>
            <AccountCircleIcon /> Account
          </MenuItem>
          <MenuItem component={Link} href="/my-enrollments" sx={{ fontWeight: 600, color: "#0d47a1", borderRadius: "50px", px: 2, py: 1, "&:hover": { bgcolor: "rgba(135,206,235,0.25)" }, display: "flex", alignItems: "center", gap: 1 }}>
            <SchoolIcon /> My Enrollments
          </MenuItem>

    {isAdmin && (
  <>
    <MenuItem
      component={Link}
      href="/addCourse"
      sx={{
        fontWeight: 600,
        color: "#0d47a1",
        borderRadius: "50px",
        px: 2,
        py: 1,
        "&:hover": { bgcolor: "rgba(135,206,235,0.25)" },
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      {/* Replace AddCourseIcon with your icon component */}
      <LibraryAddIcon /> Add Course
    </MenuItem>
    <MenuItem
      component={Link}
      href="/manage-courses"
      sx={{
        fontWeight: 600,
        color: "#0d47a1",
        borderRadius: "50px",
        px: 2,
        py: 1,
        "&:hover": { bgcolor: "rgba(135,206,235,0.25)" },
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      {/* Replace ManageCourseIcon with your icon component */}
      <ManageAccountsIcon /> Manage Courses
    </MenuItem>
  </>
)}


          <Divider />
          <MenuItem onClick={handleLogoutClick} sx={{ fontWeight: 600, color: "#0d47a1", borderRadius: "50px", px: 2, py: 1, "&:hover": { bgcolor: "rgba(135,206,235,0.25)" }, display: "flex", alignItems: "center", gap: 1 }}>
            <LogoutIcon /> Sign out
          </MenuItem>
        </Menu>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileDrawerOpen} onClose={() => setMobileDrawerOpen(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.text} onClick={() => router.push(item.href)}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            {isLoggedIn && (
              <>
                <ListItem button onClick={() => router.push("/student-profile")}>Account</ListItem>
                <ListItem button onClick={() => router.push("/my-enrollments")}>My Enrollments</ListItem>
                {isAdmin && (
                  <>
                    <ListItem button onClick={() => router.push("/addCourse")}>Add Course</ListItem>
                    <ListItem button onClick={() => router.push("/manage-courses")}>Manage Courses</ListItem>
                  </>
                )}
                <ListItem button onClick={handleLogoutClick}>Sign Out</ListItem>
              </>
            )}
            {!isLoggedIn && (
              <>
                <ListItem button onClick={() => router.push("/login")}>Log In</ListItem>
                <ListItem button onClick={() => router.push("/register")}>Sign Up</ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
