import React from "react";
import Header from "@/components/dashboard/Header";
export default function MainLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header />
      {/* Include shared UI here e.g. a header or sidebar */}
      {children}
    </section>
  );
}
