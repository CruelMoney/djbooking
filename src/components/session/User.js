import React,  { PropTypes } from 'react';
import AuthService from '../../utils/AuthService'
import Radium from 'radium';
import muiThemeable from 'material-ui/styles/muiThemeable';
import TextField from 'material-ui/TextField';
import UserHeader from './UserHeader'
import UserNavigation from './UserNavigation'
import without from 'lodash.without';
import assign from 'lodash.assign';

var user = React.createClass({

  propTypes: {
    profile: PropTypes.object,
    editMode: PropTypes.bool,
    toggleEditMode: PropTypes.func,
    updateProfileValue: PropTypes.func,
    onSubmit: PropTypes.func,
    reset: PropTypes.func,
  },

  childContextTypes: {
      profile:  PropTypes.object,
      editMode:PropTypes.bool,
      toggleEditMode: PropTypes.func,
      registerActions: PropTypes.func,
      update: PropTypes.func,
      registerValidation: PropTypes.func,
      isFormValid: PropTypes.func,
      reset: PropTypes.func,
      submit: PropTypes.func,
  },



  getChildContext() {
   return {
     profile: this.props.profile,
     editMode: this.props.editMode,
     toggleEditMode: this.props.toggleEditMode,
     registerActions: this.registerActions,
     update: this.update,
     registerValidation: this.registerValidation,
     isFormValid: this.isFormValid,
     reset: this.props.reset,
     submit: this.submit,
   };
  },


  getInitialState() {
    return {
      actions: [],
      isValid: false
    };
  },

  componentWillReceiveProps(nextProps, nextContext){
      this.setState({
        actions: this.getActionsFuncs.map((action) => action(nextProps))
      });
  },

  getActionsFuncs: [],

  registerActions(getActionsFunc) {
    this.getActionsFuncs = [...this.getActionsFuncs, getActionsFunc];
    this.setState({
      actions: this.getActionsFuncs.map((action) => action())
    });
    return this.removeAction.bind(null, getActionsFunc)
  },

  removeAction(ref) {
    this.getActionsFuncs = without(this.getActionsFuncs, ref);
    this.setState({
      actions: this.getActionsFuncs
    });

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
     this.props.updateProfileValue(name, value)
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


  render() {
    const styles ={

    }

    return  <div>
              <UserHeader/>
            <div  className="container">
            <div style={{borderRight: '1px solid #eee', paddingTop:"15px"}} className="col-md-3">
              <UserNavigation actions={this.state.actions}/>
            </div>
            <div style={{paddingTop:"15px"}} className="col-md-9">
              {this.props.children}
            </div>
            </div>
            </div>

  }
})


var styledUser = Radium(user);
export default muiThemeable()(styledUser);
