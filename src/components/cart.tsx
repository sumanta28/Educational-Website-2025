import { useCart } from "@/components/CartContext";
import { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  CardContent,
  CardMedia,
  Container,
  Paper,
} from "@mui/material";
import { toast } from "sonner";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, lastAdded } = useCart();

  const totalPrice = cart.reduce(
    (sum, course) =>
      sum + (typeof course.Price === "number" ? course.Price : 0),
    0
  );

  // Trigger Sonner toast when a course is added
  useEffect(() => {
    if (lastAdded) {
      toast.success(`${lastAdded.title} added to cart!`);
    }
  }, [lastAdded]);

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #87CEEB, #ffffff)",
        minHeight: "100vh",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          textAlign="center"
          color="#003366"
          gutterBottom
        >
          Your Cart
        </Typography>
        <Typography variant="h6" textAlign="center" color="#333" mb={4}>
          You have {cart.length} {cart.length === 1 ? "item" : "items"} in your
          cart
        </Typography>

        {cart.length > 0 && (
          <Typography variant="h5" mb={3} color="#003366" textAlign="center">
            Total Price: ${totalPrice}
          </Typography>
        )}

        {cart.length === 0 ? (
          <Typography variant="h6" textAlign="center" color="#555">
            Your cart is empty.
          </Typography>
        ) : (
          <>
            <Box textAlign="center" mb={3}>
              <Button
                color="error"
                variant="contained"
                onClick={clearCart}
                sx={{ borderRadius: "50px", px: 4, py: 1.5, fontWeight: 600 }}
              >
                Clear Cart
              </Button>
            </Box>

            <Box display="grid" gap={3}>
              {cart.map((course) => (
                <Paper
                  key={course.$id}
                  elevation={5}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    overflow: "hidden",
                    borderRadius: 3,
                  }}
                >
                  {course.ImageUrl && (
                    <CardMedia
                      component="img"
                      image={course.ImageUrl}
                      alt={course.title ?? "Course"}
                      sx={{
                        width: { xs: "100%", sm: 200 },
                        objectFit: "cover",
                        maxHeight: 200,
                      }}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography variant="h6" color="#003366" gutterBottom>
                      {course.title}
                    </Typography>
                    <Typography variant="body2" color="#333" mb={2}>
                      {course.description}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="#003366"
                    >
                      {typeof course.Price === "number"
                        ? `Price: $${course.Price}`
                        : "No price"}
                    </Typography>
                    <Button
                      color="secondary"
                      variant="outlined"
                      onClick={() => removeFromCart(course.$id)}
                      sx={{ mt: 2, borderRadius: "50px", fontWeight: 600 }}
                    >
                      Remove
                    </Button>
                  </CardContent>
                </Paper>
              ))}
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}
