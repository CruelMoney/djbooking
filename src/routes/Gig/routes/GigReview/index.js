import React from "react";
import { Col, TeritaryButton } from "../../../../components/Blocks";
import { Title, Body } from "../../../../components/Text";

import { gigStates } from "../../../../constants/constants";
import Review from "../../../User/components/Review";
import { LoadingPlaceholder2 } from "../../../../components/common/LoadingPlaceholder";

const Content = ({ gig, theEvent }) => {
  const { status, review } = gig || {};
  const isFinished = status === gigStates.FINISHED;

  return (
    <Col style={{ alignItems: "flex-start" }}>
      {!review && <Title>Event review</Title>}
      <div style={{ marginBottom: "30px", width: "100%" }}>
        {!isFinished && (
          <Body>
            Come back here and check the review when the gig is finished.
          </Body>
        )}
        {isFinished && !review && (
          <Body>
            The organizer has not reviewed you yet. Ask them to leave a review
            to improve your rating.
          </Body>
        )}
        {review && <Review {...review} />}
      </div>

      <TeritaryButton style={{ maxWidth: "400px", marginLeft: "-15px" }}>
        Report inappropriate review
      </TeritaryButton>
    </Col>
  );
};

const GigReview = ({ loading, ...props }) =>
  loading ? <LoadingPlaceholder2 /> : <Content {...props} />;

export default GigReview;
