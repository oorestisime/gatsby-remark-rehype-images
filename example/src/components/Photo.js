import React from "react"
import Img from "gatsby-image"

export default class Photo extends React.Component {
  render() {
    const { rehyped } = this.props;
    return <Img fluid={JSON.parse(rehyped)} />;
  }
}
