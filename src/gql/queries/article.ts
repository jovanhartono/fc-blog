import { graphql } from "@/__generated__";

export const getHomepageArticle = graphql(/* GraphQL */ `
  query HomeArticle {
    posts(first: 4, where: { orderby: { field: DATE, order: DESC } }) {
      edges {
        node {
          slug
          acf {
            summary
          }
          title
          content
          featuredImage {
            node {
              sourceUrl
              altText
              srcSet
            }
          }
          categories {
            edges {
              node {
                id
                name
                slug
              }
            }
          }
        }
      }
    }
  }
`);

export const getAllArticleByCategory = graphql(/* GraphQL */ `
  query ArticlesByCategory($categoryName: String!) {
    posts(first: 99999999, where: { categoryName: $categoryName }) {
      edges {
        node {
          id
          title
          slug
          acf {
            summary
          }
          featuredImage {
            node {
              sourceUrl
              altText
              srcSet
            }
          }
          date
          content
        }
      }
    }
  }
`);

export const getArticleCategories = graphql(/* GraphQL */ `
  query ArticleCategories {
    categories {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
  }
`);

export const getAllArticleWithSlug = graphql(/* GraphQL */ `
  query ArticleSlug {
    posts(first: 999999, where: { status: PUBLISH }) {
      edges {
        node {
          slug
          modifiedGmt
        }
      }
    }
  }
`);

export const getArticleBySlugQuery = graphql(/* GraphQL */ `
  query ArticleBySlug($id: ID!) {
    post(id: $id, idType: SLUG) {
      content
      title
      slug
      excerpt
      date
      acf {
        description
        summary
      }
      featuredImage {
        node {
          sourceUrl
          altText
          srcSet
        }
      }
      categories {
        edges {
          node {
            id
            name
            slug
          }
        }
      }
    }
  }
`);
