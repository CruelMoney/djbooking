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
      updateValue: PropTypes.func,
      activeFilters: PropTypes.arrayOf(PropTypes.object),
      err: PropTypes.string,
      form: PropTypes.object,
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
      var isValid = this.validations.reduce((memo, isValidFunc) =>
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

export default form
