// src/App.js
import React, { useState } from "react"

const App = () => {
	const [elements, setElements] = useState([])

	const handleAddTextClick = () => {
		const textElement = {
			id: Date.now(),
			type: "text",
			content: "",
		}
		setElements((elements) => [...elements, textElement])
	}

	const onTextInputChange = (content, idx) => {
		const updatedElements = elements
		updatedElements[idx].content = content
		setElements(updatedElements)
	}

	return (
		<div className="flex flex-col h-screen bg-gray-200 justify-center items-center">
			<button className="border p-4 bg-white" onClick={handleAddTextClick}>
				Add Text
			</button>
			<div id="text-editor-canvas" className="w-3/4 h-3/4 bg-white">
				{elements.map(({ type, id, content }, idx) =>
					type === "text" ? (
						<textarea
							key={id}
							value={content}
							className="w-full bg-gray-400"
							onChange={(e) => onTextInputChange(e.target.value, idx)}
						/>
					) : null
				)}
			</div>
		</div>
	)
}

export default App
