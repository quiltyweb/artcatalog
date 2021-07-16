import * as React from 'react'
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'

const IndexPage = () => {
  return (
    <Layout pageTitle="Welcome">
      <p>~ Work in progress ~</p>
      <StaticImage
        alt="acrylic paint texture"
        src="../images/brushella-texture.jpg"
      />
    </Layout>
  )
}

export default IndexPage