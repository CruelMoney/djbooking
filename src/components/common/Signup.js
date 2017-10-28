import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from './Button-v2'
import Textfield from 'material-ui/TextField'
import { connect } from 'react-redux'
import * as actions from '../../actions/SignupActions'


class signup extends Component{
    displayName= 'Signup'

    propTypes= {
      profile: PropTypes.object,
      signup: PropTypes.func.isRequired,
      signupFacebook: PropTypes.func,
      signupSoundcloud: PropTypes.func,
    }

    state={
        email: "",
        password: "",
        isValid: false,
      }
  

    componentWillMount(){
      this.setState({
        email: this.props.profile.email
      })
    }


    setValidState = () => {
      if(this.state.email !== "" && this.state.password !== ""){
        this.setState({
          isValid: true
        })
      }else{
        this.setState({
          isValid: false
        })
      }
    }

    onChangeEmail = (event) => {
          this.setState({
            email: event.target.value
          })

          this.setValidState()
    }

    onChangePassword = (event) => {
          this.setState({
            password: event.target.value
          })

          this.setValidState()
    }

    signup = () => {
      this.props.signup(
        this.props.profile.name,
        this.state.email,
        this.state.password,
        this.props.profile.phone)
    }
    signupFace = () => {
      this.props.signupFacebook(
        this.props.profile.name,
        this.props.profile.phone)
    }


  render() {

    return (
   <div>
      <div>
        <div style={{marginBottom:"10px"}} md={6}>
          <Button
            label="Facebook"
            rounded={true}
            onClick={this.signupFace}
          />
        </div>
      </div>
      <p style={{textAlign:"center"}}>OR</p>
      <div>
        <Textfield
          type="email"
          initialValue={this.props.profile.email || ""}
          fullWidth={true}
          floatingLabelText="Email"
          onChange={this.onChangeEmail}
        />
      </div>
      <div style={{marginBottom:'20px'}}>
        <Textfield
          type="password"
          fullWidth={true}
          floatingLabelText="Password"
          onChange={this.onChangePassword}
        />
      </div>
      <div style={{marginBottom:'20px'}}>
        <Button
          medium={true}
          label="Sign up"
          important={this.state.isValid}
          rounded={true}
          onClick={this.signup}
        />
      </div>
      <p style={{opacity:'0.5'}}>
        Forgot?
      </p>
    </div>
    )
    }
    }

    function mapDispatchToProps(dispatch, ownprops) {
      return {
        signup: (name, email, password, phone) => dispatch(actions.signup({signup:"EMAIL", name, email, password, phone}, false)),
        signupFacebook: (name, phone)        => dispatch(actions.signup({signup:"FACEBOOK", name, phone}, false)),
        signupSoundcloud: (name, phone)      => dispatch(actions.signup({signup:"SOUNDCLOUD", name, phone}, false))
      }
    }

    const SmartSignup = connect(state=>state, mapDispatchToProps)(signup)


    export default props => (
        <SmartSignup {...props}/>
    )
