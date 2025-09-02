"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Slide,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";

// Custom MUI theme (same as About page)
const theme = createTheme({
  palette: {
    primary: { main: "#003366" },
    background: { default: "#ffffff", paper: "#e6f0ff" },
    text: { primary: "#000000", secondary: "#333333" },
  },
  typography: { fontFamily: "Roboto, Arial, sans-serif" },
});

const ContactUs: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, phone, message });

    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setShowSnackbar(true);
  };

  useEffect(() => {
    if (showSnackbar) {
      const timer = setTimeout(() => setShowSnackbar(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showSnackbar]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          background: "linear-gradient(to bottom, #87CEEB, #ffffff)",
          minHeight: "100vh",
          py: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={6}
            sx={{
              p: 5,
              borderRadius: 3,
              backgroundColor: "background.paper",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              },
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              Contact Us
            </Typography>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Phone"
                variant="outlined"
                type="tel"
                fullWidth
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.5,
                  fontSize: "1rem",
                  background: "linear-gradient(to right, #003366, #2575fc)",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: 2,
                  "&:hover": {
                    background: "linear-gradient(to right, #2575fc, #003366)",
                  },
                }}
              >
                Send Message
              </Button>
            </form>
          </Paper>

          {/* Custom Snackbar / Toast */}
          <Slide direction="left" in={showSnackbar} mountOnEnter unmountOnExit>
            <Box
              sx={{
                position: "fixed",
                bottom: 24,
                right: 24,
                background: "#003366",
                color: "#fff",
                px: 3,
                py: 1.5,
                borderRadius: 2,
                boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                fontWeight: "bold",
              }}
            >
              Message sent successfully!
            </Box>
          </Slide>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ContactUs;
