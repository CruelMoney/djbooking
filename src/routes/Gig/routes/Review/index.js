import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-apollo";
import { EVENT_REVIEW, WRITE_REVIEW } from "../../gql";
import { LoadingPlaceholder2 } from "../../../../components/common/LoadingPlaceholder";
import { Col, SmartButton } from "../../../../components/Blocks";
import { Title, Body } from "../../../../components/Text";
import { TextArea } from "../../../../components/FormComponents";
import Rating from "../../../../components/common/RatingNew";
import styled from "styled-components";
import ErrorMessageApollo from "../../../../components/common/ErrorMessageApollo";
import { gigStates } from "../../../../constants/constants";

const Content = ({ gig }) => {
  const isCancel = gig.status === gigStates.CONFIRMED;

  return (
    <Col>
      {/* <SmartButton
          warning
          loading={cancelling}
          level="secondary"
          onClick={() => doMutate()}
        >
          {isCancel ? "Cancel gig" : "Decline gig"}
        </SmartButton>
      <SmartButton
        level="primary"
        loading={saving}
        onClick={() => saveReview()}
      >
        {review && review.id ? "Update" : "Save"}
      </SmartButton>
      <ErrorMessageApollo error={error} /> */}
    </Col>
  );
};

const Offer = props => (
  <Col>
    <Title>Make offer</Title>

    <Content {...props} />
  </Col>
);

export default Offer;
