import React from "react";
import styled from "styled-components";
import Navigation from "../../../../components/SubNavigation";
import {
	Container,
	FullWidthCol,
	Row,
	Col,
	GradientBg
} from "../../../../components/Blocks";
import { HeaderTitle } from "../../../../components/Text";

const routes = [
	{ route: "overview", label: "overview", active: true },
	{ route: "requirements", label: "requirements", active: true },
	{ route: "review", label: "review", active: true }
];

const Header = ({ theEvent, loading }) => {
	return (
		<GradientBg style={{ height: "300px" }}>
			<Container>
				<Row className="wrapper">
					<FullWidthCol>
						{loading ? null : <Content theEvent={theEvent} />}
						{typeof document !== "undefined" && (
							<Navigation routes={routes}></Navigation>
						)}
					</FullWidthCol>
				</Row>
			</Container>
		</GradientBg>
	);
};

const HeaderWrapper = styled.div`
	padding-bottom: 48px;

	@media only screen and (max-width: 425px) {
		padding-bottom: 24px;
	}
`;

const Content = ({ theEvent }) => {
	const { name, date, location } = theEvent;

	return (
		<HeaderWrapper>
			<Row middle>
				<Col style={{ flex: 1, alignItems: "flex-start" }}>
					<HeaderTitle>{name}</HeaderTitle>
				</Col>
			</Row>
		</HeaderWrapper>
	);
};

export default Header;
