import LoadingOverlay from "@/components/LoadingOverlay";
import { LoadingProvider } from "@/contexts/LoadingContext";
import React from "react";
export default function MainLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <LoadingProvider>
      {children}
    </LoadingProvider>
  );
}


