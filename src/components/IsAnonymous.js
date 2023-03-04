import { useContext } from "react";

import { Navigate } from "react-router-dom";

import { AuthContext } from "../context/auth.context";

const IsAnonymous = (props) => {
	const { loading, isLoggedIn } = useContext(AuthContext);

	if (loading) {
		return <p>loading...</p>;
	}

	if (isLoggedIn) {
		return <Navigate to="/profile" />;
	} else {
		return props.children;
	}
};

export default IsAnonymous;
