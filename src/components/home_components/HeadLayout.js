import React from "react";
import Head from "next/head";

const HeadLayout = ({ slug, seotags }) => {
  const homeTags =
    seotags && seotags.data.filter((val) => val.attributes.Slug === slug);
  const title = homeTags && homeTags[0].attributes.title;
  const description = homeTags && homeTags[0].attributes.description;
  const keyword = homeTags && homeTags[0].attributes.keyword;
  const canonicalURL = homeTags && homeTags[0].attributes.cntag;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keyword" content={keyword} />
        {canonicalURL && <link rel="canonical" href={canonicalURL} />}
      </Head>
    </>
  );
};

export default HeadLayout;
