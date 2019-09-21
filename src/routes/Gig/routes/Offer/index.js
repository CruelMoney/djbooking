import React, { useState } from "react";
import { LoadingPlaceholder2 } from "../../../../components/common/LoadingPlaceholder";
import { Col } from "../../../../components/Blocks";
import { Body, Title } from "../../../../components/Text";
import OfferForm from "../../components/blocks/OfferForm";
import Popup from "../../../../components/common/Popup";
import PayoutForm from "../../../../components/common/PayoutForm";
import { gigStates } from "../../../../constants/constants";

const Content = ({ gig, theEvent, me, showDecline }) => {
  const { userSettings, userMetadata } = me;
  const [payoutPopup, setPayoutPopup] = useState(false);

  let info =
    "Enter your price to play this gig. You can always update the offer until the organizer has confirmed.";

  return (
    <Col>
      <Popup showing={payoutPopup} onClickOutside={() => setPayoutPopup(false)}>
        <PayoutForm user={me} />
      </Popup>
      <Title>Make offer</Title>
      <Body>{info}</Body>
      <OfferForm
        showPopup={() => setPayoutPopup(true)}
        profileCurrency={userSettings.currency}
        gig={gig}
        event={theEvent}
        payoutInfoValid={!!userMetadata.bankAccount}
        showDecline={showDecline}
      />
    </Col>
  );
};

const Offer = props => (
  <Col>{props.loading ? <LoadingPlaceholder2 /> : <Content {...props} />}</Col>
);

export default Offer;
