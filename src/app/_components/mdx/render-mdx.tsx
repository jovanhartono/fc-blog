"use client";

import { Article } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";

import MarkdownImage from "@/app/_components/mdx/markdown-image";

export default function RenderMdx({ article }: { article: Article }) {
  const MDXContent = useMDXComponent(article.body.code);

  return (
    <section className="article">
      <MDXContent components={{ img: MarkdownImage }} />
    </section>
  );
}
