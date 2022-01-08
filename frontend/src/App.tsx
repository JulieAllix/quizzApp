import React from "react";
import {Redirect, Route, Switch} from "react-router";
import {useSelector} from "react-redux";

import {SignUp} from "./pages/signUp/SignUp";
import {SignIn} from "./pages/signIn/SignIn";
import {TabsList} from "./App/TabsList";

import {State} from "@Utils/redux/store";
// @ts-ignore
import background from "../assets/images/background_2.jpg";
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
		<div className={'Component_App'} style={{backgroundImage: `url(${background})`}}>
			<Switch>
				<Route path="/sign-up" render={UnAuthRoute(SignUp)} exact={true}/>
				<Route path="/sign-in" render={UnAuthRoute(SignIn)} exact={true}/>

				<Route path="/app-content" render={AuthRoute(TabsList)} exact={true}/>

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
