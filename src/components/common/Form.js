import React, {PropTypes} from 'react'
import without from 'lodash.without'
import Radium from 'radium'
import Button from './Button'

const form = React.createClass({
    displayName: 'Form',

    propTypes: {
      values: PropTypes.object,
      children: PropTypes.node,
      onSubmit: PropTypes.func,
      reset: PropTypes.func,
      updateFilters: PropTypes.func,
    },

    getInitialState() {
      return{
        isValid: false
      }
    },


    childContextTypes: {
      reset: PropTypes.func,
      values: PropTypes.object,
      registerValidation: PropTypes.func,
      isFormValid: PropTypes.func,
      updateFilters: PropTypes.func,
    },

    getChildContext() {
      return {
        reset: this.props.reset,
        values: this.props.values,
        registerValidation: this.registerValidation,
        isFormValid: this.isFormValid,
        updateFilters: this.updateFilters,
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
      //  var updateVal =  this.props.update
      //    this.getUpdates.forEach(function(updateFunc){
      //      var elem = updateFunc()
      //      updateVal(elem.name, elem.value)
      //    })
      //  this.props.updateFilters(filter, value)
   },

   submit(){
     if (this.isFormValid(true)) {
      //  var updateVal =  this.props.update
      //    this.getUpdates.forEach(function(updateFunc){
      //      var elem = updateFunc()
      //      updateVal(elem.name, elem.value)
      //    })
       this.props.onSubmit()
       this.props.reset()
     }
   },



  render() {
    console.log("rendering again")
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
          onClick = {this.props.onSubmit}
        />
      </form>

    )
  }
})

export default Radium(form)
