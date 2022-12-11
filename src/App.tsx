import React, { useState } from 'react'
import './App.css'

{/* Set cordenades Type */}

interface cordenadeType {
  pageX: number
  pageY: number
}

function App() {
  const [cordenade, setCordenade] = useState<cordenadeType[]>([]);
  const [lastUndo, setLastUndo] = useState<cordenadeType[]>([]);

  function getCordenades(e: React.MouseEvent<HTMLElement>) {
    const { pageX, pageY} = e;

    setCordenade([...cordenade, {pageX, pageY}]);
    setLastUndo([]);
  }

  function undo() {
    const lastClicked = [...cordenade];
    const lastUndoned = lastClicked.pop();
    setCordenade(lastClicked);
    if (!lastUndo || !lastUndoned) return
    setLastUndo([...lastUndo, lastUndoned])
  }

  function redo() {
    const undoSave = [...lastUndo];
    const newPoint = undoSave.pop();
    setLastUndo(undoSave);
    if (!newPoint) return;
    setCordenade([...cordenade, newPoint]);
  }

  return (
    <div className="App">
      <div className='buttons'>
      <button disabled={cordenade.length === 0} onClick={undo} className='button'>undo</button>
      <button disabled={lastUndo.length === 0} onClick={redo} className='button'>redo</button>
      </div>
      <div className='canvas' onClick={getCordenades}>
        {cordenade.map((data, index) => {
        return <div key={index} style={{position: 'absolute', left: data.pageX, top: data.pageY}} className='circle'></div>
      })}
      </div>
    </div>
  )
}

export default App