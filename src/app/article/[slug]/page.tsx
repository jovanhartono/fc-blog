import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { metadataConfig } from "@/config/metadata";
import {
  getAllArticleWithSlug,
  getArticleBySlugQuery,
} from "@/gql/queries/article";
import dayjs from "dayjs";
import readingTime from "reading-time";

import { getClient } from "@/lib/apollo";
import { toc } from "@/lib/utils";
import RenderHTML from "@/app/_components/render-html";

export const revalidate = 10;

export const generateStaticParams = async () => {
  const { data } = await getClient().query({
    query: getAllArticleWithSlug,
  });

  return data.posts?.edges.map((post) => ({ slug: post.node.slug }));
};

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const { data } = await getClient().query({
    query: getArticleBySlugQuery,
    variables: {
      id: params.slug,
    },
  });
  const article = data.post;

  if (!article) throw new Error(`article not found for slug: ${params.slug}`);

  return {
    title: article.title,
    description: article.acf?.description,
    twitter: {
      title: article.title,
      description: article.acf?.description,
    },
    openGraph: {
      title: article.title,
      description: article.acf?.description,
      url: `${metadataConfig.url}/article/${article.slug}`,
      siteName: metadataConfig.title,
      locale: "id",
      type: "article",
      publishedTime: dayjs(article.date).format("DD-MM-YYYY"),
      images: article.featuredImage,
    },
  };
};

export default async function Article({
  params,
}: {
  params: { slug: string };
}) {
  const { data } = await getClient().query({
    query: getArticleBySlugQuery,
    variables: {
      id: params.slug,
    },
  });

  if (!data.post) notFound();
  const article = data.post;

  return (
    <article className="container mt-[76px] py-8">
      <section className="relative mb-8 w-full">
        <div className="z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <time>{dayjs(article.date).format("MMMM DD, YYYY")}</time>
            &middot;
            <span>{readingTime(article.content || "").text}</span>
            &middot;
            <Link
              href={`/tag/${article.categories?.edges[0].node.slug}`}
              className={"font-medium capitalize text-blue-500"}
            >
              {article.categories?.edges[0].node.name}
            </Link>
          </div>

          <h1 className="heading-primary max-w-[30ch] text-left">
            {data.post.title}
          </h1>
        </div>

        {/*overlay*/}
        {/*<div className="absolute inset-0 bg-dark/60 dark:bg-dark/40" />*/}
      </section>

      <Image
        src={article.featuredImage!.node.sourceUrl!}
        alt={`${article.featuredImage?.node.altText} thumbnail`}
        width={2000}
        height={1000}
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
              {toc(article.content).map((heading: any) => (
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
        <RenderHTML content={article.content} />
      </div>
    </article>
  );
}
