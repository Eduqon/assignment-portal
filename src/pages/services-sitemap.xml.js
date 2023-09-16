import { loadServices } from "../lib/load-services";

const DATA_URL = "https://www.assignmentsanta.com";

function generateSiteMap(services) {
  return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${services
            .map(({ attributes }) => {
              return `
                  <url>
                      <loc>${`${DATA_URL}/service/${attributes.slug}`}</loc>
                  </url>
              `;
            })
            .join("")}
      </urlset>
 `;
}

export async function getServerSideProps({ res }) {
  const { data: serviceData } = await loadServices();
  // Generate the XML sitemap with the blog data
  const sitemap = generateSiteMap(serviceData.services.data);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {}
