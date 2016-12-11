import React, {PropTypes} from 'react'
import SubmitButton from '../common/SubmitButton'
import Button from '../common/Button-v2'
import TextField from '../common/Textfield'
import Form from '../../containers/Form-v2'
import TextWrapper from '../common/TextElement'
import * as actions from '../../actions/UserActions'

var Profile = React.createClass({
    propTypes: {
        profile: PropTypes.object,
        save: PropTypes.func,
    },

    getInitialState(){
      return{
        formValid: false
      }
    },

    render() {
        return (
          <div className="row event-information">
            <Form
              formInvalidCallback={()=>this.setState({formValid:false})}
              formValidCallback={()=>this.setState({formValid:true})}
              name="customer-information-form">
              <div className="context-actions" key="profile_actions">
                <SubmitButton
                  active={this.state.formValid}
                  onClick={this.props.save}
                  name="update_profile">
                Save changes</SubmitButton>

                <Button
                  onClick={()=>console.log("not implemented")}
                  name="request_features">
                Request features</Button>
              </div>
              <div className="event-card-wrapper">
                <div className="card profile col-md-7">
                  <TextWrapper label="Name" text="What is the name of the contact person?">
                    <TextField
                      value={this.props.profile.name} name="name"
                      validate={['required']} />
                  </TextWrapper>
                  <TextWrapper label="E-mail" text="We only share your email with qualified dj's. If you change your email you will have to confirm it again.">
                    <TextField value={this.props.profile.email} name="email"
                      type="email" validate={['required', 'email']} />
                  </TextWrapper>

                  <TextWrapper label="Phone" text="We only share your phone number with qualified dj's">
                    <TextField name="phone" value={this.props.profile.phone} type="tel" />
                  </TextWrapper>


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
    profile: state.user.profile
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    save: (profile, callback) => dispatch(actions.save(profile,callback)),
}}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
