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
      <body className="brushella" />
      <title id="title">Brushella.com.au - Welcome</title>
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
