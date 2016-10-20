import React, { PropTypes } from 'react'
import Radium from 'radium'
import ToggleButton from '../common/ToggleButton'
import Button from '../common/Button'
import Event from '../../containers/Event'

import muiThemeable from 'material-ui/styles/muiThemeable'


var Events = React.createClass({
  propTypes: {
    events: PropTypes.arrayOf(PropTypes.object),
    fetchEvents: PropTypes.func,
    payEvent: PropTypes.func,
    editEvent: PropTypes.func,
    cancelEvent: PropTypes.func
  },

  contextTypes:{
    showUserCard: PropTypes.func,
    hideUserCard: PropTypes.func
  },

  componentWillMount() {
      this.props.fetchEvents()
      this.context.hideUserCard()
  },

  componentWillUnmount(){
    this.context.showUserCard()
  },


  getActionButtons(props = this.props){
    return (
    <div className="action-buttons" key="profile_actions">

      <div style={{marginBottom:"4px"}}>
        <Button
          rounded={true}
          label="Load more events"
          active={true}
          onClick={this.props.fetchEvents}
        />
      </div>

      <div style={{marginBottom:"4px"}}>
        <ToggleButton
          rounded={true}
          label="Request features"
          name="request_features"
        />
      </div>

    </div>

    )
  },

  render() {
    return(
      <div style={{display:'initial'}}>

      <div className="col-xs-4"/>
      <div
      className="col-xs-8">
      {this.getActionButtons()}
      </div>

      <div className="events">
      {this.props.events ?
        this.props.events.map(function(event, i){
          return <Event key={i} event={event}/>
        })
      :
      <div>No events homie</div>
    }
    </div>

      </div>)

  }
})

var styledEvents = Radium(Events)
export default muiThemeable()(styledEvents)
