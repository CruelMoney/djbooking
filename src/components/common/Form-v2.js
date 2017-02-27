import React, {PropTypes} from 'react'
import without from 'lodash.without'
import assign from 'lodash.assign'

const form = React.createClass({
    displayName: 'Form',

    //TO be supplied is name and onsubmit that will be called with the form automatically
    propTypes: {
      name: PropTypes.string,
      formValidCallback: PropTypes.func,
      formInvalidCallback: PropTypes.func,
      status: PropTypes.object,
      children: PropTypes.node,
      onSubmit: PropTypes.func,
      updateFilters: PropTypes.func,
      resetState: PropTypes.func,
      updateValue: PropTypes.func,
      activeFilters: PropTypes.arrayOf(PropTypes.object),
      err: PropTypes.string,
      form: PropTypes.object,
      customIsFormValid: PropTypes.func,
      registerCheckForm: PropTypes.func
    },

    componentWillMount(){
        if(this.props.registerCheckForm){
         this.props.registerCheckForm(this.isFormValid)
      }
    },

    componentWillUnmount(){
      this.props.resetState()
    
    },

    getInitialState() {
      return{
        isValid: false,
        activeFilters: [],
      }
    },


    childContextTypes: {
      reset: PropTypes.func,
      status: PropTypes.object,
      registerValidation: PropTypes.func,
      isFormValid: PropTypes.func,
      updateFilters: PropTypes.func,
      activeFilters: PropTypes.arrayOf(PropTypes.object),
      updateValue: PropTypes.func,
      isValid: PropTypes.bool,
      onSubmit: PropTypes.func,
      registerReset: PropTypes.func,
      errorMessage: PropTypes.string
    },
    getChildContext() {
      return {
        reset: this.reset,
        status: this.props.status,
        registerValidation: this.registerValidation,
        isFormValid: this.isFormValid,
        updateFilters: this.updateFilters,
        activeFilters: this.state.activeFilters,
        updateValue: this.updateValue,
        isValid: this.state.isValid,
        onSubmit: this.submit,
        registerReset: this.registerReset,
        errorMessage : this.props.err
      }
    },


    updateValue(name, value){
      this.props.updateValue(name,value)

      if (setTimeout(()=>this.isFormValid(false), 0)) {

      }
    },


    resetFuncs: [],

    registerReset(resetFunc){
      this.resetFuncs = [...this.resetFuncs, resetFunc]
      return this.removeReset.bind(null, resetFunc)
    },

    removeReset(ref) {
      this.resetFuncs = without(this.resetFuncs, ref)
    },


   reset(){
     this.resetFuncs.forEach(f=>f())
   },

   validations: [],


   registerValidation(isValidFunc) {
     this.validations = [...this.validations, isValidFunc]
     return this.removeValidation.bind(null, isValidFunc)
   },

   removeValidation(ref) {
     this.validations = without(this.validations, ref)
   },


   isFormValid(showErrors) {
      var isValid = this.props.customIsFormValid ?
                    this.props.customIsFormValid()
                   :
                    this.validations.reduce((memo, isValidFunc) =>
                    isValidFunc(showErrors) && memo, true)

      this.setState({
        isValid: isValid
      })

      if (isValid) {
        if (this.props.formValidCallback) {
          this.props.formValidCallback(this.props.name)
        }

      }else{
        if (this.props.formInvalidCallback) {
          this.props.formInvalidCallback(this.props.name)
        }
      }
      return isValid
   },

   updateFilters(filter, value){
       this.props.updateFilters(filter, value)
       this.setState({
         activeFilters: assign({}, this.state.activeFilters, {
                   [filter]: value
         })
       })
   },

   submit(submitActions, submitName){
     if (this.isFormValid(true)) {
         this.props.onSubmit(submitActions, submitName)
       }
   },


  render() {
    return (
      <div>
        <form >
          {this.props.children}
        </form>
        {this.props.err && !this.props.noError ?
          <div className="errors">
            <p>{this.props.err}</p>
          </div>
          :null
        }
      </div>


    )
  }
})

import { connect } from 'react-redux'
import * as actions from '../../actions/FormActions'


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
    resetState: () => {
      dispatch(actions.resetState(ownProps.name))
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
    form: stateProps.form,
    resetState: dispatchProps.resetState
  })
}

const SmartForm = connect(mapStateToProps, mapDispatchToProps, mergeProps)(form)

export default props => (
    <SmartForm {...props}/>
)
export {default as Text} from './Text'
export {default as Textfield} from './Textfield'
export {default as TextBox} from './TextBox'
export {default as LocationSelector} from './LocationSelector'
export {default as LocationSelectorSimple} from './LocationSelectorSimple'
export {default as ToggleButton} from './ToggleButton'
export {default as Button} from './Button'
export {default as ToggleButtonHandler} from './ToggleButtonHandler'
export {default as RegistrationElement} from './RegistrationElement'
export {default as ToggleOptions} from './ToggleOptions'
