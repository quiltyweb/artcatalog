import * as React from "react";
import { Link, graphql, PageProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import styled from "styled-components";

const Title = styled(Heading)`
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 29px;
  color: #4b828f;
  margin-bottom: 1rem;
  text-transform: capitalize;
`;
const AboutPage: React.FunctionComponent<PageProps<Queries.AboutPageQuery>> = ({
  data: { storefrontshopify, adminshopify },
}): React.ReactElement => {
  return (
    <>
      <Stack direction={["column", "column", "row", "row", "row"]} p={4}>
        <Box>
          <Title as="h2">{storefrontshopify.page?.title}</Title>
          <Text fontSize="md" as={"div"}>
            <div
              dangerouslySetInnerHTML={{
                __html: storefrontshopify.page?.body,
              }}
            />
          </Text>
        </Box>
        <StaticImage
          style={{
            filter: "grayscale(1)",
            transform: "scaleX(-1)",
            borderRadius: "6px",
          }}
          alt="Painter Gabriela painting on a canvas"
          src="../images/about/author.jpg"
        />
      </Stack>

      <Title as="h3">About my products</Title>
      <Stack
        spacing={4}
        align="center"
        fontSize={["1rem", "1rem", "1rem", "1rem", "0.9rem"]}
        direction={["column", "column", "column", "column", "row"]}
        pt={[4, 4, 4, 4, 4]}
        mt={[4, 4, 4, 4, 4]}
        textTransform="capitalize"
      >
        {adminshopify?.metaobjects.nodes[0].fields.map((item) => (
          <Link key={item.key} to={`/product-categories/${item.key}`}>
            {item.definition.name}
          </Link>
        ))}
      </Stack>
    </>
  );
};
export default AboutPage;

export const query = graphql`
  query AboutPage {
    adminshopify {
      metaobjects(first: 10, type: "product_categories") {
        nodes {
          fields {
            definition {
              name
            }
            key
          }
        }
      }
    }
    storefrontshopify {
      page(handle: "meet-the-artist") {
        title
        body
      }
    }
  }
`;
