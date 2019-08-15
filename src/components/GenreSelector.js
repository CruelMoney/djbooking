import React, { useState } from "react";
import { Input, ButtonText } from "./FormComponents";
import { Row, TeritaryButton, PrimaryButton } from "./Blocks";
import Popup from "./common/Popup";
import { ToggleButtonHandler } from "./common/ToggleButtonHandler";
import constants from "../constants/constants";

const GenreSelector = ({ initialGenres = [], save }) => {
	const [genres, setGenres] = useState(initialGenres);
	const [showing, setShowing] = useState(false);

	return (
		<>
			<Input
				type="button"
				onClick={s => setShowing(true)}
				label="Genres"
				buttonText={<ButtonText>{initialGenres.join(", ")}</ButtonText>}
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

export default GenreSelector;
