import Image from "next/image";
import Link from "next/link";
import { Post } from "@/__generated__/graphql";
import dayjs from "dayjs";
import readingTime, { ReadTimeResults } from "reading-time";

import Tag from "@/app/_components/tag";

export default function ArticleCard({ article }: { article: Post }) {
  return (
    <Link href={`/article/${article.slug}`}>
      <article className="group flex flex-col gap-3 overflow-hidden pt-6 lg:flex-row">
        <div className="relative h-[250px] shrink-0 overflow-hidden lg:hidden">
          <Image
            className="object-cover"
            fill
            src={article.featuredImage?.node.sourceUrl!}
            alt={article.featuredImage?.node.altText || ""}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </div>

        <section className="flex grow flex-col">
          <Tag text={article.categories?.edges[0].node.name} />
          <dl>
            <dt className="line-clamp-3 font-heading text-2xl group-hover:underline">
              {article.title}
            </dt>
            <dd className="mt-1.5 line-clamp-2 text-gray-700 dark:text-gray-300">
              {article.acf?.summary}
            </dd>
          </dl>

          <div className="mt-3 flex items-center justify-between gap-3 text-sm lg:justify-start">
            <time aria-label="published at">
              {dayjs(article.date).format("MMM DD, YYYY")}
            </time>
            <span aria-label="reading time">
              {(readingTime(article.content || "") as ReadTimeResults).text}
            </span>
          </div>
        </section>
      </article>
    </Link>
  );
}
