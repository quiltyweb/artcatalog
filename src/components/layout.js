import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components';

const Container = styled.main`
  margin: auto;
  max-width: 500px;
  font-family: sans-serif;
  .heading {
    color: rebeccapurple;
  }
  .nav-links {
    display: flex;
    list-style: none;
    padding-left: 0;
  }
  .nav-link-item {
    padding-right: 2rem;
  }
  .nav-link-text {
    color: black;
  }
`
const Layout = ({ pageTitle, children }) => {
  const data = useStaticQuery(graphql`
    query MyQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`)

  return (
    <Container>
      <title>{pageTitle} | {data.site.siteMetadata.title} </title>
      <p>{data.site.siteMetadata.title}</p>
      <nav>
        <ul className="nav-links">
          <li className="nav-link-item"><Link className="nav-link-text" to="/">Home</Link></li>
          <li className="nav-link-item"><Link className="nav-link-text" to="/about">About</Link></li>
        </ul>
      </nav>
      <h1 className="heading">{pageTitle}</h1>
      {children}
    </Container>
  )
}

export default Layout