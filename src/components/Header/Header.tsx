import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export default function Header() {
	return (
		<AppBar position="static" className="appbar">
			<Toolbar className="navbar">
				<Typography variant="h6">{"Random Chat"} </Typography>
			</Toolbar>
		</AppBar>
	);
}
