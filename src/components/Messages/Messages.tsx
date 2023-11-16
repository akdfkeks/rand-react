import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Fade } from "@material-ui/core";
import moment from "moment";

interface Message {
	from: string;
	msg: string;
	date: string;
}

declare var PR: any;

export default function Messages(props: { msg: Message[] }) {
	const [messageIndex, setMessageIndex] = useState(12);
	const [loadMessages, setLoadMessages] = useState(false);

	let messageContainerBottomRef = document.getElementById("messagesContainerBottom");
	let messageContainerRef = document.getElementById("messagesContainer");
	let messagesLength = 0;

	useEffect(() => {
		if (messageContainerBottomRef && messageContainerRef) {
			if (loadMessages) {
				messageContainerRef.scroll(0, 60);
			} else {
				messageContainerBottomRef.scrollIntoView({ block: "end", behavior: "smooth" });
			}
		}
	}, [props.msg, loadMessages, messageContainerRef, messageContainerBottomRef]);

	const handleScrollTop = (e: any) => {
		const element = e.target;
		if (element.scrollTop > 60) {
			setLoadMessages(false);
		}
		if (element.scrollTop === 0) {
			if (messagesLength > messageIndex) {
				setTimeout(() => {
					setLoadMessages(true);
					if (messageIndex + 12 > messagesLength) {
						setMessageIndex(messagesLength);
					} else {
						setMessageIndex(messageIndex + 12);
					}
				}, 400);
			}
		}
	};

	useEffect(() => {
		PR.prettyPrint();
	});

	return (
		<React.Fragment>
			<div
				id="messagesContainer"
				className="messages-container"
				onScroll={(e) => handleScrollTop(e)}
				ref={(element) => (messageContainerRef = element)}
			>
				<List>
					{props.msg.length !== 0
						? props.msg.map((message, i) => {
								return (
									<Fade in={true} timeout={500} key={i}>
										<ListItem className="message" key={i}>
											<ListItemAvatar className="message-user-icon">
												<Avatar>
													<div className="user-avatar" />
												</Avatar>
											</ListItemAvatar>
											{
												<ListItemText
													primary={
														<div className="message-user">
															{message.from.toLowerCase()}
															<div className="message-date">{` - ${moment(
																message.date
															).calendar()}`}</div>
														</div>
													}
													secondary={message.msg}
													className="message-text"
												/>
											}
										</ListItem>
									</Fade>
								);
						  })
						: null}
				</List>
				<div ref={(element) => (messageContainerBottomRef = element)} id="messagesContainerBottom"></div>
			</div>
		</React.Fragment>
	);
}
