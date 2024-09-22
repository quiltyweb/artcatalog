import * as React from "react";

type SEOProps = {
  pageTitle: string;
  description?: string;
  siteTitle?: string;
  image?: string;
  children?: React.ReactNode;
};

const SEO: React.FunctionComponent<SEOProps> = ({
  pageTitle,
  description = "Brushella Art and Decor store",
  siteTitle = "Brushella",
  image = "/brushella-icon.svg",
  children,
}): React.ReactElement => {
  return (
    <>
      <html lang="en" />
      <title>
        {pageTitle} {siteTitle}
      </title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <link rel="icon" href={image} type="image/svg+xml" sizes="any" />
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
