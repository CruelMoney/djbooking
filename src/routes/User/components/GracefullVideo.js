import React from "react";
import styled from "styled-components";

const StyledVideo = styled.video``;

// function useVideoLoaded({ ref }) {
// 	const [loaded, setLoaded] = useState(false);
// 	React.useEffect(() => {
// 		if (ref) {
// 			ref.oncanplay = () => {
// 				setLoaded(true);
// 			};
// 			return () => {
// 				ref.oncanplay = () => {};
// 			};
// 		}
// 	}, [ref]);

// 	return loaded;
// }

const GracefullVideo = ({ ...props }) => {
	return <StyledVideo {...props} />;
};

export default GracefullVideo;
