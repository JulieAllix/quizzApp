import React from "react";
import {Redirect, Route, Switch} from "react-router";
import {useSelector} from "react-redux";

import {PictogramCustom} from "./components/PictogramCustom";
import {SignUp} from "./pages/signUp/SignUp";
import {SignIn} from "./pages/signIn/SignIn";
import {TabsList} from "./App/TabsList";

import {State} from "@Utils/redux/store";
// @ts-ignore
import background from "../assets/images/background_1.png";
// @ts-ignore
import background2 from "../assets/images/background_2.png";
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
		<div className={'Component_App'} style={{backgroundImage: `url(${user !== null ? background2 : background})`}}>
			<div className={'Component_App__logo'}>
				<PictogramCustom name={'Brain'} width={'40px'} />
			</div>
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
