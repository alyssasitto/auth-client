import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

import IsAnonymous from "./components/IsAnonymous";
import IsPrivate from "./components/IsPrivate";

function App() {
	return (
		<div className="app">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/signup"
					element={
						<IsAnonymous>
							<Signup />
						</IsAnonymous>
					}
				/>
				<Route
					path="/login"
					element={
						<IsAnonymous>
							<Login />
						</IsAnonymous>
					}
				/>
				<Route
					path="/profile"
					element={
						<IsPrivate>
							<Profile />
						</IsPrivate>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
