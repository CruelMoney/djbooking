import React from "react";
import { Col, InfoBox, RowWrap, InfoPill } from "../../../../components/Blocks";
import PhoneIcon from "react-ionicons/lib/IosCall";
import MailIcon from "react-ionicons/lib/MdMail";
import { Body, BodySmall } from "../../../../components/Text";
import { gigStates } from "../../../../constants/constants";
import { Label } from "../../../../components/FormComponents";
import styled from "styled-components";
import moment from "moment";
import ConditionalWrap from "../../../../components/ConditionalWrap";

const hiddenEmail = "12345678@1234".replace(/\w/g, "•") + ".com";
const hiddenNumber = "45 12 34 56 78".replace(/\w/g, "•");

const Information = React.forwardRef(({ gig, translate, history }, ref) => {
  if (!gig) {
    return null;
  }

  const { event, showInfo } = gig;

  let {
    description,
    rider,
    genres,
    end,
    start,
    guestsCount,
    contactName,
    contactPhone,
    contactEmail,
    address
  } = event;

  const startMoment = moment(start.localDate);
  const endMoment = moment(end.localDate);
  const hours = endMoment.diff(startMoment, "hours");
  contactName = contactName.split(" ")[0];

  return (
    <Col ref={ref}>
      <Body style={{ marginBottom: "30px" }}>
        See what the organizer has requested and adjust your offer accordingly.
        Don’t hesitate to ask the organizer for more details.
      </Body>

      {address && showInfo && (
        <CustomLabel>
          Address
          <BodySmall>{address}</BodySmall>
        </CustomLabel>
      )}

      <CustomLabel>
        Get in touch with {contactName}
        <BodySmall>
          Information will be available when the gig is confirmed.
        </BodySmall>
        <RowWrap>
          {contactEmail && (
            <ConditionalWrap
              condition={showInfo}
              wrap={children => (
                <a href={"mailto:" + contactEmail}>{children}</a>
              )}
            >
              <InfoPill>
                <MailIcon fontSize="15px" color="#98A4B3" />
                <span>{showInfo ? contactEmail : hiddenEmail}</span>
              </InfoPill>
            </ConditionalWrap>
          )}
          {contactPhone && (
            <ConditionalWrap
              condition={showInfo}
              wrap={children => <a href={"tel:" + contactPhone}>{children}</a>}
            >
              <InfoPill>
                <PhoneIcon fontSize="18px" color="#98A4B3" />
                <span>{showInfo ? contactPhone : hiddenNumber}</span>
              </InfoPill>
            </ConditionalWrap>
          )}
        </RowWrap>
      </CustomLabel>

      <CustomLabel>
        Description
        <BodySmall>{description}</BodySmall>
      </CustomLabel>

      <CustomLabel>
        Music
        <RowWrap>
          {genres.map(g => (
            <InfoBox key={g}>{g}</InfoBox>
          ))}
        </RowWrap>
      </CustomLabel>

      <CustomLabel>
        Requirements
        <BodySmall>{rider.formatted}</BodySmall>
        <RowWrap>
          <InfoBox minHeight>
            <span>Start</span>
            {start.formattedTime}
          </InfoBox>
          <InfoBox minHeight>
            <span>End</span>
            {end.formattedTime}
          </InfoBox>
          <InfoBox minHeight>
            <span>Hours</span>
            {hours}
          </InfoBox>

          <InfoBox minHeight>
            <span>People</span>
            {guestsCount}
          </InfoBox>

          {rider.speakers && <InfoBox minHeight>Speakers</InfoBox>}
          {rider.lights && <InfoBox minHeight>Lights</InfoBox>}
        </RowWrap>
      </CustomLabel>
    </Col>
  );
});

const CustomLabel = styled(Label)`
  margin-bottom: 30px;
  font-family: "AvenirNext-DemiBold", Arial, Helvetica, sans-serif;
  > * {
    margin-top: 12px;
  }
`;

export default Information;
