import Image from "next/image";
import Link from "next/link";
import { allArticles } from "contentlayer/generated";

export default function Hero() {
  const article = allArticles[0];

  return (
    <section className="container w-full pt-8">
      <div className="relative flex h-[60vh] flex-col items-start justify-end sm:h-[80vh]">
        {/*overlay*/}
        <div className="absolute bottom-0 left-0 right-0 top-0 z-0 h-full rounded-3xl bg-gradient-to-b from-transparent to-dark/75 dark:to-dark/50" />

        <Image
          src={article.thumbnail.filePath.replace("../public", "")}
          placeholder="blur"
          blurDataURL={article.thumbnail.blurhashDataUrl}
          alt={article.title}
          fill
          className="-z-10 h-full w-full rounded-3xl object-cover object-center"
          sizes="100vw"
          priority
        />

        <div className="z-0 flex w-full flex-col items-start justify-center p-6 text-white sm:p-8 md:p-12 lg:w-4/5 lg:p-16">
          {/*<Tag link={`/categories/${slug(blog.tags[0])}`} name={blog.tags[0]} />*/}
          <Link href={article.url} className="mt-6">
            <h1 className="heading-primary">
              <span className="text-highlight">{article.title}</span>
            </h1>
          </Link>
          <p className="mt-4 hidden font-medium sm:line-clamp-2 md:text-lg lg:text-xl">
            {article.description}
          </p>
        </div>
      </div>
    </section>
  );
}
