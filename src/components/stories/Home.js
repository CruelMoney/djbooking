import React from 'react'
import DatePicker from '../common/DatePicker.js'
import RequestForm from '../session/RequestForm'

export default React.createClass({
  render() {
    return (
      <div>
        <div className="home-bg"
        style={{overflow: 'hidden', position:'relative'}}
        >
          <div className="container"
            style={{
              display:'flex',
              aligItems:'center'
            }}>
            <div className="col-md-5 col-md-offset-1">
              <DatePicker/>
            </div>
            <div className="col-md-5"
              style={{
                display:'flex',
                alignItems:'center'
              }}
            >
              <div className="hero-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing <span>elit</span>. <span>Consectetur</span> ipsam ut eum nihil consectetur, dignissimos <span>dolor</span> reiciendis repellendus dolore repellat quasi adipisci quidem, id accusamus <span>ducimus</span> autem ratione, obcaecati aut.
              </div>
            </div>

          </div>
          <video autoPlay loop muted preload="auto">
            <source src="assets/blurry-night.mp4" type="video/mp4"/>
          </video>
        </div>

        <RequestForm>

        </RequestForm>
      </div>
    )
  }
})
