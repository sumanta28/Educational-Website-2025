import { Box, Typography, Link as MuiLink, IconButton } from "@mui/material";
import { Poppins } from "next/font/google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Footer() {
  const links = [
    { text: "Home", href: "/" },
    { text: "About Us", href: "/aboutUs" },
    { text: "Contact Us", href: "/contactUs" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        px: { xs: 3, sm: 6 },
        py: 6,
        backdropFilter: "blur(15px)",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        color: "#0d47a1",
        fontFamily: poppins.style.fontFamily,
        borderTop: "1px solid rgba(0,0,0,0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: 4,
          alignItems: "stretch",
        }}
      >
        {/* Left Column: Logo + Social (top aligned) */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // center horizontally
            gap: 3,
          }}
        >
          <Box sx={{ height: { xs: 70, md: 100 } }}>
             <MuiLink href="/" underline="none">
    <img
      src="/logo.png"
      alt="AiStudy Logo"
      style={{ height: "100%", objectFit: "contain", cursor: "pointer" }}
    />
  </MuiLink>
          </Box>
        </Box>

        {/* Middle Column: Links + Social Icons (top aligned) */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // center horizontally
            gap: 2,
          }}
        >
          {/* Row 1: Quick Links */}
          <Box sx={{ display: "flex", gap: 3 }}>
            {links.map((link) => (
              <MuiLink
                key={link.text}
                href={link.href}
                sx={{
                  color: "#0d47a1",
                  fontWeight: 600,
                  textDecoration: "none",
                  fontSize: { xs: 14, sm: 16 },
                  "&:hover": {
                    color: "#1976d2",
                    transform: "scale(1.05)",
                    transition: "all 0.2s ease",
                  },
                }}
              >
                {link.text}
              </MuiLink>
            ))}
          </Box>

          {/* Row 2: Social Icons */}
          <Box sx={{ display: "flex", gap: 1.5 }}>
            {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon].map(
              (Icon, i) => (
                <IconButton
                  key={i}
                  href="#"
                  sx={{
                    color: "#0d47a1",
                    "&:hover": { color: "#1976d2", transform: "scale(1.15)" },
                    transition: "all 0.2s ease",
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              )
            )}
          </Box>
        </Box>

        {/* Right Column: Contact + Map (centered vertically) */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Contact Info */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocationOnIcon sx={{ color: "#0d47a1", fontSize: 18 }} />
              <Typography sx={{ fontSize: { xs: 12, sm: 13 } }}>
                Rajarhat, Kolkata
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneIcon sx={{ color: "#0d47a1", fontSize: 18 }} />
              <Typography sx={{ fontSize: { xs: 12, sm: 13 } }}>
                +91 7044774424
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EmailIcon sx={{ color: "#0d47a1", fontSize: 18 }} />
              <Typography sx={{ fontSize: { xs: 12, sm: 13 } }}>
                sumanta2k16@gmail.com
              </Typography>
            </Box>
          </Box>

          {/* Map */}
          <Box
            sx={{
              width: "100%",
              maxWidth: 250,
              height: 250,
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              mt: 1,
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d24774.733370505415!2d88.44493540326435!3d22.62445957761513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1756774841162!5m2!1sen!2sin"
              width="250"
              height="250"
              style={{
                border: "3px solid #1e88e5", // all four sides
                borderRadius: "16px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                display: "block",
                marginBottom: "10px", // ensure bottom border is visible
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Box>
        </Box>
      </Box>

      {/* Copyright */}
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          mt: 4,
          fontSize: { xs: 11, sm: 12 },
          textAlign: "center",
        }}
      >
        &copy; {new Date().getFullYear()} AiStudy. All rights reserved.
      </Typography>
    </Box>
  );
}
