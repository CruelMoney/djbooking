import React from 'react'
import { connect } from 'react-redux'
import RequestForm from '../components/session/RequestForm'
import * as actions from '../actions/actions'

function mapStateToProps(state, ownProps) {
  return {
    form: state.forms.requestForm,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onSubmit: (form) => { console.log("not implemented") },
}}


const SmartRequestForm = connect(mapStateToProps, mapDispatchToProps)(RequestForm)

export default props => (
    <SmartRequestForm {...props}/>
)
