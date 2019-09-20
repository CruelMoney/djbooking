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
import { HeaderTitle, BodyBold } from "../../../../components/Text";
import { Spacing } from "../../../../components/Sidebar";

const routes = [
  { route: "information", label: "information", active: true },
  { route: "offer", label: "offer", active: true },
  { route: "review", label: "review", active: true }
];

const StyledGradientBg = styled(GradientBg)`
  height: 300px;
  top: -252px;
`;

const Header = props => {
  return (
    <StyledGradientBg>
      <Container>
        <Row className="wrapper">
          <FullWidthCol>
            {props.loading ? null : <Content {...props} />}
            {typeof document !== "undefined" && (
              <Navigation routes={routes} mobileLabel="Event" />
            )}
          </FullWidthCol>
          <Spacing large />
        </Row>
      </Container>
    </StyledGradientBg>
  );
};

const HeaderWrapper = styled.div`
  padding-bottom: 24px;
`;

const Content = ({ theEvent, statusHumanized }) => {
  const { name, start, location } = theEvent;

  return (
    <HeaderWrapper>
      <Row middle>
        <Col style={{ flex: 1, alignItems: "flex-start" }}>
          <HeaderTitle>{name}</HeaderTitle>
          <BodyBold
            white
            opacity={0.75}
            style={{ margin: 0, whiteSpace: "pre" }}
          >
            {location.name}
            {"  ·  "}
            {start.formattedDate}
          </BodyBold>
          <BodyBold white opacity={0.75} style={{ margin: 0 }}>
            {statusHumanized}
          </BodyBold>
        </Col>
      </Row>
    </HeaderWrapper>
  );
};

export default Header;
