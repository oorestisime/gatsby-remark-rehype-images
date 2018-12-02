---
path: "/examples"
title: "Remark rehyped images - examples"
draft: false
---

# Grid

<grid>
<rehype-image src="144-density.jpg"></rehype-image>
<rehype-image src="max-boettinger-109436.jpg"></rehype-image>
<rehype-image src="mikael-cho-214358.jpg"></rehype-image>
<rehype-image src="mikael-cho-214358.jpg"></rehype-image>
</grid>

using the following markdown and react component and configuration
```
<grid>
<rehype-image src="144-density.jpg"></rehype-image>
<rehype-image src="max-boettinger-109436.jpg"></rehype-image>
<rehype-image src="mikael-cho-214358.jpg"></rehype-image>
<rehype-image src="mikael-cho-214358.jpg"></rehype-image>
</grid>
```

```
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
```

```
resolve: `gatsby-remark-rehype-images`,
options: {
  tag: 'rehype-image',
  sharpFunction: 'fixed',
  width: 300,
  height: 200,
},
```
