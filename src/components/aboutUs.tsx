"use client";

import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Avatar,
  Paper,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const team: TeamMember[] = [
  {
    name: "Sumanta Chowdhury",
    role: "Founder & CEO",
    image: "/team/sumanta.jpg",
    bio: "Passionate about technology and innovation, leading the company with vision and dedication. Sumanta believes in building products that make a difference in people's lives.",
  },
  {
    name: "Samik Banerjee",
    role: "CTO",
    image: "/team/Samik.jpg",
    bio: "Expert in software architecture and development, ensuring our solutions are scalable and modern. Samik focuses on integrating the latest technologies for efficient solutions.",
  },
  {
    name: "Bishal",
    role: "Designer",
    image: "/team/Bishal.jpg",
    bio: "Creating beautiful and user-friendly designs that enhance user experience. Bishal combines creativity and usability to make our products intuitive and engaging.",
  },
];

// Custom MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#003366", // deep blue
    },
    background: {
      default: "#ffffff",
      paper: "#e6f0ff",
    },
    text: {
      primary: "#000000",
      secondary: "#333333",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

const About: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Gradient Background */}
      <Box
        sx={{
          background: "linear-gradient(to bottom, #87CEEB, #ffffff)",
          minHeight: "100vh",
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          {/* Page Header */}
          <Box textAlign="center" mb={6}>
            <Typography variant="h3" component="h1" gutterBottom color="primary">
              About Us
            </Typography>
            <Typography variant="h6" color="text.secondary" maxWidth={600} mx="auto">
              We are a team of passionate professionals committed to delivering innovative, high-quality solutions that drive success and make a positive impact.
            </Typography>
          </Box>

          {/* Cards: Our Story, Mission, Vision */}
          <Grid container spacing={4} mb={8}>
            <Grid size={{xs:12, md:4}}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  backgroundColor: "background.paper",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": { transform: "translateY(-5px)", boxShadow: "0 8px 20px rgba(0,0,0,0.2)" },
                }}
              >
                <Typography variant="h5" gutterBottom color="primary">
                  Our Story
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Founded in 2025, our company was born from a desire to bridge the gap between technology and business. We focus on creating innovative solutions that empower our clients, optimize operations, and foster growth.
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{xs:12, md:4}}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  backgroundColor: "background.paper",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": { transform: "translateY(-5px)", boxShadow: "0 8px 20px rgba(0,0,0,0.2)" },
                }}
              >
                <Typography variant="h5" gutterBottom color="primary">
                  Our Mission
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  To provide innovative, reliable, and efficient solutions that exceed our clients’ expectations, foster growth, and create meaningful impact. We combine creativity, technology, and expertise to transform ideas into successful realities.
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{xs:12, md:4}}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  backgroundColor: "background.paper",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": { transform: "translateY(-5px)", boxShadow: "0 8px 20px rgba(0,0,0,0.2)" },
                }}
              >
                <Typography variant="h5" gutterBottom color="primary">
                  Our Vision
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  To be a globally recognized technology company known for delivering innovative, scalable, and sustainable solutions. We aim to empower businesses and individuals through cutting-edge products and services.
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Meet the Team Section */}
          <Box mb={8}>
            <Typography variant="h4" gutterBottom textAlign="center" color="primary">
              Meet the Team
            </Typography>
            <Grid container spacing={4} mt={2}>
              {team.map((member) => (
                <Grid size={{xs:12, sm:6, md:4}} key={member.name}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 4,
                      textAlign: "center",
                      backgroundColor: "background.paper",
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": { transform: "translateY(-5px)", boxShadow: "0 8px 20px rgba(0,0,0,0.2)" },
                    }}
                  >
                    <Avatar
                      src={member.image}
                      alt={member.name}
                      sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
                    />
                    <Typography variant="h6" color="primary">
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" mb={1}>
                      {member.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.bio}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default About;
