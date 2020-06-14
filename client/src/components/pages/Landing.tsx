import React from 'react';
import { Showcase, Button } from '../styles/styles';

const Landing = () => {
  return (
    <Showcase>
      <h1>Write once, publish everywhere</h1>
      <h2>A place for focused writing.</h2>
      <Button to='/create'>Start Writing</Button>
    </Showcase>
  );
};

export default Landing;
