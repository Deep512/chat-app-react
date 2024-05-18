// src/App.js
import React, { useState } from "react"
import Sidebar from "./components/Sidebar"
import ChatDisplay from "./components/ChatDisplay"
import useChatsListener from "./hooks/useChats"

const App = () => {
	const { chats, setChats } = useChatsListener()
	const [selectedChatId, setSelectedChatId] = useState(null)

	const handleSelectChat = (chatId) => {
		setSelectedChatId(chatId)
	}

	const handleAddChat = () => {
		const newChat = {
			id: Date.now(),
			name: `Chat ${chats.length + 1}`,
			messages: [],
		}
		setChats([...chats, newChat])
	}

	const handleAddMessage = (message, selectedChat) => {
		const newChat = selectedChat
		newChat.messages = [...newChat.messages, message]
		const updatedChats = chats.map((chat) =>
			chat.id === selectedChat.id ? newChat : chat
		)
		setChats(updatedChats)
	}

	const selectedChat = chats?.find((chat) => chat.id === selectedChatId)

	return (
		<div className="flex h-screen">
			<Sidebar
				chats={chats}
				selectedChatId={selectedChatId}
				onSelectChat={handleSelectChat}
				onAddChat={handleAddChat}
			/>
			<div className="flex-grow h-screen bg-gray-200">
				<ChatDisplay chat={selectedChat} handleAddMessage={handleAddMessage} />
			</div>
		</div>
	)
}

export default App
