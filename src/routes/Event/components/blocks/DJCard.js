import React, { useState } from "react";
import styled from "styled-components";
import {
  Col,
  keyframeFadeIn,
  Row,
  SecondaryButton,
  TeritaryButton,
  Hr,
  PrimaryButton,
  SmartButton,
  RowWrap
} from "../../../../components/Blocks";
import GracefullImage from "../../../../components/GracefullImage";
import { SmallHeader, BodySmall, BodyBold } from "../../../../components/Text";
import PhoneIcon from "react-ionicons/lib/IosCall";
import MailIcon from "react-ionicons/lib/MdMail";
import { NavLink } from "react-router-dom";
import ConditionalWrap from "../../../../components/ConditionalWrap";
import Popup from "../../../../components/common/Popup";
import Chat from "../../../../components/common/Chat";
import EmptyPage from "../../../../components/common/EmptyPage";
import { useMutation } from "react-apollo";
import { DECLINE_DJ, EVENT_GIGS } from "../../gql";
import ReactPixel from "react-facebook-pixel";
import PayForm from "../../../../components/common/PayForm";
import {
  ACTIVITY_TYPES,
  LogActivityInView
} from "../../../../components/hooks/useLogActivity";

const hiddenEmail = "12345678@1234".replace(/\w/g, "•") + ".com";
const hiddenNumber = "45 24 65 80 61".replace(/\w/g, "•");

const DjCard = ({
  style,
  idx,
  gig,
  translate,
  theEvent,
  hasMessage,
  onOpenChat
}) => {
  const [showChat, setShowChat] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const initiateBooking = () => {
    ReactPixel.track("InitiateCheckout");
    setShowPayment(true);
  };

  const { dj, offer, status } = gig;
  if (!dj) {
    return null;
  }
  const { userMetadata = {}, artistName, email } = dj;
  const { bio = "", firstName, phone } = userMetadata;
  const shouldTruncate = bio.length > 100;
  const truncatedBio = shouldTruncate ? bio.substring(0, 100) + "..." : bio;
  const name = artistName || firstName;
  const showInfo = status === "CONFIRMED";
  const finished = theEvent.status === "FINISHED";

  return (
    <Wrapper idx={idx}>
      <LogActivityInView
        type={ACTIVITY_TYPES.GIG_VIEWED_BY_ORGANIZER}
        subjectId={gig.id}
      >
        <Card style={style}>
          <ImageWrapper>
            <StyledImage src={dj.picture.path} />
          </ImageWrapper>
          <Content>
            <RowWrap>
              <ColLeft>
                <SmallHeader>{name}</SmallHeader>
                <BodySmall style={{ wordBreak: "break-word" }}>
                  {truncatedBio}
                </BodySmall>
                <RowWrap>
                  {!finished && (
                    <SecondaryButton
                      small
                      style={{ position: "relative", overflow: "visible" }}
                      onClick={() => {
                        setShowChat(true);
                        onOpenChat();
                      }}
                    >
                      Message
                      {hasMessage && (
                        <div className="notification-bubble">1</div>
                      )}
                    </SecondaryButton>
                  )}
                  <NavLink
                    to={{
                      pathname: `${translate("routes./user")}/${
                        dj.permalink
                      }/overview`,
                      state: { gigId: gig.id },
                      search: `?gigId=${gig.id}&hash=${theEvent.hash}`
                    }}
                  >
                    {finished ? (
                      <SecondaryButton small>See profile</SecondaryButton>
                    ) : (
                      <TeritaryButton small>See profile</TeritaryButton>
                    )}
                  </NavLink>
                </RowWrap>
              </ColLeft>
              <RightCol>
                {email && (
                  <ConditionalWrap
                    condition={showInfo}
                    wrap={children => (
                      <a href={"mailto:" + email}>{children}</a>
                    )}
                  >
                    <InfoBox>
                      <MailIcon fontSize="15px" color="#98A4B3" />
                      <span>{showInfo ? email : hiddenEmail}</span>
                    </InfoBox>
                  </ConditionalWrap>
                )}
                {phone && (
                  <ConditionalWrap
                    condition={showInfo}
                    wrap={children => <a href={"tel:" + phone}>{children}</a>}
                  >
                    <InfoBox>
                      <PhoneIcon fontSize="18px" color="#98A4B3" />
                      <span>{showInfo ? phone : hiddenNumber}</span>
                    </InfoBox>
                  </ConditionalWrap>
                )}
              </RightCol>
            </RowWrap>
            <Hr />

            <Offer
              {...offer}
              theEvent={theEvent}
              gig={gig}
              translate={translate}
              name={name}
              initiateBooking={initiateBooking}
            />
          </Content>
        </Card>
      </LogActivityInView>
      <Shadow />

      <ChatPopup
        showing={showChat}
        translate={translate}
        close={() => setShowChat(false)}
        dj={dj}
        organizer={theEvent.organizer}
        eventId={theEvent.id}
        showInfo={showInfo}
        gig={gig}
      />
      <PayPopup
        showing={showPayment}
        translate={translate}
        close={() => setShowPayment(false)}
        theEvent={theEvent}
        gig={gig}
      />
    </Wrapper>
  );
};

const Offer = ({
  name,
  totalPayment,
  translate,
  gig,
  theEvent,
  initiateBooking
}) => {
  const [decline, { loading }] = useMutation(DECLINE_DJ, {
    variables: {
      gigId: gig.id,
      hash: theEvent.hash
    },
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: EVENT_GIGS,
        variables: {
          id: theEvent.id,
          hash: theEvent.hash
        }
      }
    ]
  });

  const { status } = gig;

  return (
    <OfferRow middle>
      <OfferTextWrapper>
        <OfferText muted={!totalPayment}>
          {totalPayment ? totalPayment.formatted : "No offer yet"}
        </OfferText>
        {["CONFIRMED"].includes(status) && (
          <OfferText muted={true}>Paid and confirmed</OfferText>
        )}
      </OfferTextWrapper>
      <Filler />
      <ButtonsRow>
        {["ACCEPTED", "REQUESTED"].includes(status) && (
          <SmartButton
            loading={loading}
            onClick={() => decline()}
            warning={translate("decline-warning")}
            level="tertiary"
          >
            Decline
          </SmartButton>
        )}
        {["ACCEPTED"].includes(status) && (
          <PrimaryButton onClick={initiateBooking}>Book {name}</PrimaryButton>
        )}
        {["CONFIRMED", "FINISHED"].includes(status) && (
          <NavLink to="review">
            <PrimaryButton>Review {name}</PrimaryButton>
          </NavLink>
        )}
      </ButtonsRow>
    </OfferRow>
  );
};

const PayPopup = ({
  showing,
  close,
  gig,
  paymentPossible,
  theEvent,
  translate
}) => {
  return (
    <Popup showing={showing} onClickOutside={close} noPadding>
      <PayForm
        paymentPossible={paymentPossible}
        id={gig.id}
        offer={gig.offer}
        event={theEvent}
      />
    </Popup>
  );
};

const ChatPopup = ({
  translate,
  showing,
  close,
  dj,
  organizer,
  gig,
  eventId,
  showInfo
}) => {
  return (
    <Popup hideClose noPadding showing={showing} onClickOutside={close}>
      <Chat
        showPersonalInformation={showInfo}
        eventId={eventId}
        receiver={{
          id: dj.id,
          name: dj.userMetadata.firstName,
          image: dj.picture.path
        }}
        sender={{
          id: organizer.id,
          name: organizer.userMetadata.firstName,
          image: organizer.picture.path
        }}
        chatId={gig.id}
        placeholder={
          <EmptyPage
            title="  "
            message={<div>{translate("event.offer.empty-chat")}</div>}
          />
        }
      />
    </Popup>
  );
};

const OfferTextWrapper = styled(Col)`
  margin-top: 24px;
`;

const Filler = styled.div`
  flex: 1;
  width: 100%;
  @media only screen and (max-width: 710px) {
    display: none;
  }
`;

const ButtonsRow = styled(Row)`
  margin-top: 24px;
  flex-wrap: wrap-reverse;
  justify-content: center;
`;

const OfferText = styled(BodyBold)`
  font-size: 18px;
  margin: 0;
  color: ${({ muted }) => (muted ? "#98A4B3" : "#122b48")};
`;

const OfferRow = styled(Row)`
  justify-content: center;
  flex-wrap: wrap;
`;

const ColLeft = styled(Col)`
  flex: 2;
  margin-bottom: 24px;
  min-width: 297px;
  margin-right: 15px;
  @media only screen and (max-width: 375px) {
    margin-right: 0px;
    min-width: 100%;
  }
`;

const RightCol = styled(Row)`
  flex-wrap: wrap;
  margin-right: -9px;
  flex: 1;
  margin-bottom: 15px;
  justify-content: flex-end;
  @media only screen and (max-width: 375px) {
    justify-content: flex-start;
  }
`;

const ImageWrapper = styled.div`
  min-width: 214px;
  min-height: 200px;
  position: relative;
  width: 100%;
  flex: 1;
`;
const StyledImage = styled(GracefullImage)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Content = styled(Col)`
  padding: 24px;
  flex: 2;
`;

const Wrapper = styled(Col)`
  position: relative;
  margin-top: 30px;
  min-height: 244px;
  width: 100%;
  animation: ${keyframeFadeIn} 400ms ease;
  animation-delay: ${({ idx }) => idx * 150}ms;
`;

const Card = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: row;
  border-radius: 4px;
  flex-wrap: wrap;
  background: #fff;
  z-index: 1;
  flex: 1;
`;

const Shadow = styled.div`
  box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 15px;
  left: 10px;
  bottom: 10px;
  right: 10px;
`;

const InfoBox = styled(BodyBold)`
  background: #e9ecf0;
  border-radius: 16px;
  height: 24px;
  margin-bottom: 0;
  line-height: 24px;
  min-width: 130px;
  max-width: 200px;
  font-size: 12px;
  color: #98a4b3;
  text-align: center;
  padding: 0 0.75em;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 9px;
  margin-bottom: 9px;

  span {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  svg {
    margin-right: 5px;
    position: relative;
  }
`;

export default DjCard;
