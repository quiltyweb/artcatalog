import * as React from "react";
import brushellaFavicon1 from "../images/apple-touch-icon.png";
import brushellaFavicon2 from "../images/favicon-32x32.png";
import brushellaFavicon3 from "../images/favicon-16x16.png";
import brushellaFavicon4 from "../images/safari-pinned-tab.svg";
import brushellaFavicon5 from "../images/favicon.ico";

type SEOProps = {
  children: React.ReactNode;
};

const SEO: React.FunctionComponent<SEOProps> = ({
  children,
}): React.ReactElement => {
  return (
    <>
      <html lang="en" />

      <link rel="apple-touch-icon" sizes="180x180" href={brushellaFavicon1} />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={brushellaFavicon2}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={brushellaFavicon3}
      />
      <link rel="manifest" href="../images/site.webmanifest" />
      <link rel="mask-icon" href={brushellaFavicon4} color="#000000" />
      <link rel="shortcut icon" href={brushellaFavicon5} />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-config" content="../images/browserconfig.xml" />
      <meta name="theme-color" content="#ffffff" />
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
      <body className="brushella" />
      <title id="title">www.brushella.art - Welcome</title>
      <meta
        id="description"
        name="description"
        content="Brushella store offers original paintings, art decor, crafts, clothing and more"
      />
      {children}
    </>
  );
};

export default SEO;
