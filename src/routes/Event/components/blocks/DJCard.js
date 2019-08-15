import React from "react";
import styled, { css } from "styled-components";
import {
	Col,
	keyframeFadeIn,
	Row,
	SecondaryButton,
	TeritaryButton,
	Hr
} from "../../../../components/Blocks";
import GracefullImage from "../../../../components/GracefullImage";
import { SmallHeader, BodySmall, BodyBold } from "../../../../components/Text";
import PhoneIcon from "react-ionicons/lib/IosCall";
import MailIcon from "react-ionicons/lib/MdMail";

const DjCard = ({ style, idx, gig }) => {
	const { dj, offer } = gig;
	if (!dj) {
		return null;
	}
	const { userMetadata = {}, artistName, email } = dj;
	const { bio = "", firstName, phone } = userMetadata;

	const shouldTruncate = bio.length > 100;
	const truncatedBio = shouldTruncate ? bio.substring(0, 100) + "..." : bio;
	return (
		<Wrapper idx={idx}>
			<Card style={style}>
				<StyledImage src={dj.picture.path} />
				<Content>
					<Row>
						<ColLeft>
							<SmallHeader>{artistName || firstName}</SmallHeader>
							<BodySmall>{truncatedBio}</BodySmall>
							<Row>
								<SecondaryButton small>Message</SecondaryButton>
								<TeritaryButton small>See profile</TeritaryButton>
							</Row>
						</ColLeft>
						<RightCol>
							<InfoBox>
								<MailIcon fontSize="15px" color="#98A4B3" />
								<span>{email}</span>
							</InfoBox>
							<InfoBox>
								<PhoneIcon fontSize="18px" color="#98A4B3" />
								<span>{phone}</span>
							</InfoBox>
						</RightCol>
					</Row>
					<Hr />
					<Row>hey</Row>
				</Content>
			</Card>
			<Shadow />
		</Wrapper>
	);
};

const Offer = () => {};

const ColLeft = styled(Col)`
	flex: 1;
	margin-bottom: 24px;
`;

const RightCol = styled(Col)`
	min-width: 180px;
	align-items: flex-end;
`;

const StyledImage = styled(GracefullImage)`
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
	line-height: 24px;
	min-width: 130px;
	max-width: 200px;
	font-size: 12px;
	color: #98a4b3;
	text-align: center;
	margin-bottom: 9px;
	margin-left: 24px;
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
