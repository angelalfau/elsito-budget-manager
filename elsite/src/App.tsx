import React, { useState, useEffect } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import "./components/themes.css";
import Navbar from "./components/navbar";
import SignupPage from "./components/signupPage";
import BalancePage from "./components/balancePage";
// import LaunchLink from "./components/LaunchLink.tsx";
import HomePage from "./components/homePage";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
// import { Redirect } from "react-router-dom";
import { RootState } from "./reducers";
import { UserState } from "./models/userSchema";
import { loadPrefs } from "./actions/prefActions";
import {
	registerUser,
	loginUser,
	setCurrentUser,
	setUserLoading,
	logoutUser,
} from "./actions/authActions";

const App = () => {
	const user: UserState = useSelector((state: RootState) => state.auth.user);
	const darkMode = useSelector((state: RootState) => state.prefs.darkMode);
	const loaded = useSelector((state: RootState) => state.prefs.loaded);
	const dispatch = useDispatch();

	// get token from local storage
	// check if token exists, if so set user with action
	// if not, redirect user to sign up page

	useEffect(() => {
		if (!loaded) {
			dispatch(loadPrefs());
		}
		if (window.location.pathname !== "/signup" && !user.name) {
			console.log("user not logged in");
			const token = localStorage.getItem("jwtToken");
			if (token) {
				console.log("user token found, logging in");
				const decoded: UserState = jwt_decode(token);
				dispatch(setCurrentUser(decoded));
			} else {
				console.log("token not found, redirect to signup");
				// send user to signupPage
				window.location.href = "/signup";
			}
		}
	}, []);

	return (
		<div id="body-background">
			<div className={darkMode ? "darkTheme" : "lightTheme"}>
				<Navbar />
				<div id="nav-divider" />
				<Route exact path="/">
					<HomePage />
				</Route>
				<Route exact path="/signup">
					<SignupPage />
				</Route>
				<Route exact path="/balance">
					<BalancePage />
				</Route>
				{/* <Route exact path="/link">
					<LaunchLink />
				</Route> */}
			</div>
		</div>
	);
};

export default App;
