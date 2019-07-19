import React from "react";
import styled from "styled-components";
import { Container } from "./Blocks";

const AbsoluteWrapper = styled.div`
	width: 100%;
	top: 0;
	left: 0;
	position: absolute;
`;

const Sticky = styled.div`
	width: 100%;
	position: sticky;
	top: -300px;
`;

export const Spacing = styled.div`
	min-width: 300px;
	width: 300px;
	position: relative;
	margin-right: 60px;
`;

const CardWrapper = styled(Spacing)`
	margin-top: -220px;
`;

const Card = styled.div`
	background-color: #fff;
	width: 100%;
	height: 100%;
	position: relative;
	z-index: 1;
	min-height: 500px;
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

const Sidebar = () => {
	return (
		<Sticky>
			<Container>
				<CardWrapper>
					<Card></Card>
					<Shadow></Shadow>
				</CardWrapper>
			</Container>
		</Sticky>
	);
};

export default Sidebar;
