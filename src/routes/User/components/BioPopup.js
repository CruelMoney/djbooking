import React, { useState } from "react";
import { Input, TextArea } from "./FormComponents";
import { Row, TeritaryButton, PrimaryButton } from "./Blocks";
import Popup from "../../../components/common/Popup";
import { BodySmall } from "./Text";

const BioPopup = ({ initialValue, save, translate }) => {
	const [bio, setBio] = useState(initialValue);
	const [showing, setShowing] = useState(false);

	return (
		<>
			<Input
				half
				type="button"
				label="Bio"
				buttonText={"edit"}
				onClick={_ => setShowing(true)}
			/>

			<Popup
				showing={showing}
				onClickOutside={_ => setShowing(false)}
				width={"520px"}
			>
				<TextArea
					defaultValue={initialValue}
					style={{
						height: "400px"
					}}
					onChange={e => setBio(e.target.value)}
				/>
				<Row style={{ marginTop: "15px" }} right>
					<BodySmall
						style={{
							alignSelf: "flex-end",
							marginRight: "auto"
						}}
					>{`${bio.replace(/\s/g, "").length} / 100`}</BodySmall>

					<TeritaryButton type="button" onClick={_ => setShowing(false)}>
						Cancel
					</TeritaryButton>
					<PrimaryButton
						type="button"
						onClick={() => {
							setShowing(false);
							save(bio);
						}}
					>
						Save
					</PrimaryButton>
				</Row>
			</Popup>
		</>
	);
};

export default BioPopup;
