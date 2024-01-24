import Link from "next/link";
import { allArticles } from "contentlayer/generated";
import { slug } from "github-slugger";

import { cn } from "@/lib/utils";

export default function TagList({ className }: { className?: string }) {
  const tags = Array.from(
    allArticles.reduce(
      (tagSet, article) => {
        article.tags.forEach((tag) => tagSet.add(slug(tag)));
        return tagSet;
      },
      new Set(["all"]),
    ),
  );

  return (
    <div className={cn("flex gap-3", className)}>
      {tags.map((tag, idx) => (
        <Link className="capitalize" href={`/tag/${tag}`} key={idx}>
          {tag}
        </Link>
      ))}
    </div>
  );
}
