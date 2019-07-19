import React, { useState } from "react";

function useImageLoaded({ src }) {
	const [loaded, setLoaded] = useState(false);
	React.useEffect(() => {
		const mainImage = new Image();
		mainImage.onload = () => {
			setLoaded(true);
		};

		mainImage.src = src;
	}, [src]);

	return loaded;
}

const GracefullImage = ({ src, style, ...props }) => {
	const loaded = useImageLoaded({
		src
	});

	if (!loaded) {
		return (
			<div
				style={{
					...style,
					backgroundColor: "#EFF2F5"
				}}
				{...props}
			></div>
		);
	}

	return <img src={src} style={style} {...props} />;
};

export default GracefullImage;
