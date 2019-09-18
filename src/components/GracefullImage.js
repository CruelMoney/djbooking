import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
export const keyframeFadeIn = keyframes`
    from { opacity: 0; }
    to   { opacity: 1; }

`;
const StyledImg = styled.img`
  opacity: 0;
  animation: ${keyframeFadeIn} 400ms ease forwards;
  animation-duration: ${({ animate }) => (animate ? "400ms" : "0ms")};
`;

function useImageLoaded({ src }) {
  const [loaded, setLoaded] = useState(false);
  React.useEffect(() => {
    if (src) {
      const mainImage = new Image();
      mainImage.onload = () => {
        setLoaded(true);
      };

      mainImage.src = src;
      return () => {
        mainImage.onload = () => {};
      };
    }
  }, [src]);

  return loaded;
}

const GracefullImage = ({ src, style, alt, ...props }) => {
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
      />
    );
  }

  return <StyledImg src={src} style={style} alt={alt} {...props} />;
};

export default GracefullImage;
