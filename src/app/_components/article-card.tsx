import Image from "next/image";
import Link from "next/link";
import { Article } from "contentlayer/generated";
import dayjs from "dayjs";
import { ReadTimeResults } from "reading-time";

import Tag from "@/app/_components/tag";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={article.url} key={article._id}>
      <article className="group flex flex-col gap-3 overflow-hidden pt-6 lg:flex-row">
        <div className="relative h-[250px] shrink-0 overflow-hidden lg:hidden">
          <Image
            className="object-cover"
            fill
            src={article.thumbnail.filePath.replace("../public", "")}
            alt={article.title}
            blurDataURL={article.thumbnail.blurhashDataUrl}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </div>

        <section className="flex grow flex-col">
          <Tag text={article.tags[0]} />
          <dl>
            <dt className="line-clamp-3 font-heading text-2xl group-hover:underline">
              {article.title}
            </dt>
            <dd className="mt-1.5 line-clamp-2 text-gray-700 dark:text-gray-300">
              {article.description}
            </dd>
          </dl>

          <div className="mt-3 flex items-center justify-between gap-3 text-sm lg:justify-start">
            <time aria-label="published at">
              {dayjs(article.published).format("MMM DD, YYYY")}
            </time>
            <span aria-label="reading time">
              {(article.readingTime as ReadTimeResults).text}
            </span>
          </div>
        </section>
      </article>
    </Link>
  );
}
