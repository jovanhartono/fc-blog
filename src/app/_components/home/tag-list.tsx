import Link from "next/link";
import { allArticles } from "contentlayer/generated";
import { slug } from "github-slugger";

export default function TagList() {
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
    <div className="flex gap-3">
      {tags.map((tag, idx) => (
        <Link className="capitalize" href={`/tag/${tag}`} key={idx}>
          {tag}
        </Link>
      ))}
    </div>
  );
}
