import { WebcamProvider } from '@/contexts/WebCamContext';
import React from "react";
export default function MainLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <WebcamProvider>
      {children}
    </WebcamProvider>
  );
}

