import { useState, useContext } from "react";

import { AuthContext } from "../context/auth.context";

import axios from "axios";

const Login = () => {
	const API_URL = "http://localhost:5005";

	const { storeItems } = useContext(AuthContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const body = {
			email,
			password,
		};

		axios
			.post(`${API_URL}/login`, body)
			.then((response) => {
				storeItems(response.data.token);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<form onSubmit={handleSubmit} className="form">
			<h1>Login</h1>
			<div>
				<label htmlFor="email">Email</label>
				<input type="email" value={email} onChange={handleEmail} />
			</div>

			<div>
				<label htmlFor="password">Password</label>
				<input type="password" value={password} onChange={handlePassword} />
			</div>

			<button type="submit">Submit</button>
		</form>
	);
};

export default Login;
