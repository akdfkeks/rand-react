import React, { useEffect, useState } from "react";
import SendMessage from "../SendMessage/SendMessage";
import Messages from "../Messages/Messages";
import UserList from "../UserList/UserList";
import Header from "../Header/Header";
import { Socket, io } from "socket.io-client";

let socket: Socket;
export interface Message {
	from: string;
	msg: string;
	date: string;
}

export default function Home() {
	const [userName, setUserName] = useState("");
	const [userList, setUserList] = useState<string[]>([]);
	const [isConn, setIsConn] = useState(false);
	const [sendMsg, setSendMsg] = useState("");
	const [msgs, setMsgs] = useState<Message[]>([]);

	useEffect(() => {
		socket = io("http://localhost:3001", { autoConnect: false });

		socket.on("init", (data) => {
			setUserList((prev) => [data.userName]);
			setUserName(data.userName);
			setIsConn(true);
		});

		socket.on("message", (data) => {
			// console.log(msgs);
			setMsgs((prev) => [...prev, data]);
		});

		socket.on("user.list", (data) => {
			// console.log(data);
			setUserList(data.userList);
		});

		socket.connect();

		return () => {
			setIsConn(false);
			socket.offAny();
			socket.emit("disconnect");
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		socket.emit("message", sendMsg);
	}, [sendMsg]);

	window.addEventListener("resize", () => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", `${vh}px`);
	});

	return (
		<div className="dashboard">
			<div className="grid-container">
				<div className="messages-grid">
					<Header />
					<Messages msg={msgs} />
				</div>
				<div className="user-list-grid">
					<UserList userList={userList} />
				</div>
				<div className="send-messages-grid">
					<SendMessage userName={userName} isConn={isConn} setSendMsg={setSendMsg} />
				</div>
			</div>
		</div>
	);
}
