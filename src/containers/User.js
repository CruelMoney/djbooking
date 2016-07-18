import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import createLogger from 'redux-logger';
import User from '../components/session/User';
import * as actions from '../actions/actions';
import lodashMap from 'lodash/map';
import assign from 'lodash.assign';
import isMatch from 'lodash/isMatch';


//TODO move magic information about the filters out of container.
//Should be grabbed from the children that are set as filters
function mapStateToProps(state, ownprops) {
  return {
    profile: state.user.status.editMode ? state.user.editableProfile : state.user.profile,
    editMode: state.user.status.editMode,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    toggleEditMode: () => { dispatch(actions.toggleEditMode()) },
    updateProfileValue: (name, value) => { dispatch(actions.updateProfileValue(name, value)) },
}}

const SmartUser = connect(mapStateToProps, mapDispatchToProps, null, {pure:false})(User);

export default props => (
    <SmartUser {...props}/>
);
