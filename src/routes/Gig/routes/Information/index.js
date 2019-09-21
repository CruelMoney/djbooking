import React from "react";
import { Col, InfoBox, RowWrap } from "../../../../components/Blocks";

import { Body, BodySmall, TitleClean } from "../../../../components/Text";
import { Label } from "../../../../components/FormComponents";
import styled from "styled-components";
import moment from "moment";
import ContactPills from "../../components/blocks/ContactPills";
import { LoadingPlaceholder2 } from "../../../../components/common/LoadingPlaceholder";

const Content = React.forwardRef(({ gig, translate, history }, ref) => {
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
  const date = startMoment.format("YYYY-MM-DD");
  return (
    <Col ref={ref}>
      <Body style={{ marginBottom: "30px" }}>
        See what {contactName} has requested and adjust your offer accordingly.
        Don’t hesitate to ask the organizer for more details.
      </Body>

      {address && showInfo && (
        <CustomLabel>
          <TitleClean>Address</TitleClean>
          <BodySmall>{address}</BodySmall>
        </CustomLabel>
      )}

      <CustomLabel>
        <TitleClean>Get in touch with {contactName}</TitleClean>

        <BodySmall>
          Information will be available when the gig is confirmed.
        </BodySmall>
        <RowWrap>
          <ContactPills
            email={contactEmail}
            phone={contactPhone}
            showInfo={showInfo}
          />
        </RowWrap>
      </CustomLabel>

      <CustomLabel>
        <TitleClean>Description</TitleClean>
        <BodySmall>{description}</BodySmall>
      </CustomLabel>

      <CustomLabel>
        <TitleClean>Music</TitleClean>
        <RowWrap>
          {genres.map(g => (
            <InfoBox key={g}>{g}</InfoBox>
          ))}
        </RowWrap>
      </CustomLabel>

      <CustomLabel>
        <TitleClean>Requirements</TitleClean>

        <BodySmall>{rider.formatted}</BodySmall>
        <RowWrap>
          <InfoBox minHeight>
            <span>Date</span>
            {date}
          </InfoBox>
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
  h3 {
    margin-bottom: 0.5em;
  }
  > div {
    margin-top: 15px;
  }
`;

const Information = ({ loading, ...props }) =>
  loading ? <LoadingPlaceholder2 /> : <Content {...props} />;

export default Information;
