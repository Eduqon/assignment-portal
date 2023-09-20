import { SERVICES } from "../services/contants";
import { client } from "./_app";

const URL = "https://www.assignmentsanta.com";

function generateSiteMap({ services }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
     ${services.data
       .map(({ attributes }) => {
         return `
           <url>
               <loc>${`${URL}/${attributes.slug}`}</loc>
           </url>
         `;
       })
       .join("")}
   </urlset>
 `;
}

export async function getServerSideProps({ res }) {
  const { data: serviceData } = await client.query({
    query: SERVICES,
  });
  // Generate the XML sitemap with the blog data
  const sitemap = generateSiteMap(serviceData);

  res.setHeader("Content-Type", "text/xml");
  // Send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {}
