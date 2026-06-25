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
  Icon,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import SEO from "../components/SEO";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { formatPrice } from "../utils/formatPrice";
import { useMarket } from "../context/MarketContext";

type MarketPrice = { amount: number; currencyCode: string };

type CollectionProps = {
  pageContext: {
    title: string;
    collectionHandle: string;
    description?: string;
    products: Queries.CollectionsAndProductsIntoPagesQuery["allShopifyCollection"]["nodes"][0]["products"];
    printVersionHandles?: Record<string, string>;
    marketPricesByCountry?: Record<string, Record<string, MarketPrice>>;
  };
};

const Collection: React.FunctionComponent<CollectionProps> = ({
  pageContext: {
    title,
    description,
    products,
    collectionHandle,
    printVersionHandles,
    marketPricesByCountry,
  },
}): React.ReactElement => {
  const { countryCode } = useMarket();
  const currentMarketPrices = marketPricesByCountry?.[countryCode];

  return (
    <Container
      as="section"
      maxW={"1200px"}
      padding={"4rem 0.5rem"}
      paddingTop={["2rem", "4rem"]}
    >
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
      <Heading as="h2" color="teal.600" textTransform="capitalize" mb="2.4rem">
        {title}
      </Heading>
      {description && (
        <Text
          maxWidth={["100%", "100%", "60%"]}
          mb="2.4rem"
          lineHeight={7}
          fontWeight={"medium"}
          id="collection-description"
          data-testid="collection-description"
          wordBreak="normal"
          display={["none", "block"]}
        >
          {description}
        </Text>
      )}

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

          const visibleProducts = currentMarketPrices
            ? products.filter((p) => p.shopifyId && p.shopifyId in currentMarketPrices)
            : products;

          const giftCardProducts = visibleProducts.filter((p) => p.isGiftCard);
          const regularProducts = visibleProducts.filter((p) => !p.isGiftCard);
          const portraitProducts = sortBySoldLast(
            regularProducts.filter((p) => !isLandscape(p)),
          );
          const landscapeProducts = sortBySoldLast(
            regularProducts.filter((p) => isLandscape(p)),
          );

          const renderProductCard = (product: (typeof products)[0]) => {
            const {
              id,
              shopifyId,
              featuredImage,
              title,
              handle,
              hasOnlyDefaultVariant,
              isGiftCard,
              description,
              priceRangeV2: {
                minVariantPrice: {
                  amount: buildTimeAmount,
                  currencyCode: buildTimeCurrency,
                },
              },
            } = product;
            const marketPrice = shopifyId ? currentMarketPrices?.[shopifyId] : undefined;
            const amount = marketPrice?.amount ?? buildTimeAmount;
            const currencyCode = marketPrice?.currencyCode ?? buildTimeCurrency;

            const featuredImageForGatsbyImage = getImage(
              featuredImage?.grid ?? null,
            );
            const soldOut = isSold(product);
            const printVersionHandle = printVersionHandles?.[shopifyId];

            return (
              <Card key={handle} as={LinkBox} boxShadow="md" height="100%">
                <CardBody>
                  <Box
                    as={Link}
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
                        alt={featuredImage?.altText ?? title}
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
                        style={{
                          filter: "grayscale(1)",
                        }}
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
                        as={Link}
                        to={`/collections/${collectionHandle}/${handle}`}
                      >
                        {title}
                      </LinkOverlay>
                    </Heading>
                    {isGiftCard && description && (
                      <Text fontSize="sm" color="gray.600" lineHeight="tall">
                        {description}
                      </Text>
                    )}
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
                        {formatPrice({ currency: currencyCode, value: amount })}{" "}
                        {currencyCode}
                      </Text>
                    </Box>
                  )}

                  {soldOut ? (
                    printVersionHandle && (
                      <Link
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
                          marginLeft: "auto",
                        }}
                      >
                        buy print <span aria-hidden="true">&rarr;</span>
                      </Link>
                    )
                  ) : (
                    <Text
                      as={Link}
                      to={`/collections/${collectionHandle}/${handle}`}
                      tabIndex={-1}
                      fontSize="md"
                      textAlign="right"
                      color={"pink.800"}
                      marginLeft="auto"
                      className="translate-y-1 hover:translate-y-0 transition-transform duration-300 ease-in-out"
                    >
                      more details <Icon as={ArrowForwardIcon} />
                    </Text>
                  )}
                </CardFooter>
              </Card>
            );
          };

          if (visibleProducts.length === 0) {
            return (
              <Text textAlign="center" mb="2.4rem">
                No products are available in the selected currency.
              </Text>
            );
          }

          return (
            <>
              {(giftCardProducts.length > 0 || portraitProducts.length > 0) && (
                <SimpleGrid
                  columns={[1, 2, 3, 4]}
                  spacing="3"
                  justifyItems="center"
                  mb="0.4rem"
                >
                  {giftCardProducts.map(renderProductCard)}
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
      {description && (
        <Text
          maxWidth="100%"
          mt="2.4rem"
          mb="2.4rem"
          lineHeight={7}
          fontWeight={"medium"}
          aria-hidden={true}
          wordBreak="normal"
          display={["block", "none"]}
        >
          {description}
        </Text>
      )}
      <Box textAlign="center" mb="2.4rem" mt="2.4rem">
        <Link
          key={collectionHandle}
          to={`/product-categories/${collectionHandle}`}
          style={{ textDecoration: "underline" }}
        >
          About the {title} Collection
        </Link>
      </Box>
    </Container>
  );
};
export default Collection;

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
