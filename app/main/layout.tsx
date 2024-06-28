import React from "react";
import Header from "@/components/main/Header";
export default function MainLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header />
      {/* Include shared UI here e.g. a header or sidebar */}
      <div className="mx-5 md:mx-20 lg:mx-36">{children}</div>
    </section>
  );
}
