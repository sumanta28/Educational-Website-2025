// import "@/styles/globals.css";
// import type { AppProps } from "next/app";
// import { CartProvider } from "@/components/CartContext"; // import your provider
// import { AuthProvider } from "@/components/AuthContext";
// import { Toaster } from "sonner";
// import { NotificationProvider } from "../components/notificationContext";
// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <AuthProvider>
//       <CartProvider>
//         <NotificationProvider>
//           <Component {...pageProps} />
//         </NotificationProvider>
//         <Toaster richColors position="bottom-right" />
//       </CartProvider>
//     </AuthProvider>
//   );
// }


import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CartProvider } from "@/components/CartContext";
import { AuthProvider } from "@/components/AuthContext";
import { Toaster } from "sonner";
import { NotificationProvider } from "../components/notificationContext";

// TanStack Query imports
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  // Create the QueryClient once
  const [queryClient] = useState(() => new QueryClient());

  return (
    <AuthProvider>
      <CartProvider>
        <NotificationProvider>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </NotificationProvider>
        <Toaster richColors position="bottom-right" />
      </CartProvider>
    </AuthProvider>
  );
}
