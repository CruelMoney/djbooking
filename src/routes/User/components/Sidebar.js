import React from "react";
import styled from "styled-components";
import Arrow from "react-ionicons/lib/MdArrowRoundForward";
import { LoadingIndicator } from "../../../components/Blocks";

const Sticky = styled.div`
	position: sticky;
	top: ${({ stickyTop }) => stickyTop};
	margin-bottom: 42px;
	align-self: flex-start;
	z-index: 2;
	@media only screen and (max-width: 990px) {
		padding: 42px 0px 18px 0px;
	}
	@media only screen and (max-width: 425px) {
		display: none;
	}
`;

export const Spacing = styled.div`
	min-width: 300px;
	width: 300px;
	position: relative;
	@media only screen and (max-width: 768px) {
		min-width: 250px;
		width: 250px;
	}
	@media only screen and (max-width: 425px) {
		display: none;
	}
`;

const CardWrapper = styled(Spacing)``;

const Card = styled.div`
	background-color: #fff;
	width: 100%;
	height: 100%;
	position: relative;
	z-index: 1;
`;

const Shadow = styled.div`
	box-shadow: 0 2px 50px 0 rgba(0, 0, 0, 0.5);
	width: 85%;
	height: 94%;
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	z-index: 0;
`;

export const SidebarContent = styled.div`
	padding: 24px;
`;

const Sidebar = ({
	children,
	style,
	stickyTop,
	showCTAShadow,
	childrenBelow
}) => {
	return (
		<Sticky stickyTop={stickyTop} style={style} className={"sidebar"}>
			<CardWrapper>
				<Card>{children}</Card>
				<Shadow></Shadow>
				{showCTAShadow ? <CTAShadow /> : null}
			</CardWrapper>
			<div style={{ marginTop: "30px" }}>{childrenBelow}</div>
		</Sticky>
	);
};

const CTAIcon = styled.div`
	position: absolute;
	right: 24px;
	top: 50%;
	transform: translateY(-50%);
	transition: transform 250ms ease;
`;

const CTA = styled.button`
	width: 100%;
	height: 60px;
	background-color: #31daff;
	border: none;
	outline: none;
	font-family: "AvenirNext-Bold", Arial, Helvetica, sans-serif;
	font-size: 15px;
	color: #ffffff !important;
	letter-spacing: 1.2px;
	text-align: left;
	padding-left: 24px;
	display: flex;
	align-items: center;
	transition: all 250ms ease;
	position: relative;
	&:hover {
		color: #ffffff !important;
		background-color: #00d1ff;
		${CTAIcon} {
			transform: translate(3px, -50%);
		}
	}
`;

export const CTAButton = ({ children, loading, ...props }) => (
	<CTA {...props}>
		{children}{" "}
		<CTAIcon>{loading ? <LoadingIndicator /> : <Arrow color="#fff" />}</CTAIcon>
	</CTA>
);

export const CTAShadow = styled.div`
	box-shadow: 0px -20px 50px 20px #26deff;
	position: absolute;
	width: 100%;
	height: 0%;
	bottom: 0;
`;

export default Sidebar;
