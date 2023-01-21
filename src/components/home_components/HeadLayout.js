import React from "react";
import { Helmet } from "react-helmet-async";
import { useQuery, gql } from "@apollo/client";

const SEOTAGS = gql`
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

const HeadLayout = ({ slug }) => {
  const { loading, error, data } = useQuery(SEOTAGS);
  const { seotags } = !loading && data;
  const homeTags =
    seotags && seotags.data.filter((val) => val.attributes.Slug === slug);
  const title = homeTags && homeTags[0].attributes.title;
  const description = homeTags && homeTags[0].attributes.description;
  const keyword = homeTags && homeTags[0].attributes.keyword;
  const canonicalURL = homeTags && homeTags[0].attributes.cntag;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keyword" content={keyword} />
        {canonicalURL && <link rel="canonical" href={canonicalURL} />}
      </Helmet>
    </>
  );
};

export default HeadLayout;
