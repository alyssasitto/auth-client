import { useState, useEffect, createContext } from "react";

import axios from "axios";

const AuthContext = createContext();

function AuthProviderWrapper(props) {
	const API_URL = "http://localhost:5005";

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);

	const storeItems = (token) => {
		localStorage.setItem("token", token);
		localStorage.setItem("timestamp", Date.now());
	};

	const hasTokenExpired = () => {
		const token = localStorage.getItem("token");
		const timestamp = localStorage.getItem("timestamp");

		if (!token || !timestamp) {
			return false;
		}

		const timePassed = Date.now() - Number(timestamp);

		return timePassed > 3600000;
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("timestamp");

		window.location.reload();
	};

	const authenticateUser = () => {
		const token = localStorage.getItem("token");

		if (!token || hasTokenExpired()) {
			setIsLoggedIn(false);
			setLoading(false);
			setUser(null);
		} else {
			axios
				.get(`${API_URL}/verify`, { headers: { token } })
				.then((response) => {
					setLoading(false);
					setUser(response.data.user);
					setIsLoggedIn(true);
					console.log(response);
				})
				.catch((err) => {
					console.log(err);
					setIsLoggedIn(false);
					setLoading(false);
					setUser(null);
				});
		}
	};

	useEffect(() => {
		authenticateUser();
	}, []);

	return (
		<AuthContext.Provider value={{ storeItems, isLoggedIn, loading, logout }}>
			{props.children}
		</AuthContext.Provider>
	);
}

export { AuthContext, AuthProviderWrapper };
