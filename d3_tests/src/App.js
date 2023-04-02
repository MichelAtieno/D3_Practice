import React, { useState } from 'react';
import './App.css';
import BarChart from './BarChart';

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
 
  return (
    <React.Fragment>
      <div className="container">
        <BarChart data={data}/>
        <button onClick={() => setData(data.map(value => value + 5))}>
          Update Data
        </button>
        <button onClick={() => setData(data.filter(value => value < 35))}>
          Filter Data
        </button>
        <button
        onClick={() => setData([...data, Math.round(Math.random() * 100)])}
        >
          Add Data
        </button>
      </div>
   </React.Fragment>
  );
}

export default App;
