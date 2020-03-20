const {isFuture} = require('date-fns')
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const {format} = require('date-fns')

async function createBlogPostPages (graphql, actions) {
  const {createPage} = actions
  const result = await graphql(`
    {
      allSanityPost(filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }) {
        edges {
          node {
            id
            publishedAt
            book {
              id
              title
              quad {
                id
                title
              }
            }
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const postEdges = (result.data.allSanityPost || {}).edges || []

  postEdges
    .filter(edge => !isFuture(edge.node.publishedAt))
    .forEach((edge, index) => {
      const {id, slug = {}, publishedAt} = edge.node
      const idQuad = edge.node.book[0].quad[0].id
      const idBook = edge.node.book[0].id
      const dateSegment = format(publishedAt, 'YYYY/MM')
      const path = `/chapter/${dateSegment}/${slug.current}/`

      createPage({
        path,
        component: require.resolve('./src/templates/blog-post.js'),
        context: {id, idQuad, idBook}
      })
    })
}

async function createBookPages (graphql, actions) {
  const {createPage} = actions
  const result = await graphql(`
    {
      allSanityBook(filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const postEdges = (result.data.allSanityBook || {}).edges || []

  postEdges
    .filter(edge => !isFuture(edge.node.publishedAt))
    .forEach((edge, index) => {
      const {id, slug = {}, publishedAt} = edge.node
      const dateSegment = format(publishedAt, 'YYYY/MM')
      const path = `/book/${dateSegment}/${slug.current}/`

      createPage({
        path,
        component: require.resolve('./src/templates/book.js'),
        context: {id}
      })
    })
}
async function createQuadPages (graphql, actions) {
  const {createPage} = actions
  const result = await graphql(`
    {
      allSanityQuad(filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const postEdges = (result.data.allSanityQuad || {}).edges || []

  postEdges
    .filter(edge => !isFuture(edge.node.publishedAt))
    .forEach((edge, index) => {
      const {id, slug = {}, publishedAt} = edge.node
      console.log(edge.node)
      const dateSegment = format(publishedAt, 'YYYY/MM')
      const path = `/quad/${dateSegment}/${slug.current}/`

      createPage({
        path,
        component: require.resolve('./src/templates/quad.js'),
        context: {id}
      })
    })
}

exports.createPages = async ({graphql, actions}) => {
  await createBlogPostPages(graphql, actions)
  await createBookPages(graphql, actions)
  await createQuadPages(graphql, actions)
}
