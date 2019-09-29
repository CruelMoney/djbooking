import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
export const keyframeFadeIn = keyframes`
    from { opacity: 0; }
    to   { opacity: 1; }

`;
const StyledImg = styled(({ animate, keyframeFadeIn, alt, ...rest }) => (
  <img alt={alt} {...rest} />
))`
  opacity: 0;
  animation: ${keyframeFadeIn} 400ms ease forwards;
  animation-duration: ${({ animate }) => (animate ? "400ms" : "1ms")};
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

const GracefullImage = ({ src, style, alt, animate, ...props }) => {
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

  return (
    <StyledImg src={src} style={style} alt={alt} animate={animate} {...props} />
  );
};

export default GracefullImage;
