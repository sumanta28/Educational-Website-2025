"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Link,
  Card,
  CardContent,
  Divider,
  Grid,
  Avatar,
} from "@mui/material";
import { Client, Account, ID } from "appwrite";

// 🔹 Environment variables
const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;

// 🔹 Appwrite client setup
const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);
const account = new Account(client);

const Register: React.FC = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  // 🔹 Auto-update full name
  useEffect(() => {
    setFullName(`${firstName.trim()} ${lastName.trim()}`.trim());
  }, [firstName, lastName]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Create Appwrite user
      await account.create(ID.unique(), email, password, fullName);

      setSuccess(true);

      // 2️⃣ Redirect to login page after 2 seconds
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: any) {
      console.error("Appwrite Error:", err);
      if (err?.code === 409) {
        setError("This email is already registered. Please login.");
      } else {
        setError(err.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        p: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          width: "100%",
          borderRadius: 4,
          boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
          backdropFilter: "blur(10px)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            align="center"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#333" }}
          >
            Create Your Account
          </Typography>
          <Typography
            variant="body2"
            align="center"
            sx={{ mb: 3, color: "text.secondary" }}
          >
            Fill in the details to get started
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {loading && (
            <Box display="flex" justifyContent="center" my={3}>
              <CircularProgress />
            </Box>
          )}
          {success && !loading && (
            <Alert severity="success" sx={{ mb: 2 }}>
              🎉 Registration successful! Redirecting to login...
            </Alert>
          )}

          {!success && !loading && (
            <form onSubmit={handleRegister}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </Grid>
              </Grid>

              <TextField
                margin="normal"
                fullWidth
                label="Full Name"
                value={fullName}
                InputProps={{ readOnly: true }}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <TextField
                margin="normal"
                fullWidth
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Box mt={2} textAlign="center">
                <Button
                  variant="outlined"
                  component="label"
                  sx={{ borderRadius: 3, px: 3, mb: 1 }}
                  fullWidth
                >
                  Upload Profile Picture
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                  />
                </Button>

                {image && (
                  <Box
                    mt={2}
                    display="flex"
                    alignItems="center"
                    gap={2}
                    justifyContent="center"
                  >
                    <Avatar
                      src={URL.createObjectURL(image)}
                      sx={{ width: 48, height: 48 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {image.name}
                    </Typography>
                  </Box>
                )}
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  py: 1.3,
                  borderRadius: 3,
                  fontWeight: "bold",
                  textTransform: "none",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  ":hover": {
                    background:
                      "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                  },
                }}
              >
                Register
              </Button>
            </form>
          )}
          <Box mt={2} textAlign="center"></Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" align="center" color="text.secondary">
            Already have an account?{" "}
            <Link
              component="button"
              underline="hover"
              onClick={() => router.push("/login")}
              sx={{ fontWeight: "bold" }}
            >
              Login
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
