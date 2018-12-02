import React from 'react';
import {
  Box, Grommet, Heading, Text, Paragraph, Anchor, Button,
} from 'grommet';
import { push } from 'gatsby';
import { grommet } from 'grommet/themes';
import { Github, Install } from 'grommet-icons';
import FullWidth from '../components/FullWidth';


const IndexPage = () => (
  <Grommet theme={grommet}>
    <FullWidth />
    <Box
      tag="header"
      background="brand"
      pad="small"
      animation="fadeIn"
    >
      <Box direction="row-responsive" justify="center" gap="small" margin="none">
        <Heading size="medium">Gatsby remark rehype images</Heading>
      </Box>
    </Box>
    <Box align="center" margin="xsmall">
      <Paragraph size="large" textAlign="left">
        Parses html style tags in markdown files with an src attribute pointing to a
        local image, uses plugin-sharp on the image and inserts the result in
        rehyped attribute.
        <br />
        <br />
        You can then load it in your React Component and call
        gatsby-image to get all of the goodies (blur effect etc) or even apply
        custom styles and create galleries etc!
      </Paragraph>
    </Box>
    <Box
      direction="row-responsive"
      gap="large"
      justify="center"
      margin={{ vertical: 'medium' }}
    >
      <Anchor
        target="_blank"
        href="https://www.npmjs.com/package/gatsby-remark-rehype-images"
        icon={<Install color="brand" size="large" />}
        label={<Text size="large">Released on NPM</Text>}
      />
      <Anchor
        target="_blank"
        a11yTitle="Share feedback on Github"
        href="https://github.com/oorestisime/gatsby-remark-rehype-images"
        icon={<Github color="brand" size="large" />}
        label={<Text size="large">Code on Github</Text>}
      />
    </Box>
    <Box
      direction="row-responsive"
      gap="large"
      justify="center"
      margin={{ vertical: 'xsmall' }}
    >
      <Button primary label="Details and configuration configuration" onClick={() => push('/custom-component/')} />
      <Button primary label="Grid example" onClick={() => push('/examples/')} />
    </Box>
  </Grommet>
);

export default IndexPage;
