// src/components/ChatDisplay.js
import React, { useState, useRef, useEffect } from "react"
import { IoMdSend } from "react-icons/io"

const ChatDisplay = ({ chat, handleAddMessage }) => {
	const [newMessage, setNewMessage] = useState("")
	const messagesEndRef = useRef(null)
	const inputRef = useRef(null)

	const handleSendMessage = (e) => {
		e.preventDefault()
		if (newMessage.trim() !== "") {
			const message = {
				id: Date.now(),
				user: "User",
				content: newMessage,
				timestamp: new Date().toLocaleTimeString(),
			}
			setNewMessage("")
			handleAddMessage(message, chat)
		}
	}

	useEffect(() => {
		// Scroll to the bottom of the messages when a new message is added
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
		}
		if (inputRef.current) {
			inputRef.current.focus()
		}
		setNewMessage("")
	}, [chat?.messages])

	if (!chat) {
		return (
			<div className="p-4 flex justify-center items-center bg-gray-100 dark:bg-gray-800 h-screen">
				<p className="text-xl dark:text-white">
					Select a chat to start messaging
				</p>
			</div>
		)
	}

	return (
		<div className="flex flex-col h-full tracking-wide bg-gray-200 dark:bg-gray-800">
			<div className=" sticky top-0 bg-white dark:bg-gray-700 shadow-md dark:shadow-gray-900 flex items-center">
				<h1 className="p-5 text-xl font-bold dark:text-white">{chat.name}</h1>
			</div>
			<div className="flex flex-col overflow-scroll flex-grow items-end p-6">
				{chat?.messages?.map((message) => (
					<div
						key={message.id}
						className="mb-2 bg-green-600 min-w-52 rounded-lg p-2 max-w-[40rem]"
					>
						<p className="text-sm text-orange-300 font-bold">{message.user}</p>

						<div className="flex text-white justify-between items-end">
							<p>{message.content}</p>
							<p className="text-xs italic text-gray-200">
								{message.timestamp}
							</p>
						</div>
					</div>
				))}
				<div ref={messagesEndRef} />
			</div>
			<form
				onSubmit={handleSendMessage}
				className="flex sticky bottom-0 bg-gray-300 dark:bg-gray-700 p-4"
			>
				<input
					type="text"
					ref={inputRef}
					className="flex-1 border p-2 rounded-md focus:outline-none"
					value={newMessage}
					placeholder="Type a message"
					onChange={(e) => setNewMessage(e.target.value)}
				/>
				<button
					onClick={handleSendMessage}
					className=" text-green-500 text-3xl ml-2 disabled:text-gray-600"
					disabled={!newMessage}
				>
					<IoMdSend />
				</button>
			</form>
		</div>
	)
}

export default ChatDisplay
