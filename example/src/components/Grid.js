import React from 'react';
import Img from 'gatsby-image';
import { ResponsiveContext, Grid } from 'grommet';

const GridComponent = props => (
  <ResponsiveContext.Consumer>
    {size => (
      <Grid
        align="start"
        columns={size !== 'small' && { count: 'fill', size: 'small' }}
        gap="medium"
      >
        {props.children.filter(child => child !== '\n').map(child => (
          <Img fluid={JSON.parse(child.props.rehyped)} />
        ))}
      </Grid>
    )}
  </ResponsiveContext.Consumer>
);

export default GridComponent;
