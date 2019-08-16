import React, { useState } from "react";
import styled, { css } from "styled-components";
import {
	Col,
	keyframeFadeIn,
	Row,
	SecondaryButton,
	TeritaryButton,
	Hr,
	PrimaryButton
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

const hiddenEmail = "12345678@1234".replace(/\w/g, "•") + ".com";
const hiddenNumber = "45 24 65 80 61".replace(/\w/g, "•");

const DjCard = ({ style, idx, gig, translate, theEvent }) => {
	const [showChat, setShowChat] = useState(false);
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

	return (
		<Wrapper idx={idx}>
			<Card style={style}>
				<StyledImage src={dj.picture.path} />
				<Content>
					<Row>
						<ColLeft>
							<SmallHeader>{name}</SmallHeader>
							<BodySmall style={{ wordBreak: "break-word" }}>
								{truncatedBio}
							</BodySmall>
							<Row>
								<SecondaryButton
									small
									style={{ position: "relative" }}
									onClick={() => setShowChat(true)}
								>
									Message
									{true && <div className="notification-bubble">1</div>}
								</SecondaryButton>
								<NavLink
									to={{
										pathname: `${translate("routes./user")}/${
											dj.permalink
										}/overview?gigId=${gig.id}`,
										state: { offer, gig }
									}}
								>
									<TeritaryButton small>See profile</TeritaryButton>
								</NavLink>
							</Row>
						</ColLeft>
						<RightCol>
							{email && (
								<ConditionalWrap
									condition={true}
									wrap={children => <a href={"mailto:" + email}>{children}</a>}
								>
									<InfoBox>
										<MailIcon fontSize="15px" color="#98A4B3" />
										<span>{showInfo ? email : hiddenEmail}</span>
									</InfoBox>
								</ConditionalWrap>
							)}
							{phone && (
								<ConditionalWrap
									condition={true}
									wrap={children => <a href={"tel:" + phone}>{children}</a>}
								>
									<InfoBox>
										<PhoneIcon fontSize="18px" color="#98A4B3" />
										<span>{showInfo ? phone : hiddenNumber}</span>
									</InfoBox>
								</ConditionalWrap>
							)}
						</RightCol>
					</Row>
					<Hr />

					<Offer {...offer} name={name} />
				</Content>
			</Card>
			<Shadow />

			<ChatPopup
				showing={showChat}
				translate={translate}
				hide={() => setShowChat(false)}
				dj={dj}
				organizer={theEvent.organizer}
				eventId={theEvent.id}
				showInfo={showInfo}
				gig={gig}
			/>
		</Wrapper>
	);
};

const Offer = ({ name, offer }) => {
	return (
		<OfferRow>
			<OfferText muted={!offer}>
				{offer ? offer.formatted : "No offer yet"}
			</OfferText>
			<Row>
				<TeritaryButton>Decline</TeritaryButton>
				{offer && <PrimaryButton>Book {name}</PrimaryButton>}
			</Row>
		</OfferRow>
	);
};

const ChatPopup = ({
	translate,
	showing,
	hide,
	dj,
	organizer,
	gig,
	eventId,
	showInfo
}) => {
	debugger;
	return (
		<Popup hideClose noPadding showing={showing} onClickOutside={hide}>
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

const OfferText = styled(BodyBold)`
	font-size: 18px;
	color: ${({ muted }) => (muted ? "#98A4B3" : "#122b48")};
`;

const OfferRow = styled(Row)`
	padding-top: 24px;
	justify-content: space-between;
	align-items: flex-end;
`;

const ColLeft = styled(Col)`
	flex: 1;
	margin-bottom: 24px;
`;

const RightCol = styled(Col)`
	min-width: 180px;
	margin-left: 24px;
	justify-content: space-between;
	height: 60px;
	align-items: flex-end;
`;

const StyledImage = styled(GracefullImage)`
	min-width: 214px;
	width: 214px;
	object-fit: cover;
`;

const Content = styled(Col)`
	padding: 24px;
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
