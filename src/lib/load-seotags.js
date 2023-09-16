import { strapiUrl } from "../services/contants";

export async function loadSeotags() {
  const res = await fetch(`${strapiUrl}/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
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
        }`,
    }),
  });
  const seotags = await res.json();
  console.log({ seotags });

  return seotags;
}
