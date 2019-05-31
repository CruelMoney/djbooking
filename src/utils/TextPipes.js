import Formatter from "./Formatter";

//Will insert / in between values
export function datePipe(lastValue, value) {
	if (
		value.substring(value.length - 1) === "/" &&
		lastValue.substring(lastValue.length - 1) === "/"
	) {
		return lastValue;
	}
	switch (value.length) {
		case 2:
			//The case that we deleted something, return
			if (lastValue.length === 3) {
				return value.substring(0, value.length - 1);
			}

			return value + "/";

		case 5:
			//The case that we deleted something
			if (lastValue.length === 6) {
				return value.substring(0, value.length - 1);
			}

			return value + "/";

		default:
			//If trying to type anything else than numbers
			if (
				isNaN(value.substring(value.length - 1)) &&
				value.substring(value.length - 1) !== "/"
			) {
				return lastValue;
			}
			return value;
	}
}

export function datePipeCard(lastValue, value) {
	if (
		value.substring(value.length - 1) === "/" &&
		lastValue.substring(lastValue.length - 1) === "/"
	) {
		return lastValue;
	}
	switch (value.length) {
		case 2:
			//The case that we deleted something, return
			if (lastValue.length === 3) {
				return value.substring(0, value.length - 1);
			}

			return value + "/";

		default:
			//If trying to type anything else than numbers
			if (
				isNaN(value.substring(value.length - 1)) &&
				value.substring(value.length - 1) !== "/"
			) {
				return lastValue;
			}
			return value;
	}
}

export function cardNumberPipe(lastValue, value) {
	var v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
	var matches = v.match(/\d{4,16}/g);
	var match = (matches && matches[0]) || "";
	var parts = [];
	for (var i = 0, len = match.length; i < len; i += 4) {
		parts.push(match.substring(i, i + 4));
	}
	if (parts.length) {
		return parts.join(" ");
	} else {
		return value;
	}
}
