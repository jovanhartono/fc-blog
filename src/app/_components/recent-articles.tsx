"use client";

import { Article } from "contentlayer/generated";

import ArticleCard from "@/app/_components/article-card";

export default function RecentArticles({ articles }: { articles: Article[] }) {
  const recentArticles = articles
    .toSorted((a, b) => {
      const dateA = new Date(a.published);
      const dateB = new Date(b.published);

      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 3);

  return (
    <div className="container my-16">
      <h1 className="heading-title text-3xl sm:text-5xl">Artikel Terkini</h1>
      <div className="mt-9 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {recentArticles.map((article) => (
          <ArticleCard article={article} key={article._id} />
        ))}
      </div>
    </div>
  );
}
