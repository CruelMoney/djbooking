import React, {PropTypes} from 'react'
import without from 'lodash.without'
import Radium from 'radium'
import assign from 'lodash.assign'
import Button from './Button'

const form = React.createClass({
    displayName: 'Form',

    propTypes: {
      children: PropTypes.node,
      onSubmit: PropTypes.func,
      updateFilters: PropTypes.func,
      updateValue: PropTypes.func,
      activeFilters: PropTypes.arrayOf(PropTypes.object),
      buttonText: PropTypes.string,
      finishedLoading: PropTypes.bool
    },

    getInitialState() {
      return{
        isValid: false,
        activeFilters: []
      }
    },


    childContextTypes: {
      reset: PropTypes.func,
      registerValidation: PropTypes.func,
      isFormValid: PropTypes.func,
      updateFilters: PropTypes.func,
      activeFilters: PropTypes.arrayOf(PropTypes.object),
      updateValue: PropTypes.func,
    },

    getChildContext() {
      return {
        reset: this.props.reset,
        registerValidation: this.registerValidation,
        isFormValid: this.isFormValid,
        updateFilters: this.updateFilters,
        activeFilters: this.state.activeFilters,
        updateValue: this.props.updateValue
      }
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

   submit(){
     if (this.isFormValid(true)) {
       this.props.onSubmit()
     }
   },



  render() {
    return (
      <form >
        {this.props.children}
        <Button
          finishedLoading = {this.props.finishedLoading}
          willLoad = {true && this.state.isValid}
          large={true}
          label= {this.props.buttonText}
          important = {this.state.isValid}
          rounded = {true}
          onClick = {this.submit}
        />
      </form>

    )
  }
})

export default Radium(form)
