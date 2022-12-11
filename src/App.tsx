import React, { useState } from 'react';
import './App.css';

// * Set coordinate type for TypeScript

interface coordinateType {
	pageX: number;
	pageY: number;
}

function App() {
	// * Constants variables for coordinates and undos

	const [coordinate, setCoordinate] = useState<coordinateType[]>([]);
	const [lastUndo, setLastUndo] = useState<coordinateType[]>([]);

	// * Function to get mouse click events and save mouse's coordinate X and Y in coordinate variable and reset redo variable

	function getCoordinates(e: React.MouseEvent<HTMLElement>) {
		const { pageX, pageY } = e;

		setCoordinate([...coordinate, { pageX, pageY }]);
		setLastUndo([]);
	}

	// * Function to delete last circle created and storage it in the undo variable

	function undo() {
		const lastClicked = [...coordinate];
		const lastUndone = lastClicked.pop();
		setCoordinate(lastClicked);
		if (!lastUndo || !lastUndone) return;
		setLastUndo([...lastUndo, lastUndone]);
	}

	// * Function to re add last deleted circle in the variable coordinate and remove it from the undo variable

	function redo() {
		const undoSave = [...lastUndo];
		const newPoint = undoSave.pop();
		setLastUndo(undoSave);
		if (!newPoint) return;
		setCoordinate([...coordinate, newPoint]);
	}

	return (
		<div className='App'>
			<div className='buttons'>
				<button
					disabled={coordinate.length === 0}
					onClick={undo}
					className='button'>
					undo
				</button>
				<button
					disabled={lastUndo.length === 0}
					onClick={redo}
					className='button'>
					redo
				</button>
			</div>
			<div>
				<h1 className='credit'>
					Created by{' '}
					<a href='https://www.lymei.art' target='_blank'>
						Felipe Cardoso
					</a>
				</h1>
			</div>
			<div className='canvas' onClick={getCoordinates}>
				{coordinate.map((data, index) => {
					return (
						<div
							key={index}
							style={{
								position: 'absolute',
								left: data.pageX,
								top: data.pageY,
							}}
							className='circle'></div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
