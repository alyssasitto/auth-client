import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth.context";

const Navbar = () => {
	const { isLoggedIn, logout } = useContext(AuthContext);
	return (
		<nav>
			{!isLoggedIn && (
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/signup">Signup</Link>
					</li>
					<li>
						<Link to="/login">Login</Link>
					</li>
				</ul>
			)}

			{isLoggedIn && (
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/profile">Profile</Link>
					</li>
					<li>
						<button onClick={() => logout()}>Logout</button>
					</li>
				</ul>
			)}
		</nav>
	);
};

export default Navbar;
