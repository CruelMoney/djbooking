import React,  { PropTypes } from 'react'
import Radium from 'radium'
import muiThemeable from 'material-ui/styles/muiThemeable'
import UserHeader from '../blocks/UserHeader'
import without from 'lodash.without'

var user = React.createClass({

  propTypes: {
    profile: PropTypes.object,
    editMode: PropTypes.bool,
    toggleEditMode: PropTypes.func,
    updateProfileValue: PropTypes.func,
    save: PropTypes.func,
    resetProfile: PropTypes.func,
    deleteProfile: PropTypes.func
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
      save: PropTypes.func,
      resetting: PropTypes.bool,
      updateValue: PropTypes.func,
      deleteProfile: PropTypes.func
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
     save: this.submit,
     reset: this.reset,
     updateValue: this.props.updateProfileValue,
     deleteProfile: this.props.deleteProfile
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
      this.props.save()
    }
  },

  resetting: false,

  reset(){
    this.resetting = true
    this.props.resetProfile()
  },


  render() {
    if (!this.props.profile) {

    }

    return (
      <div>
        <UserHeader
          profile={this.props.profile}
        />


        <div  className="container">
          <div className="row">
            <div className="col-xs-4"></div>
            <div style={{paddingTop:"15px"}} className="col-xs-8">


              {this.props.children}
            </div>
          </div>
        </div>
      </div>)

  }
})


var styledUser = Radium(user)
export default muiThemeable()(styledUser)
