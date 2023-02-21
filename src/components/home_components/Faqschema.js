import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

function Faqschema({ title, slug, faqschemas }) {
  return (
    <>
      <Box id="schema-section" style={{ padding: "0rem 2rem", width: "100%" }}>
        <Box itemScope itemType="https://schema.org/FAQPage">
          {title && (
            <Heading textAlign={"left"} width={"100%"}>
              {title}
            </Heading>
          )}
          <br />
          {faqschemas &&
            faqschemas.data.map((schema) => {
              return (
                <>
                  {slug === schema.attributes.Slug && (
                    <div
                      itemScope
                      itemProp="mainEntity"
                      itemType="https://schema.org/Question"
                    >
                      <Heading size={"md"} itemProp="name">
                        {schema.attributes.questionName}
                      </Heading>
                      <div
                        itemScope
                        itemProp="acceptedAnswer"
                        itemType="https://schema.org/Answer"
                      >
                        <Box
                          className="service-body"
                          itemProp="text"
                          style={{ "white-space": "pre-line" }}
                        >
                          <ReactMarkdown>
                            {schema &&
                              schema.attributes.questionAnswer
                                .split("<br/>")
                                .join("\n")}
                          </ReactMarkdown>
                        </Box>
                        <br />
                      </div>
                    </div>
                  )}
                </>
              );
            })}
        </Box>
      </Box>
    </>
  );
}

export default Faqschema;
