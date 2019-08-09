import React from "react";
import styled, { css } from "styled-components";
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
	@media only screen and (max-width: 425px) {
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

export const ReadMore = ({ children, ...props }) => {
	return (
		<ReadMoreText {...props}>
			{children}
			<ButtonIcon>
				<Arrow fontSize={"15px"} color={"#4d6480"} />
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
	font-family: "AvenirNext-DemiBold", Arial, Helvetica, sans-serif;;
	font-size: 15px;
	color: #4d6480;
	text-align: center;
	line-height: 20px;
	background: transparent;
	border-radius: 4px;
	min-width: 150px;
	height: 40px;
`;

export const TeritaryButton = styled.button`
	${ButtonTextStyle}
`;

export const SecondaryButton = styled.button`
	${ButtonTextStyle}
	background: #E9ECF0;
	color: #ffffff;
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
