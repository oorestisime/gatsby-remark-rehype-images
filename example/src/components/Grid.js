import React from "react"
import Img from "gatsby-image"
import { ResponsiveContext, Grid } from 'grommet';

export default class Photo extends React.Component {
  render() {
    return (
      <ResponsiveContext.Consumer>
        {size => (
          <Grid
            align="start"
            columns={size !== "small" && { count: "fill", size: "small" }}
            gap="medium"
          >
            {this.props.children.filter(child => child !== '\n').map(child => (
              <Img fluid={JSON.parse(child.props.rehyped)} />
            ))}
          </Grid>
        )}
      </ResponsiveContext.Consumer>
    )
  }
}
