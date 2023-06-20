
import * as React from 'react';

type SEOProps = {
    children: React.ReactNode;
  };

const SEO: React.FunctionComponent<SEOProps> = ({ children }): React.ReactElement => {
  return (
    <>
    <html lang="en" />
    <title id="title">Brushella.com.au - welcome</title>
    <meta id="description" name="description" content="Brushella store offers art decor, crafts, clothing" />
    {children}
  </>
  );
};

export default SEO;

