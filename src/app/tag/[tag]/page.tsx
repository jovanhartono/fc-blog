import { Suspense } from "react";
import { Metadata } from "next";
import { allArticles } from "contentlayer/generated";
import { slug } from "github-slugger";

import ArticlePagination from "@/app/_components/article-pagination";
import TagList from "@/app/_components/home/tag-list";
import Search from "@/app/_components/search";

export async function generateStaticParams() {
  return Array.from(
    allArticles.reduce(
      (tagSet, article) => {
        article.tags.forEach((tag) => tagSet.add(slug(tag)));
        return tagSet;
      },
      new Set(["all"]),
    ),
  ).map((tag) => ({ tag: tag.toLowerCase() }));
}

export const metadata: Metadata = {
  title: "Kategori Artikel",
  description: `Pelajari lebih lanjut tentang melalui artikel terbaik kami`,
};

function filteredArticles(tag: string, search?: string) {
  const articles = search
    ? allArticles.filter((article) =>
        article.title.toLowerCase().includes(search.toLowerCase()),
      )
    : allArticles;

  if (tag === "all") {
    return articles;
  }

  return articles
    .map((article) => ({
      ...article,
      tags: article.tags.map((tag) => slug(tag)),
    }))
    .filter((article) => article.tags.includes(tag));
}

export default function TagPage({
  params,
  searchParams,
}: {
  params: { tag: string };
  searchParams: { search?: string };
}) {
  return (
    <main className="container gap-12">
      <div className="space-y-6">
        <dl className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <dt className="heading-primary shrink-0 basis-1/2 normal-case">
            #{params.tag}
          </dt>
          <dd className="basis-1/2 text-gray-700 dark:text-light">
            Jelajahi koleksi artikel terbaik pilihan tim kami yang telah dipilih
            dengan cermat hanya untuk Anda ✨
          </dd>
        </dl>

        <hr className="h-0.5 w-full bg-dark" />

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <TagList className="basis-1/2" />
          <Suspense
            fallback={
              <div className="h-[42px] w-full animate-pulse rounded-lg bg-gray-100 lg:basis-1/2" />
            }
          >
            <Search className="lg:basis-1/2" />
          </Suspense>
        </div>
      </div>

      <ArticlePagination
        articles={filteredArticles(params.tag, searchParams.search)}
      />
    </main>
  );
}
