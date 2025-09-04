// import { createContext, useContext, useState, useEffect } from "react";
// import type { Models } from "appwrite";
// import { toast } from "sonner"; // ✅ Import Sonner

// type Course = Models.Document & {
//   title?: string;
//   description?: string;
//   Price?: number;
//   ImageUrl?: string;
// };

// type CartContextType = {
//   cart: Course[];
//   addToCart: (course: Course) => void;
//   removeFromCart: (courseId: string) => void;
//   clearCart: () => void;
//   lastAdded?: Course;
// };

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export function CartProvider({ children }: { children: React.ReactNode }) {
//   const [cart, setCart] = useState<Course[]>([]);
//   const [lastAdded, setLastAdded] = useState<Course | undefined>(undefined);

//   // Load cart from localStorage on mount
//   useEffect(() => {
//     const stored = localStorage.getItem("cart");
//     if (stored) setCart(JSON.parse(stored));
//   }, []);

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   function addToCart(course: Course) {
//     if (cart.find((c) => c.$id === course.$id)) return;

//     setCart([...cart, course]);
//     setLastAdded(course);

//     // ✅ Show Sonner toast
//     toast.success(`${course.title} added to cart!`);
//   }

//   function removeFromCart(courseId: string) {
//     const removed = cart.find((c) => c.$id === courseId);
//     setCart(cart.filter((c) => c.$id !== courseId));

//     if (removed) {
//       toast(`${removed.title} removed from cart`, { action: { label: "Undo", onClick: () => addToCart(removed) } });
//     }
//   }

//   function clearCart() {
//     setCart([]);
//     toast("Cart cleared!");
//   }

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, lastAdded }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   const ctx = useContext(CartContext);
//   if (!ctx) throw new Error("useCart must be used within CartProvider");
//   return ctx;
// }


import { createContext, useContext, useState, useEffect } from "react";
import type { Models } from "appwrite";
import { toast } from "sonner";

type Course = Models.Document & {
  title?: string;
  description?: string;
  Price?: number;
  ImageUrl?: string;
};

type CartContextType = {
  cart: Course[];
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;
  lastAdded?: Course;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Course[]>([]);
  const [lastAdded, setLastAdded] = useState<Course | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cart");
      if (stored) setCart(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  function addToCart(course: Course) {
    if (cart.find((c) => c.$id === course.$id)) return;
    setCart([...cart, course]);
    setLastAdded(course);
    toast.success(`${course.title} added to cart!`);
  }

  function removeFromCart(courseId: string) {
    const removed = cart.find((c) => c.$id === courseId);
    setCart(cart.filter((c) => c.$id !== courseId));
    if (removed) {
      toast(`${removed.title} removed from cart`, {
        action: { label: "Undo", onClick: () => addToCart(removed) },
      });
    }
  }

  function clearCart() {
    setCart([]);
    toast("Cart cleared!");
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, lastAdded }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
