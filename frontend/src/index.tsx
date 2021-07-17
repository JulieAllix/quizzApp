import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "react-dom";
import {Provider} from "react-redux";

import { App } from "./App";
import { Error } from "./Error";
//import {StatusWeb} from "./components/StatusWeb";
import {buildStore} from "./utils/redux/store";

require("antd/dist/antd.less");


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
