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
