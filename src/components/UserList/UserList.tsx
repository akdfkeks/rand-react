import React from "react";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@material-ui/core";

interface Props {
	userList: string[];
}

export default function UserList(props: Props) {
	return (
		<div className="user-list-container">
			<ListItem className="users-list-title"> Active Users </ListItem>
			<List className="users-list">
				{props.userList.length !== 0 &&
					props.userList.map((user: any, i: number) => {
						return (
							<ListItem button className="user-list-item" onClick={(e) => {}} key={i}>
								<div className="user-list-online" />
								<ListItemAvatar className="message-user-icon">
									<Avatar>
										<div className="user-avatar" />
									</Avatar>
								</ListItemAvatar>
								<ListItemText>{user}</ListItemText>
							</ListItem>
						);
					})}
			</List>
		</div>
	);
}
