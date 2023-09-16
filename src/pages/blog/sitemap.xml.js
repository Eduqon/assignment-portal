import React from "react";
import { client } from "../_app";
import { BLOGS } from "../../services/contants";

const DATA_URL = "https://www.assignmentsanta.com";

const createSitemap = (blogs) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${blogs
          .map(({ attributes }) => {
            return `
                <url>
                    <loc>${`${DATA_URL}/blog/${attributes.Slug}`}</loc>
                </url>
            `;
          })
          .join("")}
    </urlset>
    `;

// remove component
// export async function getServerSideProps({ res }) {
//   const { data: blogData } = await client.query({
//     query: BLOGS,
//   });
//   res.setHeader("Content-Type", "text/xml");
//   res.write(createSitemap(blogData.blogs.data));
//   res.end();
// }

// add component here
export default () => null;

// class Sitemap extends React.Component {
//   static async getServerSideProps({ res }) {
//     const { data: blogData } = await client.query({
//       query: BLOGS,
//     });
//     res.setHeader("Content-Type", "text/xml");
//     res.write(createSitemap(blogData.blogs.data));
//     res.end();
//   }
// }

// export default Sitemap;
