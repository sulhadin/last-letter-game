import React from 'react';

const Greeting: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>Hi!</p>
        <p>Welcome to our lovely game!</p>
        <p>
          This is a well-known letter game which is played between two people. The next word must
          start with the last letter of the previous word.
        </p>
      </header>
    </div>
  );
};

export default Greeting;
