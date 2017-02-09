import React, {PropTypes} from 'react'
import SubmitButton from '../../../../../components/common/SubmitButton'
import Button from '../../../../../components/common/Button-v2'
import TextField from '../../../../../components/common/Textfield'
import Form from '../../../../../components/common/Form-v2'
import TextWrapper from '../../../../../components/common/TextElement'
import * as actions from '../../../../../actions/UserActions'
import * as eActions from '../../../../../actions/EventActions'
import ErrorMessage from '../../../../../components/common/ErrorMessage'
import {requestFeatures} from '../../../../../actions/Common'

var Profile = React.createClass({
    propTypes: {
        event: PropTypes.object,
        save: PropTypes.func,
    },

    getInitialState(){
      return{
        formValid: false
      }
    },

    update(form,callback){
      let event = {...this.props.event, ...form.values}
      this.props.save(event, callback)
    },

    render() {
        return (
          <div className="row event-information">
            <Form
              noError
              formInvalidCallback={()=>this.setState({formValid:false})}
              formValidCallback={()=>this.setState({formValid:true})}
              name="customer-information-form">
              <div className="context-actions" key="profile_actions">
                <SubmitButton
                  active={this.state.formValid}
                  onClick={this.update}
                  name="update_settings">
                Save changes</SubmitButton>

                <Button
                  onClick={()=>requestFeatures()}
                  name="request_features">
                Request features</Button>
                <ErrorMessage/>

              </div>
              <div className="event-card-wrapper">
                <div className="card profile col-md-7">
                  <TextWrapper label="contact Name" text="What is the name of the contact person?">
                    <TextField
                      value={this.props.event.contactName} name="contactName"
                      validate={['required']} />
                  </TextWrapper>
                  <TextWrapper label="E-mail" text="We only share your email with qualified dj's. Login to change email.">
                    <TextField value={this.props.event.contactEmail} name="email"
                      type="email" validate={['required', 'email']}
                      disabled
                    />

                  </TextWrapper>

                  <TextWrapper label="Phone" text="We only share your phone number with qualified dj's">
                    <TextField name="contactPhone" value={this.props.event.contactPhone}
                      type="tel"
                    />
                  </TextWrapper>

                  { !this.props.loggedIn ?

                    <TextWrapper
                      label="Profile"
                      text="Organizing multiple events? If yes, you should create a profile to keep track of the events.
                      Request an email to create a password for your profile.">
                      <div style={{display:"inline-block"}}>
                        <SubmitButton
                          onClick={(email, callback) => this.props.changePassword(this.props.event.contactEmail, callback)}
                          name="request_change_password"
                        >Request email</SubmitButton>
                      </div>
                    </TextWrapper>
                  : null }

                  { !this.props.event.emailVerified  ?

                    <TextWrapper
                      label="Email verification"
                      text="Request an email to verify your email. You will not receive offers before you verify your email.">
                      <div style={{display:"inline-block"}}>
                        <SubmitButton
                          onClick={(id, callback) => this.props.resendVerification(this.props.event.auth0Id, callback)}
                          name="request_verification_email"
                        >Request email</SubmitButton>
                      </div>
                    </TextWrapper>
                  : null }

                </div>
              </div>
            </Form>
          </div>
        )
    }
})

import {connect} from 'react-redux';


export const mapStateToProps = (state) => {
  return {
    event: state.events.values[0],
    loggedIn: state.user.status.signedIn
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    save: (event, callback) => dispatch(eActions.updateEvent(event,callback)),
    changePassword: (email, callback) => dispatch(actions.changePassword(email, callback)),
    resendVerification: (form, callback) => dispatch(actions.resendVerification(callback))
}}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
