import { Metadata } from "next";
import { allArticles } from "contentlayer/generated";
import { slug } from "github-slugger";

import ArticlePagination from "@/app/_components/article-pagination";
import TagList from "@/app/_components/home/tag-list";

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

function filteredArticles(tag: string) {
  return tag === "all"
    ? allArticles
    : allArticles
        .map((article) => ({
          ...article,
          tags: article.tags.map((tag) => slug(tag)),
        }))
        .filter((article) => article.tags.includes(tag));
}

export default function TagPage({ params }: { params: { tag: string } }) {
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

        <TagList />
      </div>

      <ArticlePagination articles={filteredArticles(params.tag)} />
    </main>
  );
}
