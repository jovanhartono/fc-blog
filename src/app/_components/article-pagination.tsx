"use client";

import { useState } from "react";
import { Article } from "contentlayer/generated";

import ArticleCard from "@/app/_components/article-card";

const articlePaginationLimit = 10;

export default function ArticlePagination({
  articles,
}: {
  articles: Article[];
}) {
  const [start, setStart] = useState<number>(0);
  const next = start + articlePaginationLimit;

  function handlePrev() {
    setStart(start - articlePaginationLimit);
  }

  function handleNext() {
    setStart(start + articlePaginationLimit);
  }

  return (
    <>
      <div className="grid gap-12 lg:grid-cols-2">
        {articles
          .slice(start, start + articlePaginationLimit)
          .map((article) => (
            <ArticleCard article={article} key={article._id} />
          ))}
      </div>

      <div className="flex flex-col-reverse items-end justify-between gap-6 lg:flex-row lg:items-center">
        <span>
          Showing {start + 1} to{" "}
          {next > articles.length ? articles.length : next} of {articles.length}{" "}
          results
        </span>
        <div className="flex items-center justify-end gap-6">
          <button
            className="h-9 border border-dark px-4 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-300 dark:border-light dark:disabled:border-gray-500 dark:disabled:text-gray-500"
            disabled={start - articlePaginationLimit < 0}
            onClick={handlePrev}
          >
            Previous
          </button>
          <button
            className="h-9 border border-dark px-4 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-300 dark:border-light dark:disabled:border-gray-500 dark:disabled:text-gray-500"
            disabled={next > articles.length - 1}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
