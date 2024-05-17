import { useEffect, useState } from "react"

function App() {
	const [counter, setCounter] = useState(0)
	useEffect(() => {
		fetch("http://localhost:8000/")
			.then((response) => response.json())
			.then((data) => console.log(data))
	}, [])

	return (
		<div className="flex justify-center items-center h-screen">
			<button
				className="border border-10 p-4 bg-gray-400 rounded-md"
				onClick={() => setCounter(counter + 1)}
			>
				{counter}
			</button>
		</div>
	)
}

export default App
