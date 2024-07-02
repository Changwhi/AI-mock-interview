import React from "react";
export default function MainLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {

  return (
    <section>
      <div className="mx-5 md:mx-20 lg:mx-36 flex justify-center">{children}</div>
    </section>
  );
}
