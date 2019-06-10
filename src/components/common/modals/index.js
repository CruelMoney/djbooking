import PayUsingCueupDJ from "./PayUsingCueupDJ";
import PayUsingCueupOrganizer from "./PayUsingCueupOrganizer";
import { getTranslate } from "react-localize-redux";
import { connect } from "react-redux";

function mapStateToProps(state, ownProps) {
	return {
		translate: getTranslate(state.locale)
	};
}

const e1 = connect(mapStateToProps)(PayUsingCueupDJ);
const e2 = connect(mapStateToProps)(PayUsingCueupOrganizer);

export { e1 as PayUsingCueupDJ, e2 as PayUsingCueupOrganizer };
