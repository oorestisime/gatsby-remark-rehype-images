import React from 'react';
import PropTypes from 'prop-types';
import { graphql, push } from 'gatsby';
import rehypeReact from 'rehype-react';
import {
  Box, Grommet, Heading, Button,
} from 'grommet';
import { grommet } from 'grommet/themes';

import FullWidth from '../components/FullWidth';
import Photo from '../components/Photo';
import GridComponent from '../components/Grid';

// eslint-disable-next-line new-cap
const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    'rehype-image': Photo,
    grid: GridComponent,
  },
}).Compiler;

const BlogPage = props => (
  <Grommet theme={grommet} full>
    <FullWidth />
    <Box
      tag="header"
      background="brand"
      pad="small"
      animation="fadeIn"
    >
      <Box direction="row-responsive" justify="center" gap="small" margin="none">
        <Heading size="medium">{props.data.markdownRemark.frontmatter.title}</Heading>
      </Box>
    </Box>
    <Box direction="row-responsive" justify="center">
      <Box width="xlarge" pad={{ horizontal: 'xlarge', vertical: 'large' }}>
        {renderAst(props.data.markdownRemark.htmlAst)}
      </Box>
    </Box>
    <Box
      direction="row-responsive"
      gap="large"
      justify="center"
      margin={{ vertical: 'xsmall' }}
    >
      <Button primary label="Back to index" onClick={() => push('/')} />
    </Box>
  </Grommet>
);

BlogPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
      htmlAst: PropTypes.arrayOf(PropTypes.shape()),
    }),
  }).isRequired,
};

export default BlogPage;

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
`;
