import {
  getAllArticleWithSlug,
  getArticleCategories,
} from "@/gql/queries/article";

import { getClient } from "@/lib/apollo";

export const getAllArticleSlugs = async () => {
  const { data } = await getClient().query({
    query: getAllArticleWithSlug,
  });

  return data.posts?.edges.map((edge) => edge.node) || [];
};

export const getAllArticleCategories = async () => {
  const { data } = await getClient().query({
    query: getArticleCategories,
  });

  return data.categories?.edges.map((edge) => edge.node) || [];
};
