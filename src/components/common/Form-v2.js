import React, {PropTypes} from 'react'
import without from 'lodash.without'
import Radium from 'radium'
import assign from 'lodash.assign'

const form = React.createClass({
    displayName: 'Form',

    //TO be supplied is name and onsubmit that will be called with the form automatically
    propTypes: {
      name: PropTypes.string,
      succeeded: PropTypes.bool,
      children: PropTypes.node,
      onSubmit: PropTypes.func,
      updateFilters: PropTypes.func,
      updateValue: PropTypes.func,
      activeFilters: PropTypes.arrayOf(PropTypes.object),
      isLoading: PropTypes.bool,
      err: PropTypes.string,
      form: PropTypes.object
    },

    getInitialState() {
      return{
        isValid: false,
        activeFilters: []
      }
    },


    childContextTypes: {
      reset: PropTypes.func,
      succeeded: PropTypes.bool,
      registerValidation: PropTypes.func,
      isFormValid: PropTypes.func,
      updateFilters: PropTypes.func,
      activeFilters: PropTypes.arrayOf(PropTypes.object),
      updateValue: PropTypes.func,
      isLoading: PropTypes.bool,
      isValid: PropTypes.bool,
      onSubmit: PropTypes.func,
      registerReset: PropTypes.func,
    },
    getChildContext() {
      return {
        reset: this.reset,
        succeeded: this.props.succeeded,
        registerValidation: this.registerValidation,
        isFormValid: this.isFormValid,
        updateFilters: this.updateFilters,
        activeFilters: this.state.activeFilters,
        updateValue: this.props.updateValue,
        isLoading: this.props.isLoading,
        isValid: this.state.isValid,
        onSubmit: this.submit,
        registerReset: this.registerReset,
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

   submit(submitActions){
     if (this.isFormValid(true)) {
         this.props.onSubmit(submitActions)
       }
   },


  render() {
    return (
      <div>
      <form >
        {this.props.children}
      </form>
      {this.props.err ?
        <div className="form-error">
        {this.props.err}
        </div>
        :null
      }
      </div>


    )
  }
})

export default Radium(form)
