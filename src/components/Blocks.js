import React from "react";
import styled, { css, keyframes } from "styled-components";
import Arrow from "react-ionicons/lib/MdArrowRoundForward";
import GracefullImage from "./GracefullImage";

export const Hr = styled.hr`
  border-bottom: 1px solid #e9ecf0;
  margin: 0;
`;

export const MarginBottom = styled.div`
  margin-bottom: 48px;
`;

export const Container = styled.div`
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
  @media only screen and (max-width: 768px) {
    padding: 0 15px;
  }
`;

export const Col = styled.div`
  display: ${({ tabletDown }) => (tabletDown ? "none" : "flex")};
  flex-direction: column;
  @media only screen and (max-width: 768px) {
    display: ${({ mobileHide }) => (mobileHide ? "none" : "flex")};
  }
`;
export const HideBelow = styled.div`
  display: block;
  @media only screen and (max-width: ${({ width }) => width || 425}px) {
    display: none;
  }
`;
export const ShowBelow = styled.div`
  display: none;
  @media only screen and (max-width: ${({ width }) => width || 425}px) {
    display: block;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${({ center, right }) =>
    center ? "center" : right ? "flex-end" : "flex-start"};
  align-items: ${({ middle }) => (middle ? "center" : "flex-start")};
`;

export const RowWrap = styled(Row)`
  flex-wrap: wrap;
`;

export const RowMobileCol = styled(Row)`
  @media only screen and (max-width: 425px) {
    flex-direction: column;
  }
`;

export const FullWidthCol = styled(Col)`
  width: 100%;
`;

export const Divider = styled.hr`
  border-top: 1px solid #e9ecf0;
  margin: 24px 0;
`;

const tertiaryStyle = css`
  font-family: "AvenirNext-DemiBold", Arial, Helvetica, sans-serif;
  font-size: 12px;
  color: #4d6480;
  letter-spacing: 1.04px;
`;

export const ReadMoreText = styled.span`
  ${tertiaryStyle}
  text-transform:	 uppercase;
  text-align: left;
`;

const ButtonIcon = styled.span`
  margin-left: 15px;
  top: 3px;
  display: inline-block;
  transition: transform 200ms ease;
  ${ReadMoreText}:hover & {
    transform: translateX(3px);
  }
`;

export const ReadMore = ({ color, children, ...props }) => {
  return (
    <ReadMoreText {...props}>
      {children}
      <ButtonIcon>
        <Arrow fontSize={"15px"} color={color || "#4d6480"} />
      </ButtonIcon>
    </ReadMoreText>
  );
};

export const ReadMoreButton = ({ children, onClick, style }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: 0,
        border: "none",
        display: "inline-block",
        marginRight: "auto",
        ...style
      }}
    >
      <ReadMore>{children}</ReadMore>
    </button>
  );
};

const avatarSizes = {
  extraLarge: "114px",
  large: "60px",
  small: "30px"
};

const AvatarWrapper = styled.div`
  box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  width: ${({ size }) => avatarSizes[size] || "30px"};
  min-width: ${({ size }) => avatarSizes[size] || "30px"};
  min-height: ${({ size }) => avatarSizes[size] || "30px"};
  height: ${({ size }) => avatarSizes[size] || "30px"};
  overflow: hidden;
`;

export const Avatar = ({ size, style, ...props }) => (
  <AvatarWrapper
    size={size}
    style={{
      objectFit: "cover",
      ...style
    }}
  >
    <GracefullImage
      {...props}
      style={{
        objectFit: "cover",
        height: avatarSizes[size] || "30px",
        width: avatarSizes[size] || "30px",
        minHeight: avatarSizes[size] || "30px",
        minWidth: avatarSizes[size] || "30px"
      }}
    />
  </AvatarWrapper>
);

export const Hide = styled.div`
  @media only screen and (max-width: ${({ maxWidth }) => maxWidth}) {
    display: none;
  }
`;

export const Show = styled.div`
  display: none;
  @media only screen and (max-width: ${({ maxWidth }) => maxWidth}) {
    display: block;
  }
`;

const ButtonTextStyle = css`
  font-family: "AvenirNext-DemiBold", Arial, Helvetica, sans-serif;
  font-size: 15px;
  color: #4d6480;
  text-align: center;
  line-height: 20px;
  background: transparent;
  border-radius: 4px;
  min-width: ${({ small }) => (small ? "130px" : "150px")};
  padding: 0 1em;
  height: ${({ small }) => (small ? "30px" : "40px")};
  ${({ disabled }) => (disabled ? "opacity: 0.5;" : "")}
  overflow: hidden;
  white-space: nowrap;
  display: block;
  text-overflow: ellipsis;
  max-width: 200px;
`;

export const TeritaryButton = styled.button`
  ${ButtonTextStyle}
`;

export const secondaryButtonStyle = css`
  ${ButtonTextStyle}
  background: #E9ECF0;
  margin-bottom: 0;
  :hover {
    ${({ disabled, warning }) =>
      disabled
        ? ""
        : warning
        ? `
				background: #D0021B;
				color: white;
				`
        : `
			background: #e1e5ea;
		`}
  }
`;

export const SecondaryButton = styled.button`
  ${secondaryButtonStyle}
`;

export const PrimaryButton = styled.button.attrs(
  ({ loading, ...props }) => props
)`
  ${ButtonTextStyle}
  color: #FFFFFF;
  background: #31daff;
  opacity: ${({ loading }) => (loading ? 0.5 : 1)};
  pointer-events: ${({ loading }) => (loading ? "none" : "auto")};
  :hover {
    color: #ffffff;
    background-color: #00d1ff;
  }
`;

export const AddButton = styled(TeritaryButton)`
  padding: 0;
  min-width: 0;
  /* width: auto; */
  text-align: left;
  display: inline-block;
  margin-right: auto;
  height: 18px;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const LoadingIndicator = styled.span`
  height: 24px;
  width: 24px;
  border: 3px solid #fff;
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
  display: block;
  border-color: currentColor currentColor currentColor transparent;
`;

export const GradientBg = styled.section`
  height: 318px;
  background: linear-gradient(
      -180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 100%
    ),
    ${({ coverPhoto }) =>
        coverPhoto
          ? `url(${coverPhoto.path})`
          : "linear-gradient(-56deg, #31fff5 0%, #31ffc5 11%, #00d1ff 80%, #32daff 87%)"}
      no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  flex: 1;
  display: flex;
  align-items: flex-end;
  position: sticky;
  top: -270px;
  z-index: 1;

  @media only screen and (max-width: 425px) {
    min-height: 290px;
    height: auto;
    position: relative;
    top: 0;
    padding-top: 100px;
  }
  .iconRow {
    color: #fff;
    margin-bottom: 0;
    &:first-child {
      margin-right: 30px;
    }
    svg {
      margin-right: 6px;
    }
  }
`;

export const keyframeFadeIn = keyframes`
    from { opacity: 0; }
    to   { opacity: 1; }

`;

const buttons = {
  primary: PrimaryButton,
  secondary: SecondaryButton,
  tertiary: TeritaryButton
};

export const SmartButton = ({
  level = "primary",
  onClick,
  children,
  loading,
  warning,
  ...props
}) => {
  const Button = buttons[level];

  const handleClick = e => {
    if (onClick) {
      if (warning && typeof warning === "string") {
        const confirmed = window.confirm(warning);
        if (confirmed) {
          onClick(e);
        }
      } else {
        onClick(e);
      }
    }
  };

  return (
    <Button
      onClick={handleClick}
      warning={warning}
      disabled={loading}
      {...props}
    >
      {children}
      {loading && <LoadingIndicator style={{ marginLeft: "9px" }} />}
    </Button>
  );
};
