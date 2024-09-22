import React from "react";
import { Box } from "@chakra-ui/react";
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
    <Box>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
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
    </Box>
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
