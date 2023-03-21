import { gql } from "@apollo/client";

export const apiUrl = "https://assignment-santa-api.azurewebsites.net";
export const chatUrl =
  "https://assignment-santa-communication.communication.azure.com/";
export const localUrl = "http://localhost:8080";
export const frontEndUrl = "https://www.assignmentsanta.com";
export const strapiUrl = "https://assignmentsantastrapi.fly.dev";
export const mediaUrl = "https://assignmentsantastrapi.fly.dev/api";
export const SERVICES = gql`
  query {
    services(pagination: { limit: 100 }) {
      data {
        id
        attributes {
          title
          slug
        }
      }
    }
  }
`;
export const SERVICE = gql`
  query GetServices($slug: String!) {
    services(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          title
          slug
          body_title
          body_1
          body_2
          Sub_Title
          Sub_Title_2
          Seodescription
          Seokeyword
          Formheading
          Seotitle
          Seocntag
          SchemaTitle
        }
      }
    }
  }
`;
export const SEOTAGS = gql`
  query {
    seotags(pagination: { limit: 100 }) {
      data {
        id
        attributes {
          title
          Slug
          description
          keyword
          cntag
        }
      }
    }
  }
`;

export const FAQSCHEMA = gql`
  query {
    faqschemas(pagination: { limit: 1000 }) {
      data {
        id
        attributes {
          Slug
          questionName
          questionAnswer
        }
      }
    }
  }
`;

export const BLOGS = gql`
  query {
    blogs(pagination: { limit: 1000 }) {
      data {
        id
        attributes {
          Slug
          Heading
          body
          Author
          createdAt
        }
      }
    }
  }
`;

export const BLOG = gql`
  query GetBlogs($blog: String!) {
    blogs(filters: { Slug: { eq: $blog } }) {
      data {
        id
        attributes {
          Heading
          Slug
          body
          Categories
          Author
          Author_BIO
          Seo_Title
          Seo_Description
          Seo_Keyword
          Seo_Cntag
          createdAt
        }
      }
    }
  }
`;
