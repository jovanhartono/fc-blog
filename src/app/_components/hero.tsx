import Image from "next/image";
import Link from "next/link";
import { allArticles } from "contentlayer/generated";
import dayjs from "dayjs";
import { ReadTimeResults } from "reading-time";

import RecentArticles from "@/app/_components/recent-articles";

export default function Hero() {
  const article = allArticles[0];

  return (
    <section className="container flex w-full flex-col gap-12 py-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <h1 className="heading-primary shrink-0 basis-1/2">Fresclean Blog</h1>
        <p className="basis-1/2 text-gray-700 dark:text-light">
          Dive into our blog for expert tips, hacks, and insightful guides on
          keeping your favorite pairs looking fresh and fabulous 🌟
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <Link
          href={article.url}
          className="group flex h-[65vh] flex-col items-start justify-end bg-amber-50 dark:bg-slate-900 sm:h-[80vh]"
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
              sizes="100vw"
            />
          </div>

          <div className="z-0 flex w-full flex-col p-4 sm:p-8 md:p-10">
            {/*<Tag link={`/categories/${slug(blog.tags[0])}`} name={blog.tags[0]} />*/}
            <small className="mb-2 text-sm font-semibold uppercase text-blue-600">
              {article.tags[0]}
            </small>
            <h1 className="heading-title line-clamp-2 leading-[1.05] group-hover:underline">
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

        <RecentArticles articles={allArticles} />
      </div>
    </section>
  );
}
