import type { Metadata } from "next";

import Hero from "@/app/_components/hero";

export const metadata: Metadata = {
  title: "Perawatan & Reparasi Sepatu Terbaik",
};

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <div className="container my-24 flex flex-col gap-6">
        <h1 className="font-heading text-5xl">
          An example app built using Next.js 13 server components.
        </h1>
        <p className="text-base text-black">Geist</p>
      </div>
    </main>
  );
}
