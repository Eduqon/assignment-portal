import { strapiUrl } from "../services/contants";

export async function loadFaqschemas() {
  const res = await fetch(`${strapiUrl}/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
        faqschemas(pagination: { limit: 1000 }) {
            data {
              id
              attributes {
                Slug
                questionName
                questionAnswer
              }
            }
          }
        }`,
    }),
  });
  const faqschemas = await res.json();
  console.log({ faqschemas });

  return faqschemas;
}
