import React from "react"
import ReactDOM from "react-dom/client"
import "./styles/tailwind.css"
import "./index.css"
import TextEditor from "./TextEditor"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<React.StrictMode>
		<TextEditor />
	</React.StrictMode>
)
