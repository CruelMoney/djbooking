import React, { useState } from "react";
import { ImageCompressor } from "../../../utils/ImageCompressor";
import { Input } from "./FormComponents";

const ImageUploader = ({ saveData, ...props }) => {
	const [error, setError] = useState(null);

	const handleFile = async (_, e) => {
		const file = e.target.files[0];

		try {
			const { file: image, imageData: base64 } = await ImageCompressor(
				file,
				true
			);

			saveData(image);
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
