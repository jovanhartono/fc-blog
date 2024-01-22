import type { Metadata } from "next";
import { allArticles } from "contentlayer/generated";

import FeaturedArticle from "@/app/_components/home/featured-article";
import RecentArticles from "@/app/_components/home/recent-articles";
import TagList from "@/app/_components/home/tag-list";

export const metadata: Metadata = {
  title: "Perawatan & Reparasi Sepatu Terbaik",
};

export default function Home() {
  return (
    <main>
      <section className="container flex w-full flex-col gap-12">
        <div className="space-y-6">
          <dl className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <dt className="heading-primary shrink-0 basis-1/2">
              Fresclean Archives
            </dt>
            <dd className="basis-1/2 text-gray-700 dark:text-light">
              Dive into our blog for expert tips, hacks, and insightful guides
              on keeping your favorite pairs looking fresh and fabulous 🌟
            </dd>
          </dl>

          <hr className="h-0.5 w-full bg-dark" />

          <TagList />
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <FeaturedArticle article={allArticles[0]} />
          <RecentArticles articles={allArticles} />
        </div>
      </section>
    </main>
  );
}
