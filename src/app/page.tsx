import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Post } from "@/__generated__/graphql";
import { getHomepageArticle } from "@/gql/queries/article";

import { getClient } from "@/lib/apollo";
import ArticleCard from "@/app/_components/article-card";
import FeaturedArticle from "@/app/_components/home/featured-article";
import TagList from "@/app/_components/home/tag-list";

export const metadata: Metadata = {
  title: "Perawatan & Reparasi Sepatu Terbaik",
};

export default async function Home() {
  const { data } = await getClient().query({
    query: getHomepageArticle,
  });

  if (!data || !data.posts?.edges) {
    return notFound();
  }

  const articles = data.posts.edges;

  return (
    <main>
      <section className="container flex w-full flex-col gap-12">
        <div className="space-y-6">
          <dl className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <dt className="heading-primary shrink-0 basis-1/2">
              Artikel Fresclean
            </dt>
            <dd className="basis-1/2 text-gray-700 dark:text-light">
              Ulik artikel kami untuk mendapatkan tips, hacks, dan panduan
              lengkap untuk menjaga sepasang sepatu favorit Anda terlihat
              sempurna 🌟
            </dd>
          </dl>

          <hr className="h-0.5 w-full bg-dark" />

          <TagList />
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <FeaturedArticle article={articles[0].node as Post} />
          <div>
            <h1 className="heading-title">Artikel Terkini</h1>
            <div className="flex grow flex-col gap-6 divide-y divide-black dark:divide-light">
              {articles.slice(1).map((article) => (
                <ArticleCard
                  article={article.node as Post}
                  key={article.node.slug}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
