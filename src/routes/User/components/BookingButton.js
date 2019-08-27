import React, { useState } from "react";
import { CTAButton } from "./Sidebar";
import PayForm from "../../../components/common/PayForm.js";
import Popup from "../../../components/common/Popup";
import { useQuery } from "react-apollo";
import { NavLink } from "react-router-dom";
import queryString from "query-string";
import { GIG } from "../gql";
import { LoadingIndicator } from "../../../components/Blocks";
import Chat from "../../../components/common/Chat";
import EmptyPage from "../../../components/common/EmptyPage";
import { connect } from "react-redux";
import { getTranslate } from "react-localize-redux";

const BookingButton = ({ user, location, translate }) => {
  const [showPopup, setShowPopup] = useState(false);

  // check for gigId
  const queries = queryString.parse(location.search);
  let { gigId, hash } = queries;

  if (!gigId && location && location.state && !hash) {
    gigId = location.state.gigId;
    hash = location.state.hash;
  }

  const { data = {}, loading } = useQuery(GIG, {
    skip: !gigId || !hash,
    variables: {
      id: gigId,
      hash: hash
    }
  });

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <CTAButton disabled>
        <LoadingIndicator />
      </CTAButton>
    );
  }

  if (user.isOwn) {
    return (
      <CTAButton
        onClick={() => window.alert("Are you trying to book yourself? 🧐")}
      >
        REQUEST BOOKING
      </CTAButton>
    );
  }

  const { gig } = data;
  const event = gig ? gig.event : null;

  const canBePaid =
    gig &&
    gig.offer &&
    gig.status === "ACCEPTED" &&
    event.status === "ACCEPTED";

  if (canBePaid) {
    const { offer } = gig;
    return (
      <>
        <CTAButton onClick={() => setShowPopup(true)}>
          BOOK {offer.totalPayment.formatted}
        </CTAButton>
        <Popup
          showing={showPopup}
          onClickOutside={() => setShowPopup(false)}
          noPadding
        >
          <PayForm id={gig.id} offer={offer} event={event} />
        </Popup>
      </>
    );
  }

  const isChosenGig = event && event.chosenGig && event.chosenGig.id === gig.id;

  const canBeReviewd =
    isChosenGig && ["FINISHED"].includes(event.status) && !event.review;

  if (canBeReviewd) {
    return (
      <NavLink
        to={translate("routes./event/:id/:hash/review", {
          id: event.id,
          hash
        })}
      >
        <CTAButton>REVIEW</CTAButton>
      </NavLink>
    );
  }

  const canBeChatted =
    (event &&
      event.organizer &&
      ["ACCEPTED", "OFFERING"].includes(event.status)) ||
    (isChosenGig && ["CONFIRMED"].includes(event.status));

  if (canBeChatted) {
    const { organizer } = event;
    return (
      <>
        <CTAButton onClick={() => setShowPopup(true)}>SEND MESSAGE</CTAButton>
        <Popup
          hideClose
          noPadding
          showing={showPopup}
          onClickOutside={() => setShowPopup(false)}
        >
          <Chat
            showPersonalInformation={false}
            eventId={event.id}
            receiver={{
              id: user.id,
              name: user.userMetadata.firstName,
              image: user.picture.path
            }}
            sender={{
              id: organizer.id,
              name: organizer.userMetadata.firstName,
              image: organizer.picture.path
            }}
            chatId={gig.id}
            placeholder={<EmptyPage title="No messages" />}
          />
        </Popup>
      </>
    );
  }

  return (
    <NavLink to="booking">
      <CTAButton>REQUEST BOOKING</CTAButton>
    </NavLink>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    translate: getTranslate(state.locale)
  };
};

export default connect(mapStateToProps)(BookingButton);
