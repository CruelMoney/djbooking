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

  contextTypes: {
    registerActions: PropTypes.func,
  },

  getInitialState(){
    return{
      events: []
    }
  },


  componentWillMount() {
    if (this.props.events !== undefined) {
      this.setState({
        events: this.props.events
      })
    }

    this.removeActionsFromContext = this.context.registerActions(this.getActionButtons(this.props))
  },

  componentWillReceiveProps(nextprops){
    if (nextprops.events !== undefined) {
    this.setState({
      events: nextprops.events
    })
  }
    this.removeActionsFromContext()
    this.removeActionsFromContext = this.context.registerActions(this.getActionButtons(nextprops))
  },

  componentWillUnmount() {
    this.removeActionsFromContext()
  },

  getActionButtons(props = this.props){
    return (
    <div key="profile_actions">

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
      <div>
        {this.state.events.map(function(event){
          return <Event event={event}/>
        })}
      </div>)

  }
})

var styledEvents = Radium(Events)
export default muiThemeable()(styledEvents)
