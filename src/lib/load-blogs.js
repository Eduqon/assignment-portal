import { strapiUrl } from "../services/contants";

export async function loadBlogs() {
  const res = await fetch(`${strapiUrl}/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
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
        }`,
    }),
  });
  const data = await res.json();

  return data;
}
