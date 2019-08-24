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
import { DECLINE_DJ } from "../../gql";
import ReactPixel from "react-facebook-pixel";
import PayForm from "../../../../components/common/PayForm";

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

	return (
		<Wrapper idx={idx}>
			<Card style={style}>
				<StyledImage src={dj.picture.path} />
				<Content>
					<RowWrap>
						<ColLeft>
							<SmallHeader>{name}</SmallHeader>
							<BodySmall style={{ wordBreak: "break-word" }}>
								{truncatedBio}
							</BodySmall>
							<Row>
								{theEvent.status !== "FINISHED" && (
									<SecondaryButton
										small
										style={{ position: "relative" }}
										onClick={() => {
											setShowChat(true);
											onOpenChat();
										}}
									>
										Message
										{hasMessage && <div className="notification-bubble">1</div>}
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
									<TeritaryButton small>See profile</TeritaryButton>
								</NavLink>
							</Row>
						</ColLeft>
						<RightCol>
							{email && (
								<ConditionalWrap
									condition={showInfo}
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
						gig={gig}
						translate={translate}
						name={name}
						initiateBooking={initiateBooking}
					/>
				</Content>
			</Card>
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

const Offer = ({ name, totalPayment, translate, gig, initiateBooking }) => {
	const [decline, { loading }] = useMutation(DECLINE_DJ, {
		variables: {
			gigId: gig.id
		},
		onCompleted: window.location.reload
	});

	const { status } = gig;

	return (
		<OfferRow middle>
			<Col>
				<OfferText muted={!totalPayment}>
					{totalPayment ? totalPayment.formatted : "No offer yet"}
				</OfferText>
				{["CONFIRMED"].includes(status) && (
					<OfferText muted={true}>Paid and confirmed</OfferText>
				)}
			</Col>
			<Row>
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
				{["CONFIRMED"].includes(status) && (
					<NavLink to="review">
						<PrimaryButton>Review {name}</PrimaryButton>
					</NavLink>
				)}
			</Row>
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
		<Popup showing={showing} onClickOutside={close}>
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

const OfferText = styled(BodyBold)`
	font-size: 18px;
	margin: 0;
	color: ${({ muted }) => (muted ? "#98A4B3" : "#122b48")};
`;

const OfferRow = styled(Row)`
	padding-top: 24px;
	justify-content: space-between;
`;

const ColLeft = styled(Col)`
	flex: 1;
	margin-bottom: 24px;
	min-width: 260px;
`;

const RightCol = styled(Row)`
	min-width: 204px;
	justify-content: space-between;
	height: 60px;
	justify-content: flex-end;
	flex-wrap: wrap;
`;

const StyledImage = styled(GracefullImage)`
	min-width: 214px;
	max-width: 350px;
	width: 100%;
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
