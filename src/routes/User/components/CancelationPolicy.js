import React, { useState } from "react";
import { Input, ButtonText } from "./FormComponents";
import { Row, TeritaryButton, PrimaryButton } from "./Blocks";
import Popup from "../../../components/common/Popup";
import { ToggleButtonHandler } from "../../../components/common/ToggleButtonHandler";
import constants from "../../../constants/constants";

const CancelationPolicyPopup = ({ initialValue, save }) => {
	const [cancelationPolicy, setCancelationPolicy] = useState(initialValue);
	const [showing, setShowing] = useState(false);

	return (
		<>
			<Input
				half
				type="button"
				Input
				label="Cancelation policy"
				buttonText={`${initialValue.days} days, ${initialValue.percentage}%`}
			/>
			/>
			<Popup
				showing={showing}
				onClickOutside={_ => setShowing(false)}
				width={"520px"}
			>
				<ToggleButtonHandler
					enableAdditions
					color={"#50E3C2"}
					potentialValues={constants.GENRES}
					errors={[]}
					value={initialGenres}
					onChange={setGenres}
				/>

				<Row style={{ marginTop: "15px" }} right>
					<TeritaryButton type="button" onClick={_ => setShowing(false)}>
						Cancel
					</TeritaryButton>
					<PrimaryButton
						type="button"
						onClick={() => {
							setShowing(false);
							save(genres);
						}}
					>
						Save
					</PrimaryButton>
				</Row>
			</Popup>
		</>
	);
};

export default CancelationPolicyPopup;
