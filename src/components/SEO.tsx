import * as React from "react";

type SEOProps = {
  pageTitle: string;
  description?: string;
  siteTitle?: string;
  image?: string;
  canonical?: string;
  children?: React.ReactNode;
};

const SEO: React.FunctionComponent<SEOProps> = ({
  pageTitle,
  description = "Brushella Art and Decor store",
  siteTitle = "Brushella",
  image = "/brushella-icon.svg",
  canonical,
  children,
}): React.ReactElement => {
  return (
    <>
      <html lang="en" />
      <title>
        {pageTitle} | {siteTitle}
      </title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      {canonical && <link rel="canonical" href={canonical} />}
      <link rel="icon" href={image} type="image/svg+xml" sizes="any" />
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${pageTitle} | ${siteTitle}`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteTitle} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta name="copyright" content="Brushella (Gabriela Ugalde)" />
      <meta name="dc.rights" content="All content copyright Brushella (Gabriela Ugalde). No use for AI/ML training permitted without written consent." />
      <meta name="robots" content="noai, noimageai" />
      <link rel="preconnect" href="https://cdn.shopify.com" />
      {children}
    </>
  );
};

export default SEO;
