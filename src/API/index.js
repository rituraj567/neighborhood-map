class Helper {
	static baseURL() {
		return "https://api.foursquare.com/v2";
	}
	static auth() {
		const keys = {
			client_id: "S0UGOAIG5NPO3ZF3YX32KRCZGYWC0KIUMEQ3G43OQIB5R0JJ",
			client_secret: "JWNZ1ZJWXNLSHBMEPWH5SRPKGQXCBZUOFB0YQ2K5WBBMOLT5",
			v: "20181018"
		};

		return Object.keys(keys)
			.map(key => `${key}=${keys[key]}`)
			.join("&");
	}

	static urlBuilder(urlPrams) {
		if (!urlPrams) {
			return "";
		}
		return Object.keys(urlPrams)
			.map(key => `${key}=${urlPrams[key]}`)
			.join("&");
	}

	static headers() {
		return {
			Accept: "application/json"
		};
	}

	static simpleFetch(endPoint, method, urlPrams) {
		let requestData = {
			method,
			headers: Helper.headers()
		};
		return fetch(
			`${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(
				urlPrams
			)}`,
			requestData
		).then(res => res.json());
	}
}

export default class SquareAPI {
	static search(urlPrams) {
		return Helper.simpleFetch("/venues/search", "GET", urlPrams);
	}
	static getVenueDetails(VENUE_ID) {
		return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");
	}
	static geVenuetPhotos(VENUE_ID) {
		return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");
	}
}
