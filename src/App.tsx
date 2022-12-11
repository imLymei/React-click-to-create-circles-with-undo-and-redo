import React, { useState } from 'react'
import './App.css'

{/* Set coordinates Type */}

interface coordinateType {
  pageX: number
  pageY: number
}

function App() {
  const [coordinate, setCoordinate] = useState<coordinateType[]>([]);
  const [lastUndo, setLastUndo] = useState<coordinateType[]>([]);

  function getCoordinates(e: React.MouseEvent<HTMLElement>) {
    const { pageX, pageY} = e;

    setCoordinate([...coordinate, {pageX, pageY}]);
    setLastUndo([]);
  }

  function undo() {
    const lastClicked = [...coordinate];
    const lastUndone = lastClicked.pop();
    setCoordinate(lastClicked);
    if (!lastUndo || !lastUndone) return
    setLastUndo([...lastUndo, lastUndone])
  }

  function redo() {
    const undoSave = [...lastUndo];
    const newPoint = undoSave.pop();
    setLastUndo(undoSave);
    if (!newPoint) return;
    setCoordinate([...coordinate, newPoint]);
  }

  return (
    <div className="App">
      <div className='buttons'>
      <button disabled={coordinate.length === 0} onClick={undo} className='button'>undo</button>
      <button disabled={lastUndo.length === 0} onClick={redo} className='button'>redo</button>
      </div>
      <div>
        <h1 className='credit'>Created by <a href='https://www.lymei.art' target='_blank'>Felipe Cardoso</a></h1>
      </div>
      <div className='canvas' onClick={getCoordinates}>
        {coordinate.map((data, index) => {
        return <div key={index} style={{position: 'absolute', left: data.pageX, top: data.pageY}} className='circle'></div>
      })}
      </div>
    </div>
  )
}

export default App