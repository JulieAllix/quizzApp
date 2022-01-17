import {notification} from "./events";
import {Api} from "@Models/utils/Api";
import React from "react";

function responseHandler(response: Response): Promise<any> {
	let status = response.status;
	if (status !== 200) {
		return response.json().then((error) => {
			if (status !== 401) {
				notification.emit("error", (
					<code>
						{error?.message}
				</code>
			));
			}
			return Promise.reject({
				response,
				error
			});
		});
	} else {
		return response.json();
	}
}

export function get(url) {
	return fetch(url, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Accept-Language": "fr-FR",
			"Content-Type": "application/json",
		} as any,
		credentials: "include",
		mode: "cors",
	}).then(responseHandler);
}

export function post(url, body) {
	return fetch(url, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Accept-Language": "fr-FR",
			"Content-Type": "application/json",
		} as any,
		credentials: "include",
		mode: "cors",
		body: JSON.stringify(body),
	}).then(responseHandler);
}

export function upload(url, body, file) {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("body", body);

	return fetch(url, {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Accept-Language": "fr-FR",
			"Content-Type": "multipart/appContent-data",
		} as any,
		credentials: "include",
		mode: "cors",
		body: formData,
	}).then(responseHandler);
}

export const Service = new Proxy({} as { [k in Api.AllControllers]: Api.ServiceGenerator<k> }, {
	get(target, p: Api.AllControllers): Api.ServiceGenerator<typeof p> {
		return new Proxy({} as Api.ServiceGenerator<typeof p>, {
			get(cl, method: Api.Endpoints<typeof p>):
				(body: Api.BodyT<`/api/${typeof p}/${typeof method}`>) => Promise<Api.Returned<`/api/${typeof p}/${typeof method}`>> {
				return async (body: Api.BodyT<`/api/${typeof p}/${typeof method}`>): Promise<Api.Returned<`/api/${typeof p}/${typeof method}`>> => {
					return post(`/api/${p}/${method}`, body);
				};
			}
		});
	}
});
