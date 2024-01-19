import Image from "next/image";
import Link from "next/link";
import { Article } from "contentlayer/generated";
import dayjs from "dayjs";
import { ReadTimeResults } from "reading-time";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={article.url} key={article._id}>
      <article className="group flex flex-col gap-6 overflow-hidden pt-6 lg:flex-row">
        <div className="relative h-[250px] overflow-hidden lg:aspect-video lg:h-auto lg:w-[300px]">
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
          <dl>
            <dt className="text-sm font-medium uppercase text-blue-600">
              {article.tags[0]}
              {/*<span aria-label="reading time">*/}
              {/*  {(article.readingTime as ReadTimeResults).text}*/}
              {/*</span>*/}
            </dt>
            <dt className="line-clamp-3 font-heading text-2xl group-hover:underline">
              {article.title}
            </dt>
            {/*<dd className="mt-1.5 line-clamp-2 text-gray-700 dark:text-gray-300 sm:line-clamp-2">*/}
            {/*  {article.description}*/}
            {/*</dd>*/}
          </dl>

          {/*<div className="mt-auto flex items-center justify-between">*/}
          {/*  <span aria-label="reading time">*/}
          {/*    {(article.readingTime as ReadTimeResults).text}*/}
          {/*  </span>*/}
          {/*  <span aria-label="published at">*/}
          {/*    {dayjs(article.published).format("MMM DD, YYYY")}*/}
          {/*  </span>*/}
          {/*</div>*/}
        </section>
      </article>
    </Link>
  );
}
