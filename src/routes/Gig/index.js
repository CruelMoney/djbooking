import React, { useRef, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Route, Redirect, Switch } from "react-router-dom";
import addTranslate from "../../components/higher-order/addTranslate";
import ScrollToTop from "../../components/common/ScrollToTop";
import Footer from "../../components/common/Footer";
import { Container, Row, Col } from "../../components/Blocks";
import { useQuery } from "react-apollo";
import { GIG } from "./gql.js";
import EventHeader from "./components/blocks/EventHeader.js";
import Information from "./routes/Information/index.js";
// import Review from "./routes/Review/index.js";
import styled from "styled-components";
import { useTransition, animated } from "react-spring";
import { useMeasure } from "@softbind/hook-use-measure";
import ChatSidebar from "./components/ChatSidebar";
import { gigStates } from "../../constants/constants";

const Index = ({ translate, match, location }) => {
  const {
    params: { id }
  } = match;
  const { data = {}, loading } = useQuery(GIG, {
    skip: !id,
    variables: {
      id
    }
  });

  const { gig } = data;

  if (!loading && !gig) {
    return <Redirect to={translate("routes./not-found")} />;
  }
  const { event, status } = gig || {};

  const title = event ? event.name : "Cueup | Event";
  const description = event ? event.description : null;
  if (gig) {
    gig.showInfo = status === gigStates.CONFIRMED;
  }

  return (
    <div>
      {event && (
        <Helmet>
          <title>{title}</title>
          <meta property="og:title" content={title} />
          <meta name="twitter:title" content={title} />

          <meta name="description" content={description} />
          <meta name="twitter:description" content={description} />
          <meta property="og:description" content={description} />
        </Helmet>
      )}

      <Content
        location={location}
        match={match}
        theEvent={event}
        gig={gig}
        loading={loading}
        translate={translate}
      />

      <Footer
        noSkew
        firstTo={translate("routes./how-it-works")}
        secondTo={translate("routes./")}
        firstLabel={translate("how-it-works")}
        secondLabel={translate("arrange-event")}
        title={translate("Organizing a new event?")}
        subTitle={translate("See how it works, or arrange an event.")}
      />
    </div>
  );
};

const idxRoute = path => {
  if (path.includes("review")) {
    return 2;
  }
  if (path.includes("requirements")) {
    return 1;
  }
  return 0;
};

let curIdx = 0;

const getDirection = newPath => {
  const newIdx = idxRoute(newPath);
  let dir = "back";
  if (newIdx > curIdx) {
    dir = "front";
  }
  curIdx = newIdx;
  return dir;
};

const Content = React.memo(props => {
  const { match, location, theEvent, loading, gig } = props;
  const { organizer } = theEvent || {};

  const [height, setHeight] = useState("auto");
  const direction = getDirection(location.pathname);

  const transitions = useTransition(location, location => location.pathname, {
    config: {
      tension: 500,
      friction: 40,
      precision: 0.001
    },
    from: {
      opacity: 0,
      transform: `translateX(${direction === "back" ? "-100px" : "100px"}`
    },
    enter: { opacity: 1, transform: "translateX(0px)" },
    leave: {
      opacity: 0,
      transform: `translateX(${direction === "back" ? "100px" : "-100px"}`
    }
  });

  return (
    <div>
      <ScrollToTop animate top={280} />

      <EventHeader theEvent={theEvent} loading={loading} />

      <GigContainer>
        <ContainerRow>
          <BorderCol style={{ height: height || "auto" }}>
            <Switch>
              <Redirect exact from={"/gig/:id"} to={"/gig/:id/information"} />
            </Switch>
            <AnimationWrapper>
              {transitions.map(({ item, props, key }) => (
                <TransitionComponent
                  item={item}
                  style={props}
                  key={key}
                  match={match}
                  gig={gig}
                  registerHeight={setHeight}
                />
              ))}
            </AnimationWrapper>
          </BorderCol>
          <Col>
            <ChatSidebar
              theEvent={theEvent}
              gig={gig}
              loading={loading}
              organizer={organizer}
            />
          </Col>
        </ContainerRow>
      </GigContainer>
    </div>
  );
});

const TransitionComponent = ({ style, item, match, gig, registerHeight }) => {
  const ref = useRef(null);
  const { bounds } = useMeasure(ref, "bounds");

  useEffect(() => {
    if (bounds) {
      registerHeight(bounds.height);
    }
  }, [bounds, registerHeight]);

  return (
    <animated.div style={style} ref={ref}>
      <Switch location={item}>
        <Route
          path={match.path + "/information"}
          render={props => <Information {...props} gig={gig} />}
        />
        {/* <Route
          path={match.path + "/review"}
          render={props => <Review {...props} {...gig} />}
        /> */}
      </Switch>
    </animated.div>
  );
};

const ContainerRow = styled(Row)`
  align-items: stretch;
  padding-top: 60px;
  padding-bottom: 60px;
  @media only screen and (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const BorderCol = styled(Col)`
  padding-right: 42px;
  width: 100%;
  z-index: 0;
  @media only screen and (max-width: 768px) {
    border-right: none;
    padding-right: 0;
  }
`;

const AnimationWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  > div {
    position: absolute;
    transform-origin: center center;
    max-width: 100%;
    width: 100%;
  }
`;

const GigContainer = styled(Container)`
  .sidebar {
    margin-top: -250px;
    margin-left: 60px;
    padding: 0;
  }
`;

export default addTranslate(Index);
