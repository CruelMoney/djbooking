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
      isFormValid: PropTypes.func,
      reset: PropTypes.func,
      submit: PropTypes.func,
  },

  getChildContext() {
   return {
     profile: this.state.profile,
     editMode: this.props.editMode,
     toggleEditMode: this.props.toggleEditMode,
     registerActions: this.registerActions,
     update: this.update,
     registerUpdate: this.registerUpdate,
     registerValidation: this.registerValidation,
     isFormValid: this.isFormValid,
     submit: this.submit,
     reset: this.reset
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
      this.setState({
        actions: this.getActionsFuncs.map((action) => action(nextProps, this.submit, this.reset))
      })
  },

  getActionsFuncs: [],

  registerActions(getActionsFunc) {
    this.getActionsFuncs = [...this.getActionsFuncs, getActionsFunc]
    this.setState({
      actions: this.getActionsFuncs.map((action) => action())
    })
    return this.removeAction.bind(null, getActionsFunc)
  },

  removeAction(ref) {
    this.getActionsFuncs = without(this.getActionsFuncs, ref)
    this.setState({
      actions: this.getActionsFuncs
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

  update(name, value){
     this.props.updateProfileValue(name, value)
     this.isFormValid(false)
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
    var updateVal =  this.props.updateProfileValue
      this.getUpdates.forEach(function(updateFunc){
        var elem = updateFunc()
        updateVal(elem.name, elem.value)
      })
    this.props.updateProfile()
    this.props.toggleEditMode()
  },

  reset(){
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
