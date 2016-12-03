import React from 'react'
import SignUpForm from '../../containers/SignupForm'
import { Link } from 'react-router';

export default React.createClass({
  render() {
    return  <div >
      <header className=""

      >
      <div id="stripes">
        <span/>
        <span/>
        <span className="white"/>
        <span/>
      </div>
      <div className="container">

      </div>

    </header>
      <SignUpForm/>
        <div className="prefooter">
          <div className="container">
            <div className="row">
            <div className="action-title col-md-7">
              <span style={{color:this.themeColor}}>Ready to get started?</span>
              Arrange an event, or become a DJ.
            </div>
            <div className="col-md-5 action-buttons">
              <Link style={{background:this.themeColor, color:"#FFFFFF"}} className="button" to="/">Arrange event</Link>
              <Link style={{background:"#FFFFFF", color:this.themeColor}} className="button" to="/signup">Become DJ</Link>
            </div>
            </div>
          </div>
        </div>
    </div>
  }
})
