import React  from 'react'
import { connect } from 'react-redux'
import Form from '../components/common/Form-v2'
import * as actions from '../actions/FormActions'


function mapStateToProps(state, ownprops) {
  return {
    activeFilters: state.forms[ownprops.name] ? state.forms[ownprops.name].filters : [],
    children: ownprops.children,
    form: state.forms[ownprops.name] ? state.forms[ownprops.name] : {},
    status: state.forms[ownprops.name] ? state.forms[ownprops.name].status : {},
    err:  state.forms[ownprops.name] ? state.forms[ownprops.name].status.err : null,
  }
}



function mapDispatchToProps(dispatch, ownProps) {
  return {
    updateValue: (name, value) => {
      dispatch(actions.updateFormValue(name,value, ownProps.name))
    },
    updateFilters: (filter, value) => {
      dispatch(actions.updateFilters(filter, value, ownProps.name))
    },
    onSubmit: (form, submitActions, submitName) => {
      dispatch(actions.submitRequested(ownProps.name, submitName))
      submitActions(form,
        (err)=>dispatch(actions.handleSubmitResult(ownProps.name, err, submitName))
      )},
}
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, {
    children: stateProps.children,
    updateValue: dispatchProps.updateValue,
    updateFilters: (filter, value) => dispatchProps.updateFilters(filter, value, ownProps.name),
    onSubmit: (submitActions, submitName) => dispatchProps.onSubmit(stateProps.form, submitActions, submitName),
    err: stateProps.err,
    status: stateProps.status,
    form: stateProps.form
  })
}

const SmartForm = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Form)

export default props => (
    <SmartForm {...props}/>
)
export {default as Text} from '../components/common/Text'
export {default as Textfield} from '../components/common/Textfield'
export {default as LocationSelector} from '../components/common/LocationSelector'
export {default as LocationSelectorSimple} from '../components/common/LocationSelectorSimple'
export {default as ToggleButton} from '../components/common/ToggleButton'
export {default as Button} from '../components/common/Button'
export {default as ToggleButtonHandler} from '../components/common/ToggleButtonHandler'
export {default as RegistrationElement} from '../components/common/RegistrationElement'
export {default as ToggleOptions} from '../components/common/ToggleOptions'
