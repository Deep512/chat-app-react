import { useEffect, useState } from "react"
const useChatsListener = () => {
	const [chats, setChats] = useState([])
	useEffect(() => {
		const chats = JSON.parse(window.localStorage.getItem("chats"))
		setChats(chats)
	}, [])

	useEffect(() => {
		chats &&
			chats.length &&
			window.localStorage.setItem("chats", JSON.stringify(chats))
	}, [chats])

	return { chats, setChats }
}

export default useChatsListener
