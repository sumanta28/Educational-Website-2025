"use client";

import { useState } from "react";
import { account } from "@/lib/appwrite";
import { Box, Card, CardContent, Typography, TextField, Button, Alert } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await account.createRecovery(email, "http://localhost:3000/reset-password");
      setMessage("Password recovery email sent! Check your inbox.");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        p: 2,
      }}
    >
      <Card sx={{ width: 400, p: 3, borderRadius: 2, boxShadow: 5 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}>
            Forgot Password
          </Typography>

          {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleForgotPassword}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                py: 1.2,
                fontWeight: "bold",
                fontSize: "1rem",
                borderRadius: 2,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
              }}
            >
              Send Recovery Email
            </Button>
          </form>

          <Typography
            sx={{ mt: 2, textAlign: "center", cursor: "pointer", color: "#667eea" }}
            onClick={() => router.push("/login")}
          >
            Back to Login
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
