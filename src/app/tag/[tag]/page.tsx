import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllArticleByCategory,
  getArticleCategories,
} from "@/gql/queries/article";

import { getClient } from "@/lib/apollo";
import ArticlePagination from "@/app/_components/article-pagination";
import TagList from "@/app/_components/home/tag-list";
import Search from "@/app/_components/search";

export async function generateStaticParams() {
  const { data } = await getClient().query({
    query: getArticleCategories,
  });
  const categories = [
    "all",
    ...(data.categories?.edges.map((category) => category.node.slug) ?? []),
  ];

  return categories.map((tag) => ({ tag }));
}

export const metadata: Metadata = {
  title: "Kategori Artikel",
  description: `Pelajari lebih lanjut tentang melalui artikel terbaik kami`,
};

export default async function TagPage({
  params,
  searchParams,
}: {
  params: { tag: string };
  searchParams: { search?: string };
}) {
  const { data } = await getClient().query({
    query: getAllArticleByCategory,
    variables: {
      /* passing an empty string "" to categoryName will return all article
        if tag === all return all article, otherwise return filtered article by its category
      y*/
      categoryName: params.tag === "all" ? "" : params.tag,
    },
  });

  if (!data.posts) return notFound();

  const articles = {
    ...data,
    posts: {
      ...data.posts,
      edges:
        data.posts?.edges?.filter(({ node }) =>
          node.title
            ?.toLowerCase()
            .includes(searchParams.search?.toLowerCase() || ""),
        ) || [],
    },
  };

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

        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:gap-12">
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

      <ArticlePagination articles={articles} />
    </main>
  );
}
