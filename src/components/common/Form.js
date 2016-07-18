import React, {PropTypes} from 'react';
import without from 'lodash.without';
import assign from 'lodash.assign';
import Radium from 'radium';
import Button from './Button';

const form = React.createClass({
    displayName: 'Form',

    propTypes: {
      values: PropTypes.object,
      children: PropTypes.node,
      update: PropTypes.func,
      reset: PropTypes.func,
      onSubmit: PropTypes.func,
      updateFilters: PropTypes.func,
    },

    getInitialState() {
      return{
        isValid: false
      }
    },


    childContextTypes: {
      update: PropTypes.func,
      reset: PropTypes.func,
      submit: PropTypes.func,
      values: PropTypes.object,
      registerValidation: PropTypes.func,
      isFormValid: PropTypes.func,
      updateFilters: PropTypes.func,
    },

   validations: [],


   registerValidation(isValidFunc) {
     this.validations = [...this.validations, isValidFunc];
     return this.removeValidation.bind(null, isValidFunc);
   },

   removeValidation(ref) {
     this.validations = without(this.validations, ref);
   },

   update(name, value){
      this.props.update(name, value)
      this.isFormValid(false)
   },

   isFormValid(showErrors) {
      var isValid = this.validations.reduce((memo, isValidFunc) =>
      isValidFunc(showErrors) && memo, true);

      this.state.isValid = isValid
      return isValid
   },

   submit(){
     if (this.isFormValid(true)) {
       this.props.onSubmit();
       this.props.reset();
     }
   },

   getChildContext() {
     return {
       update: this.update,
       reset: this.props.reset,
       submit: this.submit,
       values: this.props.values,
       registerValidation: this.registerValidation,
       isFormValid: this.isFormValid,
       updateFilters: this.props.updateFilters,
     };
   },

  render() {

    return (
      <form>
        <ol >
         {this.props.children.map(function(result) {
           return <li  key={result.id}>{result}</li>;
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

    );
  }
});

export default Radium(form);
