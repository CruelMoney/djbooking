import React, { useState } from "react";
import { ImageCompressor } from "../../../utils/ImageCompressor";
import { FileInput, Input } from "./FormComponents";

const ImageUploader = ({ onChange, ...props }) => {
	const [error, setError] = useState(null);

	const handleFile = async e => {
		const file = e.target.files[0];

		try {
			const { file: image, imageData: base64 } = await ImageCompressor(
				file,
				true
			);

			onChange(image);
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<Input
			type="file"
			name="picture"
			accept="image/*"
			onSave={handleFile}
			{...props}
		/>
	);
};

export default ImageUploader;
