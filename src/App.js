import { useEffect } from "react"

function App() {
	useEffect(() => {
		fetch("http://localhost:8000/")
			.then((response) => response.json())
			.then((data) => console.log(data))
	}, [])

	return <div className=""></div>
}

export default App
