import React from 'react'
import {graphql} from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import BlogPost from '../components/blog-post'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import {toPlainText} from '../lib/helpers'

export const query = graphql`
  query BlogPostTemplateQuery($id: String!, $idQuad: String!, $idBook: String!) {
    post: sanityPost(id: { eq: $id }) {
      id
      publishedAt
      book {
        _id
        title
      }
      mainImage {
        ...SanityImage
        alt
      }
      title
      slug {
        current
      }
      _rawExcerpt(resolveReferences: { maxDepth: 15 })
      _rawBody(resolveReferences: { maxDepth: 15 })
      authors {
        _key
        author {
          image {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
          }
          name
        }
      }
    }

    allPosts: allSanityPost(
      sort: { fields: order }
      filter: { book: { elemMatch: { id: { eq: $idBook } } } }
    ) {
      edges {
        node {
          id
          title
          publishedAt
          slug {
            current
          }
        }
      }
    }

    allVerses: allSanityVerses(
      sort: { fields: [title] }
      filter: { post: { elemMatch: { id: { eq: $id } } } }
    ) {
      edges {
        node {
          post {
            _id
            title
          }
          id
          title
          _rawPost
          _rawBody
        }
      }
    }

    allBooks: allSanityBook(filter: { quad: { elemMatch: { id: { eq: $idQuad } } } }) {
      edges {
        node {
          id
          title
          description
          publishedAt
          slug {
            current
          }
        }
      }
    }
  }
`

const BlogPostTemplate = props => {
  const {data, errors} = props
  const post = data && data.post
  const allPosts = data && data.allPosts.edges
  const allVerses = data && data.allVerses.edges
  const allBooks = data && data.allBooks.edges

  return (
    <Layout>
      {errors && <SEO title='GraphQL Error' />}
      {post && (
        <SEO
          title={post.title || 'Untitled'}
          description={toPlainText(post._rawExcerpt)}
          image={post.mainImage}
        />
      )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {post && <BlogPost allBooks={allBooks} allVerses={allVerses} allPosts={allPosts} {...post} />}
    </Layout>
  )
}

export default BlogPostTemplate
