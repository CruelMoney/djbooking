import React, { PropTypes } from 'react'
import Formatter from '../../utils/Formatter'


var Event = React.createClass({
  propTypes: {
    cueupEvent:PropTypes.object,
    className: PropTypes.string
  },

  render() {
        var genres = ""
        const length = this.props.cueupEvent.genres.length
        this.props.cueupEvent.genres.forEach(function(genre, i) {
          if (i+1 === length) {
            genres += genre
          }else{
            genres = genres + genre + ", "
          }
        })
        return (
          <div
            className={this.props.className || ""}>
            <div className="event-card-text">


              <div className="event-card-status">
                <p>Status</p>
                {Formatter.cueupEvent.GetStatus(this.props.cueupEvent.status)}
              </div>
              <div className="event-card-info">
                <div className="event-card-fact">
                  <p>Date</p>
                  {this.props.cueupEvent.date}
                </div>
                <div className="event-card-fact">
                  <p>Start</p>
                  {Formatter.date.ToTime(this.props.cueupEvent.startTime)}
                </div>
                <div className="event-card-fact">
                  <p>End</p>
                  {Formatter.date.ToTime(this.props.cueupEvent.endTime)}
                </div>
                <div className="event-card-fact">
                  <p>Offers</p>
                  {this.props.cueupEvent.offers.length}
                </div>
              </div>
              <div className="event-card-genres">
                <p>Genres</p>
                {genres}
              </div>
            </div>
          </div>

 )
      }




})

export default (Event)
