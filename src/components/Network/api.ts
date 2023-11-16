import axios from "axios";

export const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3001" : process.env.REACT_APP_API_URL;

export default axios.create({
	baseURL: baseUrl,
});
