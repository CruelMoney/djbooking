import React, { PropTypes } from 'react'
import Button from '../common/Button'
import Textfield from 'material-ui/TextField'
import onClickOutside from 'react-onclickoutside'


const signup = React.createClass({
    displayName: 'Signup',

    propTypes: {
      profile: PropTypes.object,
      signup: PropTypes.func.isRequired,
      signupFacebook: PropTypes.func,
      signupSoundcloud: PropTypes.func,
    },

    getInitialState() {
      return{
        email: "",
        password: "",
        isValid: false,
      }
    },

    componentWillMount(){
      this.setState({
        email: this.props.profile.email
      })
    },


    setValidState(){
      if(this.state.email !== "" && this.state.password !== ""){
        this.setState({
          isValid: true
        })
      }else{
        this.setState({
          isValid: false
        })
      }
    },

    onChangeEmail(event){
          this.setState({
            email: event.target.value
          })

          this.setValidState()
    },

    onChangePassword(event){
          this.setState({
            password: event.target.value
          })

          this.setValidState()
    },


    signup(){
      this.props.signup(
        this.props.profile.name,
        this.state.email,
        this.state.password,
        this.props.profile.phone)
    },
    signupFace(){
      this.props.signupFacebook(
        this.props.profile.name,
        this.props.profile.phone)
    },


  render() {

    return (
   <div>
      <div>
        <div style={{marginBottom:"10px"}} md={6}>
          <Button
            label= "Facebook"
            rounded = {true}
            onClick = {this.signupFace}
          />
        </div>
      </div>
      <p style={{textAlign:"center"}}>OR</p>
      <div>
        <Textfield
          type = "email"
          initialValue = {this.props.profile.email || ""}
          fullWidth={true}
          floatingLabelText="Email"
          onChange={this.onChangeEmail}
        />
      </div>
      <div style={{marginBottom:'20px'}}>
        <Textfield
          type = "password"
          fullWidth={true}
          floatingLabelText="Password"
          onChange={this.onChangePassword}
        />
      </div>
      <div style={{marginBottom:'20px'}}>
        <Button
          medium={true}
          label= "Sign up"
          important = {this.state.isValid}
          rounded = {true}
          onClick = {this.signup}
        />
      </div>
      <p style={{opacity:'0.5'}}>
        Forgot?
      </p>
    </div>
    )
    }
    })

export default signup
