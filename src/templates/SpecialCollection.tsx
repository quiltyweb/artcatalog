import React from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Card,
  CardBody,
  CardFooter,
  Container,
  Divider,
  Heading,
  Highlight,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  LinkOverlay,
  LinkBox,
} from "@chakra-ui/react";
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image";
import { Link as GatsbyLink } from "gatsby";
import SEO from "../components/SEO";
import CollectionHero from "../components/CollectionHero";
import ARButton from "../components/ARButton";

import { ArrowForwardIcon } from "@chakra-ui/icons";

type SpecialCollectionProps = {
  pageContext: {
    title: string;
    collectionHandle: string;
    description?: string;
    image?: {
      altText?: string | null;
      gatsbyImageData?: any;
      originalSrc?: string | null;
    } | null;
    products: Queries.CollectionsAndProductsIntoPagesQuery["allShopifyCollection"]["nodes"][0]["products"];
    printVersionHandles?: Record<string, string>;
  };
};

const FALLBACK_DESCRIPTIONS: Record<string, string> = {
  "human-nature":
    "Human Nature is a meditation on the body's quiet wonders — heart, lungs, brain — rendered as living landscapes. Each piece comes alive in augmented reality: point your camera, watch it breathe, and step inside the work. Tap any artwork below to explore it in Augmented reality (AR).",
};

const SpecialCollection: React.FunctionComponent<SpecialCollectionProps> = ({
  pageContext: { title, description, products, collectionHandle, image, printVersionHandles },
}): React.ReactElement => {
  const heroDescription =
    description || FALLBACK_DESCRIPTIONS[collectionHandle];
  return (
    <Container as="section" maxW={"1200px"} padding={"4rem 0.5rem"}>
      <Breadcrumb mb="2.4rem" fontSize={["sm", "md"]}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/collections">All Categories</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">{title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <CollectionHero
        title={title}
        description={heroDescription}
        image={image}
      />

      <Box mt="3rem">
        {products && products.length !== 0 ? (
          (() => {
            const isLandscape = (product: (typeof products)[0]) => {
              const img = product.featuredImage;
              return img?.originalSrc && img?.grid?.width && img?.grid?.height
                ? img.grid.width > img.grid.height
                : false;
            };

            const isSold = (product: (typeof products)[0]) =>
              product.variants.length > 0 &&
              product.variants.every((v) => v.availableForSale === false);

            const sortBySoldLast = (arr: typeof products) =>
              [...arr].sort((a, b) => Number(isSold(a)) - Number(isSold(b)));

            const portraitProducts = sortBySoldLast(
              products.filter((p) => !isLandscape(p)),
            );
            const landscapeProducts = sortBySoldLast(
              products.filter((p) => isLandscape(p)),
            );

            const renderProductCard = (product: (typeof products)[0]) => {
              const {
                id,
                shopifyId,
                featuredImage,
                title: productTitle,
                handle,
                hasOnlyDefaultVariant,
                priceRangeV2: {
                  minVariantPrice: { amount, currencyCode },
                },
              } = product;
              const featuredImageForGatsbyImage = getImage(
                featuredImage?.grid ?? null,
              );

              const model3d = product.media?.find(
                (m) => m.mediaContentType === "MODEL_3D",
              );

              const glbUrl: string =
                // @ts-expect-error sources exists on ShopifyModel3d via inline fragment
                model3d?.sources?.find(
                  (s: { format: string; url: string }) => s.format === "glb",
                )?.url ?? "";

              const usdzUrl: string =
                product.metafields?.find((f) => f?.key === "ios_3d_url")
                  ?.value ?? "";

              const soldOut = isSold(product);
              const printVersionHandle = printVersionHandles?.[shopifyId];

              return (
                <Card
                  key={`${id}-product-item`}
                  position="relative"
                  boxShadow="md"
                  height="100%"
                  as={LinkBox}
                  display="flex"
                  flexDirection="column"
                >
                  <Box
                    position="absolute"
                    top="0.75rem"
                    right="0.75rem"
                    zIndex={2}
                  >
                    {(glbUrl || usdzUrl) && (
                      <ARButton
                        glbUrl={glbUrl}
                        usdzUrl={usdzUrl}
                        productTitle={productTitle}
                        browserFallbackUrl={`https://www.brushella.art/collections/${collectionHandle}`}
                      />
                    )}
                  </Box>
                  <CardBody flex="1">
                    <Box
                      as={GatsbyLink}
                      to={`/collections/${collectionHandle}/${handle}`}
                      tabIndex={-1}
                      aria-hidden={true}
                      display="block"
                      overflow="hidden"
                      position="relative"
                      zIndex={1}
                    >
                      {featuredImageForGatsbyImage ? (
                        <GatsbyImage
                          image={featuredImageForGatsbyImage}
                          alt={featuredImage?.altText ?? productTitle}
                          objectFit="cover"
                          className="collection-card-image"
                          loading="lazy"
                          style={{
                            aspectRatio: isLandscape(product) ? "3/2" : "2/3",
                            transition:
                              "transform 2s cubic-bezier(.215,.61,.355,1)",
                          }}
                        />
                      ) : (
                        <StaticImage
                          style={{ filter: "grayscale(1)" }}
                          alt="No image available"
                          src="../images/web-asset-noimg.jpg"
                          loading="lazy"
                        />
                      )}
                    </Box>
                    <Stack mt="6" spacing="3">
                      <Divider color="gray.300" />
                      <Heading
                        as="h3"
                        id={`${handle}-title`}
                        size="md"
                        textTransform="capitalize"
                        fontWeight={600}
                        color={"pink.800"}
                        minH="normal"
                        padding={"0.5rem 0"}
                        className="text-xl translate-y-1 hover:translate-y-0 transition-transform duration-300 ease-in-out"
                      >
                        <LinkOverlay
                          key={handle}
                          as={GatsbyLink}
                          to={`/collections/${collectionHandle}/${handle}`}
                          aria-label={productTitle}
                        >
                          {productTitle}
                        </LinkOverlay>
                      </Heading>
                    </Stack>
                  </CardBody>
                  <CardFooter
                    alignItems="flex-end"
                    display="flex"
                    justifyContent="space-between"
                    minH={20}
                  >
                    {amount !== 0 && (
                      <Box>
                        {!hasOnlyDefaultVariant && (
                          <Text fontSize="xs" color="gray.500">
                            From
                          </Text>
                        )}
                        <Text
                          data-testid="item-price"
                          fontSize="sm"
                          fontWeight="bold"
                          color="pink.800"
                          lineHeight="normal"
                          textDecoration={soldOut ? "line-through" : undefined}
                        >
                          <Highlight
                            query="AUD"
                            styles={{ pr: "1", color: "#7e718a" }}
                          >
                            {currencyCode}
                          </Highlight>
                          {`$${amount}`}
                        </Text>
                      </Box>
                    )}
                    <Box>
                      {soldOut ? (
                        printVersionHandle && (
                          <GatsbyLink
                            to={`/collections/prints/${printVersionHandle}`}
                            aria-describedby={`${handle}-title`}
                            className="translate-y-1 hover:translate-y-0 transition-transform duration-300 ease-in-out"
                            style={{
                              border: "1.5px solid #8b7340",
                              color: "#8b7340",
                              padding: "0.75rem 1.5rem",
                              letterSpacing: "0.15em",
                              fontSize: "1rem",
                              fontWeight: 400,
                              transition:
                                "transform 0.5s cubic-bezier(.215,.61,.355,0.5)",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.75rem",
                              textDecoration: "none",
                              whiteSpace: "nowrap",
                              position: "relative",
                              zIndex: 1,
                            }}
                          >
                            buy print{" "}
                            <span aria-hidden="true">&rarr;</span>
                          </GatsbyLink>
                        )
                      ) : (
                        <Text
                          as={GatsbyLink}
                          to={`/collections/${collectionHandle}/${handle}`}
                          tabIndex={-1}
                          fontSize="md"
                          textAlign="right"
                          color={"pink.800"}
                          marginLeft="auto"
                          cursor={"pointer"}
                          className="translate-y-1 hover:translate-y-0 transition-transform duration-300 ease-in-out"
                        >
                          more details <Icon as={ArrowForwardIcon} />
                        </Text>
                      )}
                    </Box>
                  </CardFooter>
                </Card>
              );
            };

            return (
              <>
                {portraitProducts.length > 0 && (
                  <SimpleGrid
                    columns={[1, 2, 3, 4]}
                    spacing="3"
                    justifyItems="center"
                    mb="0.4rem"
                  >
                    {portraitProducts.map(renderProductCard)}
                  </SimpleGrid>
                )}
                {landscapeProducts.length > 0 && (
                  <SimpleGrid
                    columns={[1, 2, 3, 4]}
                    spacing="3"
                    justifyItems="center"
                    mb="0.4rem"
                  >
                    {landscapeProducts.map(renderProductCard)}
                  </SimpleGrid>
                )}
              </>
            );
          })()
        ) : (
          <Text textAlign="center" mb="2.4rem">
            There are no products available.
          </Text>
        )}
      </Box>
    </Container>
  );
};
export default SpecialCollection;

export const Head = (props: any) => {
  const { title, products, collectionHandle, description } = props.pageContext;
  const canonical = `https://www.brushella.art${props.location.pathname}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.brushella.art/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "All Categories",
        item: "https://www.brushella.art/collections/",
      },
      { "@type": "ListItem", position: 3, name: title, item: canonical },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: description || `Browse the ${title} collection by Brushella.`,
    url: canonical,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products?.length ?? 0,
      itemListElement:
        products?.map((product: any, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `https://www.brushella.art/collections/${collectionHandle}/${product.handle}/`,
          name: product.title,
          image: product.featuredImage?.originalSrc,
        })) ?? [],
    },
  };

  return (
    <SEO
      pageTitle={`${title} — Art Collection`}
      description={`Browse the ${title} collection by Brushella — original artworks and fine art prints handcrafted by Chilean artist Gabriela.`}
      canonical={canonical}
    >
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(collectionSchema)}
      </script>
    </SEO>
  );
};
