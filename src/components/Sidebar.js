// src/components/Sidebar.js
import React from "react"

const Sidebar = ({ chats, selectedChatId, onSelectChat, onAddChat }) => {
	return (
		<div className="h-screen w-1/4 tracking-wide bg-white">
			<div className=" p-4 sticky top-0 bg-white shadow-md flex items-center justify-between sm: flex-col lg:flex-row">
				<h1 className=" text-xl font-bold">Chats</h1>
				<button
					className="text-green-500 p-2 hover:opacity-70 transition-all ease-in-out rounded-full"
					onClick={onAddChat}
				>
					Add Chat +
				</button>
			</div>
			<div className="max-h-screen overflow-scroll">
				<ul>
					{chats?.map((chat) => (
						<li
							key={chat.id}
							className={`p-6 cursor-pointer border-[0.5px] border-gray-200 ${
								selectedChatId === chat.id ? "bg-gray-300" : "bg-white"
							} hover:bg-gray-200 transition-all ease-in-out`}
							onClick={() => onSelectChat(chat.id)}
						>
							{chat.name}
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default Sidebar
