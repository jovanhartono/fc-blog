import Image from "next/image";
import GithubSlugger from "github-slugger";
import parse, { attributesToProps, Element } from "html-react-parser";

export default async function RenderHTML({
  content,
}: {
  content?: string | null;
}) {
  if (!content) {
    return;
  }

  return (
    <section className="article">
      {parse(content, {
        replace: (domNode) => {
          if (domNode instanceof Element) {
            if (domNode.name === "img") {
              const { fetchpriority, ...props } = attributesToProps(
                domNode.attribs,
              );

              return (
                <Image
                  className="w-full"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  src={props.src! as string}
                  width={500}
                  height={500}
                  alt={`${props.alt} thumbnail`}
                />
              );
            }

            if (/h[1-6]/g.test(domNode.name) && domNode.children) {
              const headingText = domNode.children[0];

              if (headingText && "data" in headingText) {
                const slugger = new GithubSlugger();

                domNode.attribs = {
                  ...domNode.attribs,
                  id: slugger.slug(headingText.data),
                };
              }
            }
          }
        },
      })}
    </section>
  );
}
