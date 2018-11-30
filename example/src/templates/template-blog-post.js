import React from "react"
import { graphql } from "gatsby"
import { push } from 'gatsby';
import rehypeReact from "rehype-react"
import { Box, Grommet, Heading, Button } from 'grommet';
import { grommet } from 'grommet/themes';

import FullWidth from '../components/FullWidth';
import Photo from "../components/Photo";


const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    "rehype-image": Photo,
  },
}).Compiler

class BlogPostRoute extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    return (
      <Grommet theme={grommet} full>
        <FullWidth />
        <Box
          tag="header"
          background="brand"
          pad="small"
          animation="fadeIn"
        >
          <Box direction="row-responsive" justify="center" gap="small" margin="none">
            <Heading size="medium">{post.frontmatter.title}</Heading>
          </Box>
        </Box>
        <Box direction="row-responsive" justify="center">
          <Box width="xlarge" pad={{ horizontal: 'xlarge', vertical: 'large' }}>
            {renderAst(post.htmlAst)}
          </Box>
        </Box>
        <Box
          direction="row-responsive"
          gap="large"
          justify="center"
          margin={{ vertical: 'xsmall' }}
        >
          <Button primary label="Back to index" onClick={() => push(`/`)}/>
        </Box>
      </Grommet>
    )
  }
}

export default BlogPostRoute

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(
      frontmatter: {
        path: { eq: $path },
      }
    ) {
      htmlAst
      frontmatter {
        title
      }
    }
  }
`
