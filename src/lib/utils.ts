import { ClassValue, clsx } from "clsx";
import GithubSlugger from "github-slugger";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toc = (doc?: string | null) => {
  if (!doc) return [];

  const regulrExp = /<h(?<level>[1-5])>(?<content>.*?)<\/h\1>/g;
  const slugger = new GithubSlugger();

  return Array.from(doc.matchAll(regulrExp)).map(({ groups }) => {
    const flag = groups?.level;
    const content = groups?.content;

    return {
      level: flag === "1" ? "one" : flag === "2" ? "two" : "three",
      text: content,
      slug: content ? slugger.slug(content) : undefined,
    };
  });
};
