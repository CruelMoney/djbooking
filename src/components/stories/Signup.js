import React from 'react'
import ReactDOM from 'react-dom'
import SignUpForm from '../../containers/SignupForm'



var containerStyle = {
  maxWidth: '700px',
  paddingLeft: '40px',
  paddingRight: '40px',
  margin: 'auto',
  marginBottom: '50px'
}

export default React.createClass({
  render() {
    return  <div style = {containerStyle}>
              <SignUpForm/>
            </div>
  }
})
