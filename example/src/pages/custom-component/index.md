---
path: "/custom-component"
title: "Remark rehyped images"
draft: false
---

Basic idea around this component came from [this issue](https://github.com/gatsbyjs/gatsby/issues/7686)
and also [this post on using-remark](https://using-remark.gatsbyjs.org/custom-components/)

What happens in the background in the plugin is the following (first 3 steps are mostly the same like remark-images):

* parse html nodes in search for a particular tag (user configured)
* get the `src` attribute of the tag and verify that it is a local image
* call plugin-sharp on the image to generate the images
* set the rehyped attribute of the node to the JSON stringified result of the plguin-sharp response

By doing those steps in your React Component explained in the previously  mentioned article of using-remark you will receive
a prop `rehyped` containing the necessary information to be used with gatsby-image.


## Example

Let's consider the following configuration

```
{
  resolve: `gatsby-transformer-remark`,
  options: {
    plugins: [
      {
        resolve: `gatsby-remark-rehype-images`,
        options: {
          tag: 'rehype-image'
        }
      },
    ],
  },
},

```

and the following rehypeReact configuration

```
const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    "rehype-image": Photo,
  },
}).Compiler
```

the plugin would search for all the `rehype-image` tags and augment them. The Photo component
is quite simple:

```
import React from 'react';
import Img from 'gatsby-image';

const Photo = ({ rehyped }) => {
  const props = JSON.parse(rehyped);

  return (
    <Img
      fluid={props}
      style={{
        maxWidth: props.presentationWidth,
        margin: '0 auto',
      }}
    />
  );
};

export default Photo;
```

Here's the result:

<rehype-image src="jeremy-bishop-262119.jpg"></rehype-image>

## Notes

In order to better understand the different options available during the image processing, be sure to read [this](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-sharp#readme).

The package accepts as a parameter the tag, type of sharp function and you can then
specify any arguments you wish to pass on to plugin sharp.

```
const defaults = {
  tag: 'rehype-img',
  sharpFunction: 'fluid',
  maxWidth: 800,
  quality: 90,
}
```

## Looking forward to see what you build

This should open a new door for creating all new exciting components for your markdown files. Here's an example:

```
<grid>
<rehype-image src="1.jpg"></rehype-image>
<rehype-image src="2.jpg"></rehype-image>
<rehype-image src="3.jpg"></rehype-image>
</grid>
```

You could create a [grid component](/examples) that renders the children in a row.
And you can easily imagine `s/grid/gallery` or anything that comes up your mind!
