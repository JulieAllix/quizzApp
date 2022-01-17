import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "react-dom";
import {Provider} from "react-redux";

import { App } from "./App";
import { Error } from "./Error";
import {buildStore} from "./utils/redux/store";

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.min.css';
import "primereact/resources/themes/saga-blue/theme.css";
import '../utils/prime-theme/theme.scss';
import 'react-toastify/dist/ReactToastify.css';

render(
	<Error>
		<BrowserRouter>
			<Provider store={buildStore()}>
				<App />
			</Provider>
		</BrowserRouter>
	</Error>,

	document.getElementById("body")
);
