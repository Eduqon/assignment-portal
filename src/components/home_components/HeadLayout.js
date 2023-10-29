import React from "react";
import Head from "next/head";

const HeadLayout = ({ slug, seotags }) => {
  const homeTags =
    seotags && seotags.data.filter((val) => val.attributes.Slug === slug);
  const title = homeTags && homeTags[0].attributes.title;
  const description = homeTags && homeTags[0].attributes.description;
  const keyword = homeTags && homeTags[0].attributes.keyword;
  const canonicalURL = homeTags && homeTags[0].attributes.cntag;
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AssignmentSanta",
    url: "https://www.assignmentsanta.com",
    logo: "https://www.assignmentsanta.com/assets/newDesigns/Logo.png",
    sameAs: [
      "https://www.facebook.com/assignmentsanta/",
      "https://twitter.com/AssignmentSanta",
      "https://www.instagram.com/assignmentsanta04/",
      "https://www.youtube.com/channel/UCiuHzMoZc4GQ7dMG2quupbg",
    ],

    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+16042562312",
        email: "info@assignmentsanta.com",
        contactType: "customer service",
      },
    ],
  };

  const productData = {
    "@context": "http://schema.org/",
    "@type": "product",
    name: "assignmentsanta",
    image: "https://www.assignmentsanta.com/assets/newDesigns/Logo.png",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "5473",
    },
  };

  return (
    <>
      <Head>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keyword" content={keyword} />
        {canonicalURL && <link rel="canonical" href={canonicalURL} />}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productData) }}
        />
      </Head>
    </>
  );
};

export default HeadLayout;
