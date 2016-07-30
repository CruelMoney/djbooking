import React, {PropTypes} from 'react'
import without from 'lodash.without'
import Radium from 'radium'
import Button from './Button'

const form = React.createClass({
    displayName: 'Form',

    propTypes: {
      children: PropTypes.node,
      onSubmit: PropTypes.func,
      updateFilters: PropTypes.func,
      updateValue: PropTypes.func
    },

    getInitialState() {
      return{
        isValid: false
      }
    },


    childContextTypes: {
      reset: PropTypes.func,
      registerValidation: PropTypes.func,
      isFormValid: PropTypes.func,
      updateFilters: PropTypes.func,
      updateValue: PropTypes.func
    },

    getChildContext() {
      return {
        reset: this.props.reset,
        registerValidation: this.registerValidation,
        isFormValid: this.isFormValid,
        updateFilters: this.updateFilters,
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
   },

   submit(){
     if (this.isFormValid(true)) {
       this.props.onSubmit()
     }
   },



  render() {
    return (
      <form >
        <ol >
          {this.props.children.map(function(result) {
            return <li  key={result.id}>{result}</li>
          })}
        </ol>
        <Button
          large={true}
          label= "Sign Up"
          important = {this.state.isValid}
          rounded = {true}
          onClick = {this.submit}
        />
      </form>

    )
  }
})

export default Radium(form)
