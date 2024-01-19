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
    <div className="flex flex-col gap-3">
      <h1 className="heading-title">Artikel Terkini</h1>
      <div className="flex grow flex-col gap-6 divide-y divide-black">
        {recentArticles.map((article) => (
          <ArticleCard article={article} key={article._id} />
        ))}
      </div>
    </div>
  );
}
