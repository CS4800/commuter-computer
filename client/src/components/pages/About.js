import React from 'react';

function About() {
  return (
    // use React.Fragment when we don't need to put inside div
    // but JSX requires a tag so hence React.Fragment
    <React.Fragment>
      <h1>About</h1>
      <p>
        Commuter Computer web app will calculate the optimal cost between
        commuting vs local residence.
      </p>
      <p>Authors: Kevin Young, Michael Ackerman, Thuan Tang, Youngjun Woo</p>
    </React.Fragment>
  );
}

export default About;
