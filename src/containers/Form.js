import React, {PropTypes} from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import Form from '../components/common/Form';
import * as actions from '../actions/actions';
import store from '../reducers/Store';
import injectTapEventPlugin from 'react-tap-event-plugin';
import lodashMap from 'lodash/map';
import assign from 'lodash.assign';
import isMatch from 'lodash/isMatch';




injectTapEventPlugin();

//Taking a list of react elements and see if they have defined to be only showed
//When certain filters are true. If no showon are defined it shows always
const getVisibleRegistrationElements = (elems, filters) => {

      if (filters === undefined) {
        return elems
      }
      var filters = lodashMap(filters, (value,key) => value);
      return elems.filter(elem =>
           filters.map(filter => (elem.props.hideOn === undefined || elem.props.hideOn.indexOf(filter) === -1))
           .reduce(( pre, cur ) => pre && cur, true)
      )
}

//TODO move magic information about the filters out of container.
//Should be grabbed from the children that are set as filters
function mapStateToProps(state, ownprops) {
  return {
    children: getVisibleRegistrationElements(ownprops.children, state.form.values.filters),
    values: state.form.values
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    update: (name, value) => {
      dispatch(actions.updateFormValue(name, value))
    },
    updateFilters: (filter, value) => {
      dispatch(actions.updateFilters(filter, value))
    },
    reset: () => {
      dispatch(actions.resetForm())
    },
    onSubmit: (values) => {dispatch(actions.signup(values))}
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, {
    children: stateProps.children,
    updateFilters: (filter, value) => dispatchProps.updateFilters(filter, value),
    update: (name, value) => dispatchProps.update(name, value),
    reset: () => dispatchProps.reset,
    onSubmit: () => dispatchProps.onSubmit(stateProps.values)
  })
}

const SmartForm = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Form);

export default props => (
    <SmartForm {...props}/>
);
export {default as Text} from '../components/common/Text';
export {default as Textfield} from '../components/common/Textfield';
export {default as LocationSelector} from '../components/common/LocationSelector';
export {default as LocationSelectorSimple} from '../components/common/LocationSelectorSimple';
export {default as ToggleButton} from '../components/common/ToggleButton';
export {default as Button} from '../components/common/Button';
export {default as ToggleButtonHandler} from '../components/common/ToggleButtonHandler';
export {default as RegistrationElement} from '../components/common/RegistrationElement';
export {default as ToggleOptions} from '../components/common/ToggleOptions';
