import React,  { PropTypes } from 'react'
import AuthService from '../../utils/AuthService'
import Radium from 'radium'
import muiThemeable from 'material-ui/styles/muiThemeable'
import TextField from 'material-ui/TextField'
import UserHeader from './UserHeader'
import UserNavigation from './UserNavigation'
import without from 'lodash.without'
import assign from 'lodash.assign'

var user = React.createClass({

  propTypes: {
    profile: PropTypes.object,
    editMode: PropTypes.bool,
    toggleEditMode: PropTypes.func,
    updateProfileValue: PropTypes.func,
    updateProfile: PropTypes.func,
    resetProfile: PropTypes.func
  },

  childContextTypes: {
      profile:  PropTypes.object,
      editMode:PropTypes.bool,
      toggleEditMode: PropTypes.func,
      registerActions: PropTypes.func,
      update: PropTypes.func,
      registerUpdate: PropTypes.func,
      registerValidation: PropTypes.func,
      validForSubmit: PropTypes.bool,
      reset: PropTypes.func,
      submit: PropTypes.func,
      resetting: PropTypes.bool,
      updateProfileValue: PropTypes.func
  },


  getChildContext() {
   return {
     profile: this.state.profile,
     editMode: this.props.editMode,
     toggleEditMode: this.props.toggleEditMode,
     registerActions: this.registerActions,
     update: this.props.updateProfileValue,
     registerUpdate: this.registerUpdate,
     registerValidation: this.registerValidation,
     submit: this.submit,
     reset: this.reset,
     updateProfileValue: this.props.updateProfileValue
    }
  },

  getInitialState() {
    return {
      actions: [],
      profile: {},
      isValid: false
    }
  },

  componentWillMount(){
    this.setState({
      profile: this.props.profile
    })
  },

  componentWillReceiveProps(nextProps){

  },

  actions: [],

  registerActions(action) {
    this.actions = [...this.actions, action]
    this.setState({
      actions: this.actions
    })
    return this.removeAction.bind(null, action)
  },

  removeAction(ref) {
    this.actions = without(this.actions, ref)
    this.setState({
      actions: this.actions
    })

  },


  validations: [],

  registerValidation(isValidFunc) {
    this.validations = [...this.validations, isValidFunc]
    return this.removeValidation.bind(null, isValidFunc)
  },

  removeValidation(ref) {
    this.validations = without(this.validations, ref)
  },

  getUpdates:[],

  registerUpdate(updateFunc) {
    this.getUpdates = [...this.getUpdates, updateFunc]
    return this.removeUpdates.bind(null, updateFunc)
  },

  removeUpdates(ref) {
    this.getUpdates = without(this.getUpdates, ref)
  },


  isFormValid(showErrors) {
     var isValid = this.validations.reduce((memo, isValidFunc) =>
     isValidFunc(showErrors) && memo, true)

     this.setState({
       isValid
     })
     return isValid
  },

  submit(){
    if (this.isFormValid(true)) {
      this.props.updateProfile()
      this.props.toggleEditMode()
    }
  },

  resetting: false,

  reset(){
    this.resetting = true
    this.props.resetProfile()
  },


  render() {
    const styles ={

    }

    return  <div>
      <UserHeader
        profile ={this.props.profile}
        editMode ={this.props.editMode}
        updateProfileValue ={this.props.updateProfileValue}
      />
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


var styledUser = Radium(user)
export default muiThemeable()(styledUser)
