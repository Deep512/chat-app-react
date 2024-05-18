// src/components/Sidebar.js
import React from "react"
import { IoSunny, IoMoon } from "react-icons/io5"

const Sidebar = ({
	chats,
	selectedChatId,
	onSelectChat,
	onAddChat,
	darkModeHandler,
	dark,
}) => {
	return (
		<div className="h-screen w-1/4 tracking-wide bg-white dark:bg-[#111B21]">
			<div className=" p-4 sticky top-0 bg-white shadow-md dark:shadow-black flex items-center justify-between sm: flex-col lg:flex-row dark:bg-[#111B21]">
				<h1 className=" text-xl font-bold dark:text-white">Chats</h1>
				<button
					className="text-green-500 p-2 hover:opacity-70 transition-all ease-in-out rounded-full"
					onClick={onAddChat}
				>
					Add Chat +
				</button>
				<button onClick={() => darkModeHandler()} className="dark:text-white">
					{
						dark && <IoSunny /> // render sunny when dark is true
					}
					{
						!dark && <IoMoon /> // render moon when dark is false
					}
				</button>
			</div>
			<div className="max-h-screen overflow-scroll">
				<ul>
					{chats?.map((chat) => (
						<li
							key={chat.id}
							className={`p-6 cursor-pointer border-[0.5px] border-gray-200 dark:bg-[#111B21] dark:text-white dark:border-gray-700 ${
								selectedChatId === chat.id
									? "bg-gray-300 dark:bg-gray-500"
									: "bg-white"
							} hover:bg-gray-200 dark:hover:bg-gray-400 transition-all ease-in-out`}
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
