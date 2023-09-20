import { BLOGS } from "../services/contants";
import { client } from "./_app";

const URL = "https://www.assignmentsanta.com";

function generateSiteMap({ blogs }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
     ${blogs.data
       .map(({ attributes }) => {
         return `
           <url>
               <loc>${`${URL}/${attributes.Slug}`}</loc>
           </url>
         `;
       })
       .join("")}
   </urlset>
 `;
}

export async function getServerSideProps({ res }) {
  const { data: blogData } = await client.query({
    query: BLOGS,
  });
  // Generate the XML sitemap with the blog data
  const sitemap = generateSiteMap(blogData);

  res.setHeader("Content-Type", "text/xml");
  // Send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function BlogsSiteMap() {}
