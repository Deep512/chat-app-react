// src/components/ChatDisplay.js
import React, { useState, useRef, useEffect } from "react"
import { IoMdSend } from "react-icons/io"

const ChatDisplay = ({ chat, handleAddMessage }) => {
	const [newMessage, setNewMessage] = useState("")
	const [selectedMessage, setSelectedMessage] = useState("")
	const [selectedFile, setSelectedFile] = useState()

	const messagesEndRef = useRef(null)
	const inputRef = useRef(null)
	const inputFileRef = useRef(null)

	const handleSendMessage = (e) => {
		e.preventDefault()
		if (newMessage.trim() !== "" || selectedFile) {
			const threadId = {
				id: Date.now(),
				messages: [],
			}
			const message = {
				id: Date.now(),
				user: "User",
				content: {
					type: `${selectedFile ? "image" : "text"}`,
					text: newMessage,
					media: {
						src: selectedFile ? URL.createObjectURL(selectedFile) : "",
						type: "image",
						altText: selectedFile ? selectedFile.name : "",
					},
				},
				threadId: threadId.id,
				timestamp: new Date().toLocaleTimeString(),
				repliedTo: selectedMessage,
			}
			setNewMessage("")
			setSelectedMessage("")
			setSelectedFile(null)
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
		if (inputFileRef.current) {
			inputFileRef.current.value = null
		}
		setNewMessage("")
	}, [chat?.messages])

	const onReplyClick = (message) => {
		switch (message.content.type) {
			case "text": {
				setSelectedMessage(message.content.text)
				break
			}
			case "image": {
				setSelectedMessage(message.content.media.altText)
				break
			}
			default: {
				return
			}
		}
	}
	const onFileChange = (event) => {
		event.target.files &&
			event.target.files.length &&
			setSelectedFile(event.target.files[0])
	}

	if (!chat) {
		return (
			<div className="p-4 flex justify-center items-center bg-gray-200 dark:bg-gray-800 h-screen w-full">
				<p className="text-xl dark:text-white">
					Select a chat to start messaging
				</p>
			</div>
		)
	}

	return (
		<div className=" flex flex-col h-full tracking-wide flex-grow bg-gray-200 dark:bg-gray-800 w-full">
			<div className=" sticky top-0 bg-white dark:bg-gray-700 shadow-md dark:shadow-gray-900 flex items-center">
				<h1 className="p-5 text-xl font-bold dark:text-white">{chat.name}</h1>
			</div>
			<div className="flex flex-col overflow-scroll flex-grow items-end p-6">
				{chat?.messages?.map((message) => (
					<>
						{message.repliedTo ? (
							<div>
								<p>{message.repliedTo}</p>
							</div>
						) : null}
						<div
							key={message.id}
							className="mb-2 bg-green-600 min-w-52 rounded-lg p-2 max-w-[40rem]"
						>
							<div className="flex justify-between items-center mb-4">
								<p className="text-sm text-orange-300 font-bold">
									{message.user}
								</p>
								<button
									className="text-sm"
									onClick={() => onReplyClick(message)}
								>
									Reply
								</button>
							</div>

							<div className="flex text-white justify-between items-end">
								{message.content.type === "text" ? (
									<p>{message.content.text}</p>
								) : message.content.type === "image" ? (
									<div className="flex flex-col">
										<img src={message.content.media.src} alt="message" />
										<p>{message.content.text}</p>
									</div>
								) : null}

								<p className="text-xs italic text-gray-200">
									{message.timestamp}
								</p>
							</div>
						</div>
					</>
				))}
				<div ref={messagesEndRef} />
			</div>
			<form
				onSubmit={handleSendMessage}
				className="flex flex-col sticky bottom-0 bg-gray-300 dark:bg-gray-700 p-4"
			>
				{selectedMessage ? <p>{selectedMessage}</p> : null}
				<div className="flex">
					<input
						type="text"
						ref={inputRef}
						className="flex-1 border dark:border-gray-400 p-2 rounded-md focus:outline-none dark:bg-gray-600 dark:caret-white"
						value={newMessage}
						placeholder="Type a message"
						onChange={(e) => setNewMessage(e.target.value)}
					/>
					<button
						onClick={handleSendMessage}
						className=" text-green-500 text-3xl ml-2 disabled:text-gray-600"
						disabled={!newMessage && !selectedFile}
					>
						<IoMdSend />
					</button>
					<input
						type="file"
						ref={inputFileRef}
						onChange={onFileChange}
						accept="image/png, image/jpeg"
						className="max-w-40"
					/>
				</div>
			</form>
		</div>
	)
}

export default ChatDisplay
