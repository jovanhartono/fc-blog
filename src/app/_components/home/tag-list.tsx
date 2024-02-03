import Link from "next/link";
import { getArticleCategories } from "@/gql/queries/article";

import { getClient } from "@/lib/apollo";
import { cn } from "@/lib/utils";

export default async function TagList({ className }: { className?: string }) {
  const { data } = await getClient().query({
    query: getArticleCategories,
  });

  const categories = (data.categories?.edges || []).map(({ node }) => ({
    name: node.name,
    slug: node.slug,
  }));
  const allCategories = [{ name: "all", slug: "all" }, ...categories];

  return (
    <div className={cn("flex gap-3", className)}>
      {allCategories.map((category, idx) => (
        <Link className="capitalize" href={`/tag/${category.slug}`} key={idx}>
          {category.name}
        </Link>
      ))}
    </div>
  );
}
