import React from 'react'

export default React.createClass({
  render() {
    return (
      <div>
        <div className="home-bg">
          <h1>HOME</h1>
          <video autoPlay loop muted preload="auto">
            <source src="assets/KAYTRANADA.mp4" type="video/mp4"/>
          </video>
        </div>
      </div>
    )
  }
})
