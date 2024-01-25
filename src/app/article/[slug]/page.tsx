import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { metadataConfig } from "@/config/metadata";
import { allArticles } from "contentlayer/generated";
import dayjs from "dayjs";
import { ReadTimeResults } from "reading-time";

import RenderMdx from "@/app/_components/mdx/render-mdx";

export const generateStaticParams = async () =>
  allArticles.map((article) => ({ slug: article._raw.flattenedPath }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const article = allArticles.find(
    (article) => article._raw.flattenedPath === params.slug,
  );

  if (!article) throw new Error(`article not found for slug: ${params.slug}`);

  return {
    title: article.title,
    description: article.description,
    twitter: {
      title: article.title,
      description: article.description,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: metadataConfig.url + article.url,
      siteName: metadataConfig.title,
      locale: "id",
      type: "article",
      publishedTime: article.published,
      images:
        metadataConfig.url +
        article.thumbnail.relativeFilePath.replace("../public", ""),
    },
  };
};

export default function Article({ params }: { params: { slug: string } }) {
  const article = allArticles.find(
    (article) => article._raw.flattenedPath === params.slug,
  );

  if (!article) notFound();

  return (
    <article className="container mt-[76px] py-8">
      <section className="relative mb-8 w-full">
        <div className="z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <time dateTime={article.published}>
              {dayjs(article.published).format("MMMM DD, YYYY")}
            </time>
            &middot;
            <span>{(article.readingTime as ReadTimeResults).text}</span>
            &middot;
            <Link
              href={`/tag/${article.tags[0]}`}
              className={"font-medium capitalize text-blue-500"}
            >
              {article.tags[0]}
            </Link>
          </div>

          <h1 className="heading-primary max-w-[30ch] text-left">
            {article.title}
          </h1>
        </div>

        {/*overlay*/}
        {/*<div className="absolute inset-0 bg-dark/60 dark:bg-dark/40" />*/}
      </section>

      <Image
        src={article.thumbnail.relativeFilePath.replace("../public", "")}
        placeholder="blur"
        blurDataURL={article.thumbnail.blurhashDataUrl}
        alt={article.title}
        width={article.thumbnail.width}
        height={article.thumbnail.height}
        className="aspect-square max-h-[65vh] w-full rounded-3xl object-cover object-center md:aspect-video"
        priority
        sizes="100vw"
      />

      <div className="mt-4 grid grid-cols-12 lg:gap-x-6">
        <div className={"col-span-12 mt-6 lg:col-span-4"}>
          <details
            className="sticky top-[96px] max-h-[50vh] overflow-hidden overflow-y-auto rounded-lg border border-dark p-4 text-dark dark:border-light dark:text-light lg:max-h-[80vh]"
            open
          >
            <summary className="cursor-pointer text-lg font-semibold capitalize">
              Table Of Content
            </summary>
            <ul className="font-in mt-4 text-base">
              {article.toc.map((heading: any) => (
                <li key={`#${heading.slug}`} className="py-1">
                  <a
                    href={`#${heading.slug}`}
                    data-level={heading.level}
                    className="flex items-center justify-start border-solid border-dark/40 data-[level=two]:border-t
                    data-[level=three]:pl-4 data-[level=two]:pl-0
                    data-[level=two]:pt-2 sm:data-[level=three]:pl-6"
                  >
                    {heading.level === "three" ? (
                      <span className="mr-2 flex h-1 w-1 rounded-full bg-dark">
                        &nbsp;
                      </span>
                    ) : null}

                    <span className="hover:underline">{heading.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>

        <RenderMdx article={article} />
      </div>
    </article>
  );
}
