import React from 'react';
import ReactDOM from 'react-dom';

const Tile = ({ mark }) => {
  const [value, setValue] = useState('');

  return <button onClick={() => setValue(mark)}>{value}</button>;
};

export default Tile;
