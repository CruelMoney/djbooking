import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Title, Body } from "../components/Text";
import ReadMoreExpander from "../components/ReadMoreExpander";
import {
	Col,
	Row,
	Avatar,
	ReadMoreText,
	TeritaryButton,
	PrimaryButton
} from "../components/Blocks";
import QuotationMarkIcon from "../../../components/graphics/Quotes";

import { Query } from "react-apollo";
import {
	REVIEWS,
	WRITE_TESTIMONIAL,
	REMOVE_TESTIMONIAL,
	HIGHLIGHT_REVIEW
} from "../gql";
import { LoadingPlaceholder2 } from "../../../components/common/LoadingPlaceholder";
import Rating from "../../../components/common/Rating";
import moment from "moment";
import EmptyPage from "../../../components/common/EmptyPage";
import { Input } from "../components/FormComponents";
import Popup from "../../../components/common/Popup";
import { useMutation } from "react-apollo-hooks";
import ReactDOM from "react-dom";
import { Popper } from "react-popper";

const Gigs = ({ user, loading: loadingUser, updateUser }) => {
	if (loadingUser) {
		return <LoadingPlaceholder2 />;
	}

	return (
		<Query query={REVIEWS} variables={{ id: user.id }}>
			{({ loading, data }) => {
				if (loading) {
					return <LoadingPlaceholder2 />;
				}

				const {
					user: {
						isOwn,
						playedVenues,
						reviews: { edges }
					}
				} = data;
				return null;
			}}
		</Query>
	);
};

export default Gigs;
