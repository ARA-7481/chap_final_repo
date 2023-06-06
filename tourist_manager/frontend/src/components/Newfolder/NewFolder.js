import { useState, useEffect, Fragment } from 'react';
import React from 'react';
import { Card } from 'react-bootstrap';

function NewFolder() {
  const [randomChar, setRandomChar] = useState('');
  const targetWord = 'nihil est amicus meus gratis, etiam "nihil" aliquid constat';
  let charIndex = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      const newChar = targetWord[charIndex];
      setRandomChar((prevChar) => prevChar + newChar);
      charIndex = (charIndex + 1) % targetWord.length;
    }, 1);

    return () => clearInterval(interval);
  }, []);

  return (
    <Fragment>
        <Card style={{ width: '2400px', height: '2000px', backgroundColor: 'black'}}>
      <div style={{ backgroundColor: 'black', color: 'green' }}>
        <h3>{randomChar}</h3>
      </div>
      </Card>
    </Fragment>
  );
}

export default NewFolder;