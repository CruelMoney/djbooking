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
import OfferForm from "../../components/blocks/OfferForm";
import Popup from "../../../../components/common/Popup";
import PayoutForm from "../../../../components/common/PayoutForm";

const Content = ({ gig, theEvent, me, translate }) => {
  const isCancel = gig.status === gigStates.CONFIRMED;
  const { userSettings, userMetadata } = me;

  const [payoutPopup, setPayoutPopup] = useState(false);

  return (
    <Col>
      <Popup showing={payoutPopup} onClickOutside={() => setPayoutPopup(false)}>
        <PayoutForm user={me} />
      </Popup>
      <OfferForm
        showPopup={() => setPayoutPopup(true)}
        profileCurrency={userSettings.currency}
        gig={gig}
        event={theEvent}
        payoutInfoValid={!!userMetadata.bankAccount}
      />
    </Col>
  );
};

const Offer = props => (
  <Col>
    <Body>
      Enter your price to play this gig. You can always update the offer until
      the organizer has confirmed.
    </Body>
    {props.loading ? <LoadingPlaceholder2 /> : <Content {...props} />}
  </Col>
);

export default Offer;
