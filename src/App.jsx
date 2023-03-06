import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Cat from './assets/cat.png'

function App() {
  const [dot, setDot] = useState([]);
  const [undid, setUndid] = useState([]);

  const handleClick = (event) => {
    
    const newDot = {
      clientX: event.clientX,
      clientY: event.clientY,
    };

    setDot((prev) => [...prev, newDot]);
    setUndid([]);
  };

  const handleUndo = (event) => {
    event.stopPropagation();

    if (dot.length === 0){
      return;
    }

    const lastItem = dot[dot.length - 1];
    setUndid((prev) => [...prev, lastItem]);


    setDot((prev) => {
      const newArray = [...prev].slice(0,-1);
      return newArray;
    })
  };

  const handleRedo = (event) => {
    event.stopPropagation();
    
    if (undid.length === 0){
      return;
    }

    const recoveredDot = undid[undid.length - 1];
    setUndid((prev) => {
      const newArray = [...prev].slice(0, -1);
      return newArray;
    })
    setDot((prev) => [...prev, recoveredDot]);
  };

  return (
    <div id='page' onClick={handleClick}>
      {dot.map((item) => (
      
        <img key={''} className='dot' src={Cat} style={{ left: item.clientX, top: item.clientY }}/>
      
      ))};
      <button className='btn-grad' onClick={handleUndo}>Undo</button>
      <button className='btn-grad' onClick={handleRedo}>Redo</button>
    </div>
  )
}

export default App;
