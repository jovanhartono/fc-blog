import Image from "next/image";
import Link from "next/link";
import { Article } from "contentlayer/generated";
import dayjs from "dayjs";
import { ReadTimeResults } from "reading-time";

import Tag from "@/app/_components/tag";

export default function FeaturedArticle({ article }: { article: Article }) {
  return (
    <Link
      href={article.url}
      className="group flex min-h-[65vh] flex-col items-start justify-end bg-amber-50 dark:bg-slate-900 sm:min-h-[80vh]"
    >
      <div className="relative z-10 w-full shrink-0 grow">
        <Image
          fill
          priority
          alt={article.title}
          className="-z-10 object-cover object-center"
          placeholder="blur"
          blurDataURL={article.thumbnail.blurhashDataUrl}
          src={article.thumbnail.filePath.replace("../public", "")}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      <div className="z-0 flex w-full flex-col p-4 sm:p-6">
        <Tag text={article.tags[0]} />
        <h1 className="heading-title mt-2 line-clamp-2 leading-[1.05] group-hover:underline">
          {article.title}
        </h1>
        <p className="mb-6 mt-2 line-clamp-2 text-gray-700 dark:text-light md:text-lg lg:text-xl">
          {article.description}
        </p>

        <div className="mt-auto flex items-center justify-between text-sm font-medium lg:text-base">
          <span aria-label="reading time">
            {(article.readingTime as ReadTimeResults).text}
          </span>
          <span aria-label="published at">
            {dayjs(article.published).format("MMM DD, YYYY")}
          </span>
        </div>
      </div>
    </Link>
  );
}
