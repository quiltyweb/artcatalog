import * as React from "react";
import { Link } from "gatsby";
import SEO from "../components/SEO";
import { Container } from "@chakra-ui/react";

const pageStyles = {
  color: "#232129",
  padding: "96px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
};

const paragraphStyles = {
  marginBottom: 48,
};
const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: "md",
};

const NotFoundPage: React.FunctionComponent = (): React.ReactElement => (
  <main style={pageStyles}>
    <Container as="section" maxW={"1200px"} padding={"4rem 0.5rem"}>
      <title>Page Not found</title>
      <h1 style={headingStyles}>Page not found</h1>
      <p style={paragraphStyles}>
        Sorry{" "}
        <span role="img" aria-label="Pensive emoji">
          😔
        </span>{" "}
        we couldn’t find what you were looking for.
        <br />
        {process.env.NODE_ENV === "development" ? (
          <>
            <br />
            Try creating a page in <code style={codeStyles}>src/pages/</code>.
            <br />
          </>
        ) : null}
        <br />
        <Link to="/">Go home</Link>.
      </p>
    </Container>
  </main>
);

export default NotFoundPage;

export const Head = (props: any) => {
  return (
    <SEO
      pageTitle="Page Not Found"
      siteTitle="Brushella"
      description="404 Error page not found"
    />
  );
};
