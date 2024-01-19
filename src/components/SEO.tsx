import * as React from "react";

type SEOProps = {
  children: React.ReactNode;
};

const SEO: React.FunctionComponent<SEOProps> = ({
  children,
}): React.ReactElement => {
  return (
    <>
      <html lang="en" />
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
