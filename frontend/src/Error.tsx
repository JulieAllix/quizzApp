import * as React from "react";
import {Result} from "antd";

import "./Error.scss";
namespace Error {
	export interface Props {
	}

	export interface State {
		hasError: boolean;
	}
}

export class Error extends React.Component<Error.Props, Error.State> {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
		};
	}


	componentDidCatch(error, info) {
		//Sentry.captureException(error);

		// Display fallback UI
		this.setState({hasError: true});
	}

	public render() {
		if (this.state.hasError) {
			return (
				<div className={"error-page"}>

					<Result
						status={"error"}
						title={"Une erreur est survenue"}
						subTitle={
							<span>
								Vous pouvez tenter d'actualiser la page ou de
								revenir à l'<a href={"/"}>Accueil</a>.
							</span>
						}
					/>
				</div>
			);
		}
		return this.props.children;
	}
}
