import React, { useState } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

interface Props {
	userName: string;
	isConn: boolean;
	setSendMsg: Function;
}

export default function SendMessage(props: Props) {
	const [chatMessage, setChatMessage] = useState("");

	function isValidMessage(msg: string) {
		let validMessage = true;

		if (msg.trim() === "") validMessage = false;
		return validMessage;
	}

	function formatMessage(msg: string) {
		return msg.replace(/(\r\n|\r|\n){3,}/g, "$1\n\n");
	}

	function handleSubmit(message: any) {
		if (isValidMessage(message.msg)) {
			message.msg = formatMessage(message.msg);
			setChatMessage("");
			props.setSendMsg(message);
		} else {
		}
	}

	function handleKeyPress(e: any) {
		if (e.key === "Enter" && !e.shiftKey) {
			handleSubmit({
				from: props.userName,
				msg: chatMessage,
			});
		}
	}

	function handleOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		if (e.target.value !== "\n") setChatMessage(e.target.value);
	}

	return (
		<React.Fragment>
			<div className="send-message-border" />
			<div className="send-message-container">
				<TextareaAutosize
					aria-label="empty textarea"
					placeholder={`Message  # `}
					className="message-text-area"
					value={chatMessage}
					onChange={(e) => handleOnChange(e)}
					onKeyDown={(e) => handleKeyPress(e)}
				/>
			</div>
		</React.Fragment>
	);
}
