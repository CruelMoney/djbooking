import React from "react";
import ConditionalWrap from "../../../../components/ConditionalWrap";
import { InfoPill } from "../../../../components/Blocks";
import PhoneIcon from "react-ionicons/lib/IosCall";
import MailIcon from "react-ionicons/lib/MdMail";

const hiddenEmail = "12345678@1234".replace(/\w/g, "•") + ".com";
const hiddenNumber = "45 12 34 56 78".replace(/\w/g, "•");

const ContactPills = ({ email, phone, showInfo }) => {
  return (
    <>
      {email && (
        <ConditionalWrap
          condition={showInfo}
          wrap={children => <a href={"mailto:" + email}>{children}</a>}
        >
          <InfoPill>
            <MailIcon fontSize="15px" color="#98A4B3" />
            <span>{showInfo ? email : hiddenEmail}</span>
          </InfoPill>
        </ConditionalWrap>
      )}
      {phone && (
        <ConditionalWrap
          condition={showInfo}
          wrap={children => <a href={"tel:" + phone}>{children}</a>}
        >
          <InfoPill>
            <PhoneIcon fontSize="18px" color="#98A4B3" />
            <span>{showInfo ? phone : hiddenNumber}</span>
          </InfoPill>
        </ConditionalWrap>
      )}
    </>
  );
};

export default ContactPills;
