import * as React from "react";
import { useSiteMetadata } from "../hooks/use-site-metadata";

type SEOProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  pathname: string;
};

const SEO: React.FunctionComponent<SEOProps> = ({
  title,
  description,
  pathname,
  children,
}): React.ReactElement => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    image,
    siteUrl,
  } = useSiteMetadata();

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image}`,
    url: `${siteUrl}${pathname || ``}`,
  };
  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <link rel="icon" href={seo.image} type="image/svg+xml" sizes="any" />

      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {children}
    </>
  );
};

export default SEO;
