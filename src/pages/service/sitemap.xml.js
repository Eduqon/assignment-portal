import React from "react";
import { client } from "../_app";
import { SERVICES } from "../../services/contants";

const DATA_URL = "https://www.assignmentsanta.com";

const createSitemap = (services) => `<?xml version="1.0" encoding="UTF-8"?>
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

class Sitemap extends React.Component {
  static async getServerSideProps({ res }) {
    const { data: serviceData } = await client.query({
      query: SERVICES,
    });
    console.log({ res });

    res.setHeader("Content-Type", "text/xml");
    res.write(createSitemap(serviceData.services.data));
    res.end();
  }
}

export default Sitemap;
