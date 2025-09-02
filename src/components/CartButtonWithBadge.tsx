import { IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "./CartContext";
import { useRouter } from "next/router";

export default function CartButtonWithBadge() {
  const { cart } = useCart();
  const router = useRouter();

  return (
    <IconButton
      color="inherit"
      onClick={() => router.push("/cart")}
      aria-label="cart"
      sx={{ ml: 2 }}
    >
      <Badge badgeContent={cart.length} color="primary">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
}
