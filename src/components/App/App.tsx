import React from "react";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import "./App.css";
import Home from "../Home/Home";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Home />
		</ThemeProvider>
	);
}

export default App;

const theme = createTheme({
	overrides: {
		MuiTooltip: {
			tooltip: {
				fontSize: "14px",
				backgroundColor: "black",
			},
		},
		MuiSnackbarContent: {
			root: {
				backgroundColor: "#202225",
				color: "white",
			},
		},
		MuiAppBar: {
			colorPrimary: {
				backgroundColor: "#36393E",
				position: "absolute",
			},
		},
	},
	palette: {
		type: "dark",
		primary: {
			main: "#7289da",
		},
		secondary: {
			main: "#3ca374",
		},
	},
	typography: {
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		fontSize: 14,
		fontWeightLight: 400,
		fontWeightRegular: 500,
		fontWeightMedium: 600,
	},
});
