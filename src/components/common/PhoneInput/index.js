import React, { useEffect, useRef } from "react";
import { Textfield } from "../Form-v2";
import { Input } from "../../FormComponents";

const PhoneInput = ({ validate = [], ...props }) => {
	const valid = useRef(() => []);

	useEffect(() => {
		import("./validator").then(({ validator }) => {
			valid.current = v => validator(v, true);
		});
	}, []);

	return (
		<Textfield {...props} type="tel" validate={[...validate, valid.current]} />
	);
};

export const PhoneInputNew = ({ ...props }) => {
	const valid = useRef(() => null);

	useEffect(() => {
		import("./validator").then(({ validator }) => {
			valid.current = validator;
		});
	}, []);

	return <Input {...props} type="tel" validation={valid.current} />;
};

export default PhoneInput;
