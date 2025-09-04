"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { account } from "@/lib/appwrite";
import { Box, Card, CardContent, Typography, TextField, Button, Alert } from "@mui/material";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = searchParams.get("userId") || "";
  const secret = searchParams.get("secret") || "";

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await account.updateRecovery(userId, secret, password);
      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 3000);
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
            Reset Password
          </Typography>

          {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleResetPassword}>
            <TextField
              label="New Password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              Reset Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
