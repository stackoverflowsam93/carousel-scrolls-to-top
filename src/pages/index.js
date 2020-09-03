import React from "react"
import { Link, graphql } from "gatsby"

import Carousel from '../components/Carousel'
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({data}) => {
  
  const squares = data.allImageSharp.edges.map((node) => {
    const {
      src,
      srcSet,
      srcSetWebp,
      srcWebp,
      sizes,
      originalName
    } = node
    return ({
      imgProps: {src, srcSet, srcWebp, srcSetWebp, sizes},
      title: originalName
    })
    
  })

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <Carousel squares={squares} triple={true} />
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query MyQuery {
    allImageSharp {
      edges {
        node {
          fluid {
            src
            originalName
            srcSet
            srcSetWebp
            srcWebp
            sizes
          }
        }
      }
    }
  }
`
