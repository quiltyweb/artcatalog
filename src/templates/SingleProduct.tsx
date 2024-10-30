import React from "react";
import { Container } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import SEO from "../components/SEO";
import { PageProps } from "gatsby";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

type SingleProductProps = {
  location: PageProps["location"];
  pageContext: {
    title: string;
    id: string;
    collectionHandle: string;
    product: Queries.CollectionsAndProductsIntoPagesQuery["allShopifyCollection"]["nodes"][0]["products"][0];
  };
};

const SingleProduct: React.FunctionComponent<SingleProductProps> = ({
  location,
  pageContext,
}): React.ReactElement => {
  const pathnameArray = location.pathname.split("/");
  const categoryName = pathnameArray[2];

  return (
    <Container as="section" maxW={"1200px"} padding={"4rem 0.5rem"}>
      <Breadcrumb mb="2.4rem" fontSize={["sm", "md"]}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/collections">Categories</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/collections/${categoryName}`}>
            All {categoryName}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">{pageContext.product.title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <ProductCard product={pageContext.product} />
    </Container>
  );
};
export default SingleProduct;

export const Head = (props: any) => {
  return (
    <SEO
      pageTitle={`${props.pageContext.product.title} - Product Page`}
      description="Product page for Brushella Art and Decor store"
    />
  );
};
