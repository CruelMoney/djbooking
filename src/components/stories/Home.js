import React from 'react'
import DatePicker from '../common/DatePicker.js'

export default React.createClass({
  render() {
    return (
      <div>
        <div className="home-bg">
          <div className="container">
            <div className="col-md-5 col-md-offset-1">
              <DatePicker/>
            </div>
            <div className="col-md-5">


            </div>

          </div>
          <video autoPlay loop muted preload="auto">
            <source src="assets/KAYTRANADA.mp4" type="video/mp4"/>
          </video>
        </div>
      </div>
    )
  }
})
