import React from "react"
import ReactDOM from "react-dom/client"
import "./styles/tailwind.css"
import "./index.css"
import DemoContent from "./DemoContent"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<React.StrictMode>
		<DemoContent />
	</React.StrictMode>
)
