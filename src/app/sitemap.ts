import { MetadataRoute } from "next";

import { getAllArticleCategories, getAllArticleSlugs } from "@/lib/wp";

type Route = {
  url: string;
  lastModified: string;
};

const baseUrl = "https://www.blog.fresclean.id";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articlesPromise = getAllArticleSlugs().then((slugs) =>
    slugs.map(({ slug, modifiedGmt }) => ({
      url: `${baseUrl}/article/${slug}`,
      lastModified: modifiedGmt || new Date().toString(),
    })),
  );

  const tagsPromise = getAllArticleCategories().then((slugs) =>
    slugs.map(({ slug }) => ({
      url: `${baseUrl}/tag/${slug}`,
      lastModified: new Date().toISOString(),
    })),
  );

  let fetchedRoutes: Route[] = [];

  try {
    fetchedRoutes = (await Promise.all([articlesPromise, tagsPromise])).flat();
  } catch (error) {
    throw JSON.stringify(error, null, 2);
  }

  return [...fetchedRoutes];
}
