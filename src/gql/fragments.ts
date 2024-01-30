import { graphql } from "@/__generated__";

export const CategoryFragment = graphql(/* GraphQL */ `
  fragment Category on CategoryConnection {
    edges {
      node {
        id
        name
        slug
      }
    }
  }
`);

export const ImageFragment = graphql(/* GraphQL */ `
  fragment Image on NodeWithFeaturedImage {
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
  }
`);
