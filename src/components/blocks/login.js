import React, { PropTypes } from 'react'
import Button from '../common/Button'
import Textfield from 'material-ui/TextField'


const login = React.createClass({
    displayName: 'Login',

    propTypes: {
      login: PropTypes.func.isRequired,
      loginFacebook: PropTypes.func,
      loginSoundcloud: PropTypes.func,
      isLoading: PropTypes.bool,
      error: PropTypes.string
    },

    getInitialState() {
      return{
        email: "",
        password: "",
        isValid: false,
      }
    },

    componentWillReceiveProps(nextProps){

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


    login(){
      this.props.login(this.state.email,this.state.password)
    },


  render() {

    return (
<div>
  <div>
    <div style={{marginBottom:"10px"}} md={6}>
      <Button
        label="Facebook"
        rounded={true}
        onClick={this.props.loginFacebook}
      />
    </div>
    <div  style={{marginBottom:"20px"}} md={6}>
      <Button

        label="Soundcloud"
        rounded={true}
        onClick={this.props.loginSoundcloud}
      />
    </div>
  </div>
  <p style={{textAlign:"center"}}>OR</p>
    <form
      onSubmit={this.login}
      >
      <div>
    <Textfield
      type="email"
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
      isLoading={this.props.isLoading}
      medium={true}
      label="Login"
      important={this.state.isValid}
      rounded={true}
      onClick={this.login}
    />
  </div>
  </form>
  {this.props.error ?
    <p style={{color:'red'}}>
      {this.props.error}
    </p>
  :null}
  <p style={{opacity:'0.5'}}>
    Forgot?
  </p>
</div>
    )
    }
    })

export default login
