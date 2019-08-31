import React from "react";
import styled from "styled-components";
import Navigation from "../../../components/SubNavigation";
import Rating from "../../../components/common/Rating";
import VerifiedBadge from "../../../components/graphics/VerifiedBadge";
import Tooltip from "../../../components/Tooltip";
import {
  Container,
  FullWidthCol,
  Row,
  ShowBelow,
  Col,
  Avatar,
  GradientBg
} from "../../../components/Blocks";
import { Spacing } from "./Sidebar";
import { Stats, CertifiedVerified } from "..";
import { HeaderTitle } from "../../../components/Text";

const getRoutesFromUser = user => {
  const routes = [{ route: "overview", label: "overview", active: true }];

  if (user) {
    const roles = user.appMetadata.roles;

    if (roles.includes("ORGANIZER")) {
      if (user.isOwn) {
        routes.push({ route: "events", label: "events" });
      }
    }
    if (roles.includes("DJ")) {
      if (user.isOwn) {
        routes.push({ route: "gigs", label: "gigs" });
      }
      routes.push({ route: "photos", label: "photos" });
      routes.push({ route: "sounds", label: "sounds" });
      routes.push({ route: "reviews", label: "reviews" });
    }

    if (user.isOwn) {
      routes.push({ route: "settings", label: "settings" });
    }
  }

  return routes;
};

const ReviewsCount = styled.p`
  opacity: 0.6;
  font-family: "AvenirNext-DemiBold", Arial, Helvetica, sans-serif;
  font-size: 15px;
  color: #ffffff;
  display: inline-block;
  margin-left: 9px;
  margin-bottom: 0;
  @media only screen and (max-width: 425px) {
    font-size: 12px;
    margin-left: 3px;
  }
`;

const RatingWrapper = styled.div`
  display: inline-block;

  @media only screen and (max-width: 425px) {
    .ratingStar {
      padding-left: 2px;
      padding-right: 2px;
      svg {
        width: 13px;
        height: 13px;
      }
    }
  }
`;

const HeaderSpacing = styled(Spacing)`
  margin-right: 60px;
  @media only screen and (max-width: 768px) {
    margin-right: 30px;
  }
`;

const Header = ({ user, loading }) => {
  return (
    <GradientBg coverPhoto={user && user.coverPhoto}>
      <Container>
        <Row className="wrapper">
          <HeaderSpacing />
          <FullWidthCol>
            {loading ? null : <UserContent user={user} />}
            {typeof document !== "undefined" && (
              <Navigation routes={getRoutesFromUser(user)}></Navigation>
            )}
          </FullWidthCol>
        </Row>
      </Container>
    </GradientBg>
  );
};

const StatsWrapper = styled.div`
  margin-top: 48px;

  @media only screen and (max-width: 425px) {
    margin-top: 24px;
  }
`;

const HeaderWrapper = styled.div`
  padding-bottom: 48px;

  @media only screen and (max-width: 425px) {
    padding-bottom: 24px;
  }
`;

const UserContent = ({ user }) => {
  const { artistName, userMetadata, appMetadata, reviews } = user;
  const { firstName } = userMetadata;
  const {
    certified,
    rating,
    identityVerified,
    experience,
    followers
  } = appMetadata;

  return (
    <HeaderWrapper>
      <Row middle>
        <Col style={{ flex: 1, alignItems: "flex-start" }}>
          <HeaderTitle>
            {artistName || firstName}
            {certified && (
              <Tooltip
                text={
                  "This dj has been certified by Cueup. The Cueup team has personally met and seen this dj play."
                }
              >
                {({ ref, close, open }) => (
                  <VerifiedBadge
                    ref={ref}
                    style={{ marginLeft: "15px" }}
                    onMouseEnter={open}
                    onMouseLeave={close}
                  />
                )}
              </Tooltip>
            )}
          </HeaderTitle>
          {rating && (
            <div>
              <RatingWrapper>
                <Rating
                  color={"#fff"}
                  emptyColor={"#ffffff99"}
                  rating={rating}
                ></Rating>
              </RatingWrapper>
              <ReviewsCount>{reviews.pageInfo.totalDocs} reviews</ReviewsCount>
            </div>
          )}

          {(experience || followers) && (
            <ShowBelow width={425}>
              <StatsWrapper>
                <Stats
                  white
                  experience={experience}
                  followers={followers}
                  marginRight={"15px"}
                />
              </StatsWrapper>
            </ShowBelow>
          )}
        </Col>
        <ShowBelow width={425}>
          <Col>
            <Avatar size="extraLarge" src={user.picture.path} />
          </Col>
        </ShowBelow>
      </Row>
      <ShowBelow width={425} style={{ marginTop: "24px" }}>
        <Row>
          <CertifiedVerified
            certified={certified}
            identityVerified={identityVerified}
          ></CertifiedVerified>
        </Row>
      </ShowBelow>
    </HeaderWrapper>
  );
};

export default Header;
