import Image from "next/image";
import Link from "next/link";
import HeroImage from "@/../public/will-breen-QbDe8JxtUp0-unsplash.jpg";

export default function Hero() {
  return (
    <div className="container w-full">
      <article className="relative flex h-[60vh] flex-col items-start justify-end sm:h-[85vh]">
        {/*overlay*/}
        <div className="to-dark/90 absolute bottom-0 left-0 right-0 top-0 z-0 h-full rounded-3xl bg-gradient-to-b from-transparent" />

        <Image
          src={HeroImage}
          placeholder="blur"
          // blurDataURL={blog.image.blurhashDataUrl}
          alt={"hero image"}
          fill
          className="-z-10 h-full w-full rounded-3xl object-cover object-center"
          sizes="100vw"
          priority
        />

        <div className="z-0 flex w-full flex-col items-start justify-center p-6 text-white sm:p-8 md:p-12 lg:w-3/4 lg:p-16">
          {/*<Tag link={`/categories/${slug(blog.tags[0])}`} name={blog.tags[0]} />*/}
          <Link href={"/link-to-blog"} className="mt-6">
            <h1 className="heading-primary">
              <span
                className="from-accent to-accent dark:from-accentDark/50 dark:to-accentDark/50
                bg-gradient-to-r bg-[length:0px_6px]
                bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_6px] "
              >
                An example app built using Next.js 13 server components.
              </span>
            </h1>
          </Link>
          <p className="mt-4 hidden font-medium sm:inline-block md:text-lg lg:text-xl">
            Integrating mindfulness practices helps developers cultivate
            present-moment awareness, fostering focus, problem-solving, and
            work-life balance.
          </p>
        </div>
      </article>
    </div>
  );
}
