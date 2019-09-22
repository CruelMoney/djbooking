import React, { useState } from "react";
import { LoadingPlaceholder2 } from "../../../../../components/common/LoadingPlaceholder";
import EmptyPage from "../../../../../components/common/EmptyPage";
import { connect } from "react-redux";
import { localize } from "react-localize-redux";
import { Query } from "react-apollo";
import { MY_GIGS } from "../../../../../components/gql";
import GigCard from "./GigCard";
import { Col, Row, HideBelow } from "../../../../../components/Blocks";
import { Title } from "../../../../../components/Text";
import Checkbox from "../../../../../components/Checkbox";

const Gigs = props => {
  const {
    translate,
    notifications,
    user,
    currentLanguage,
    loading: loadingUser
  } = props;

  const [filter, setFilter] = useState([]);
  const toggleFilter = key => val =>
    setFilter(ff => (val ? [...ff, key] : ff.filter(f2 => f2 !== key)));

  const renderGigs = gigs => {
    const renderGigs = gigs.filter(
      ({ status }) =>
        status !== "DECLINED" &&
        status !== "CANCELLED" &&
        (filter.length === 0 || filter.includes(status))
    );

    if (renderGigs.length === 0) {
      return (
        <EmptyPage message={<div>{translate("no-gigs-description")}</div>} />
      );
    } else {
      return renderGigs.map((gig, idx) => {
        const notification = notifications.find(noti => {
          return String(noti.room) === String(gig.id);
        });
        return (
          <GigCard
            idx={idx}
            translate={translate}
            hasMessage={notification}
            key={gig.id}
            gig={gig}
            user={user}
          />
        );
      });
    }
  };

  return (
    <Query
      query={MY_GIGS}
      variables={{ limit: 1000, locale: currentLanguage }}
      onError={console.log}
    >
      {({ data = {}, loading }) => {
        if (loading || loadingUser) {
          return <LoadingPlaceholder2 />;
        }

        const { myGigs = {} } = data;
        const { edges: gigs = [] } = myGigs;

        return (
          <Row>
            <Col style={{ flex: 1 }}>{gigs && renderGigs(gigs)}</Col>
            <HideBelow width={420}>
              <Col style={{ marginLeft: "42px", width: "185px" }}>
                <Title style={{ marginBottom: "36px" }}>Filter</Title>
                <Checkbox
                  style={{ marginBottom: "12px" }}
                  label={"Confirmed"}
                  onChange={toggleFilter("CONFIRMED")}
                />
                <Checkbox
                  style={{ marginBottom: "12px" }}
                  label={"Requested"}
                  onChange={toggleFilter("REQUESTED")}
                />
                <Checkbox
                  style={{ marginBottom: "12px" }}
                  label={"Accepted"}
                  onChange={toggleFilter("ACCEPTED")}
                />
                <Checkbox
                  style={{ marginBottom: "12px" }}
                  label={"Finished"}
                  onChange={toggleFilter("FINISHED")}
                />
                <Checkbox
                  style={{ marginBottom: "12px" }}
                  label={"Lost"}
                  onChange={toggleFilter("LOST")}
                />
              </Col>
            </HideBelow>
          </Row>
        );
      }}
    </Query>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    notifications: state.notifications.data
  };
}

const SmartGigs = connect(mapStateToProps)(Gigs);

export default localize(SmartGigs, "locale");
