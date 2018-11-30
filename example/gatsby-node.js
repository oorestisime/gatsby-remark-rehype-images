const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)


exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve(`src/templates/template-blog-post.js`)
    graphql(
      `
        {
          allMarkdownRemark(
            limit: 1000
            filter: { frontmatter: { draft: { ne: true } } }
          ) {
            edges {
              node {
                frontmatter {
                  path
                }
              }
            }
          }
        }
      `
    ).then(result => {
      if (result.errors) {
        return reject(result.errors)
      }

      // Create blog posts pages.
      result.data.allMarkdownRemark.edges.forEach(edge => {
        createPage({
          path: edge.node.frontmatter.path, // required
          component: slash(blogPostTemplate),
        })
      })

      return resolve()
    })
  })
}
