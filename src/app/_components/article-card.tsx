import Image from "next/image";
import Link from "next/link";
import { Article } from "contentlayer/generated";
import dayjs from "dayjs";
import { ReadTimeResults } from "reading-time";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={article.url} key={article._id}>
      <article className="group flex aspect-[9/11] flex-col overflow-hidden rounded-xl border border-gray-400 shadow-md sm:aspect-[9/10]">
        <div className="relative aspect-[16/10] overflow-hidden sm:aspect-video">
          <Image
            className="transition-transform ease-in-out group-hover:scale-110"
            fill
            objectFit="cover"
            src={article.thumbnail.filePath.replace("../public", "")}
            alt={article.title}
            blurDataURL={article.thumbnail.blurhashDataUrl}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </div>

        <section className="flex grow flex-col p-4">
          <dl>
            <dt className="line-clamp-2 font-heading text-2xl">
              <span className="text-highlight group-hover:bg-[length:100%_6px]">
                {article.title}
              </span>
            </dt>
            <dd className="mt-1.5 line-clamp-2 text-gray-700 dark:text-gray-300 sm:line-clamp-2">
              {article.description}
            </dd>
          </dl>

          <div className="mt-auto flex items-center justify-between">
            <span aria-label="reading time">
              {(article.readingTime as ReadTimeResults).text}
            </span>
            <span aria-label="published at">
              {dayjs(article.published).format("MMM DD, YYYY")}
            </span>
          </div>
        </section>
      </article>
    </Link>
  );
}
