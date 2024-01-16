import type { Metadata } from "next";
import { allArticles } from "contentlayer/generated";

import Hero from "@/app/_components/hero";
import RecentArticles from "@/app/_components/recent-articles";

export const metadata: Metadata = {
  title: "Perawatan & Reparasi Sepatu Terbaik",
};

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <RecentArticles articles={allArticles} />
    </main>
  );
}
