import React from "react";
import {Redirect, Route, Switch} from "react-router";
import {useSelector} from "react-redux";

import {AppContent} from "./pages/appContent/AppContent";
import {SignUp} from "./pages/signUp/SignUp";
import {SignIn} from "./pages/signIn/SignIn";

import {State} from "@Utils/redux/store";
import "./App.scss";

export function App() {
	const user = useSelector((state: State) => state.user);

	console.log('user', user);

	const UnAuthRoute = (Component: any) => {
		return (props: any) => {
			if (user !== null) {
				return <Redirect to={"/app-content"}/>
			} else {
				return <Component {...props} />;
			}
		}
	};

	const AuthRoute = (Component: any) => {
		return (props: any) => {
			if (user === null) {
				return <Redirect to={"/sign-in"}/>;
			} else {
				return <Component {...props} />;
			}
		}
	};

	return (
		<div className={'Component-App'}>
			<Switch>
				<Route path="/register" render={UnAuthRoute(SignUp)} exact={true}/>
				<Route path="/sign-in" render={UnAuthRoute(SignIn)} exact={true}/>

				<Route path="/app-content" render={AuthRoute(AppContent)} exact={true}/>

				<Route path="/" exact={true} render={(props) => {
					if (user === null) {
						return <Redirect to="/sign-in"/>
					} else {
						return <Redirect to="/app-content"/>
					}
				}}/>
			</Switch>
		</div>
	);
}
