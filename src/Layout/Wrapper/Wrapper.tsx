import React, { ReactNode } from "react";
import dynamic from "next/dynamic";

// Dynamic imports with a loading placeholder
const Header = dynamic(() => import("../Header/Header"), {
  loading: () => <p>Loading Header...</p>,
});
const Footer = dynamic(() => import("../Footer/Footer"), {
  loading: () => <p>Loading Footer...</p>,
});

interface WrapperProps {
  children: ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  return (
    <>
      <Header />
      {children} {/* Children content */}
      <Footer />
    </>
  );
}

