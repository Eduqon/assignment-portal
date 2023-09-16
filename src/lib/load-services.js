import { strapiUrl } from "../services/contants";

export async function loadServices() {
  const res = await fetch(`${strapiUrl}/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
        services(pagination: { limit: 100 }) {
            data {
              id
              attributes {
                title
                slug
              }
            }
          }
        }`,
    }),
  });
  const serviceData = await res.json();
  // console.log({ serviceData });

  return serviceData;
}
