import React, { PropTypes } from 'react'
import Radium from 'radium'
import Button from '../common/Button'
import TextWrapper from '../common/TextElement'
import Gig from '../../containers/Gig'


import muiThemeable from 'material-ui/styles/muiThemeable'


var Gigs = React.createClass({
  propTypes: {
    gigs: PropTypes.arrayOf(PropTypes.object),
    fetchGigs: PropTypes.func,
  },



  getInitialState(){
    return{
      gigs: [],
      filter: "requested"
    }
  },

  componentWillMount() {
    if (this.props.gigs !== undefined) {
      this.setState({
        gigs: this.props.gigs
      })
      if (this.props.gigs.length === 0) {
        this.props.fetchGigs()
      }
    }
  },

  componentWillReceiveProps(nextprops){
    if (nextprops.gigs !== undefined) {
    this.setState({
      gigs: nextprops.gigs
    })
  }
  },

  componentWillUnmount() {
    this.setState({
      gigs: []
    })
  },

  getActionButtons(props = this.props){
    return (
    <div
      className="action-buttons"
      key="profile_actions">
      <div style={{marginBottom:"4px"}}>
        <Button
          rounded={true}
          label="Requested gigs"
          name="requested"
          active={this.state.filter === "requested"}
          onClick={()=>{
            this.setState({
              filter: "requested"
            })
          }}
        />
      </div>
      <div style={{marginBottom:"4px"}}>
        <Button
          rounded={true}
          label="Upcoming gigs"
          name="upcoming"
          active={this.state.filter === "upcoming"}
          onClick={()=>{
            this.setState({
              filter: "upcoming"
            })
          }}
        />
      </div>
      <div style={{marginBottom:"4px"}}>
        <Button
          rounded={true}
          label="Lost gigs"
          name="lost"
          active={this.state.filter === "lost"}
          onClick={()=>{
            this.setState({
              filter: "lost"
            })
          }}
        />
      </div>
      <div style={{marginBottom:"4px"}}>
        <Button
          rounded={true}
          label="Finished gigs"
          name="finished"
          active={this.state.filter === "finished"}
          onClick={()=>{
            this.setState({
              filter: "finished"
            })
          }}
        />
      </div>


      <div style={{marginBottom:"4px"}}>
        <Button
          rounded={true}
          label="Request features"
          name="request_features"
          onClick={()=>{
            console.log("not implemented");
          }}
        />
      </div>

    </div>

    )
  },

  render() {

    var finishedGigs = []
    var lostGigs = []
    var requestedGigs = []
    var upcomingGigs = []

    this.state.gigs.forEach(function(gig, i) {
      switch (gig.status) {
        case 'Finished':
          finishedGigs.push(<Gig key={gig.name+i} gig={gig}/>)
          break
        case 'Accepted':
          requestedGigs.push(<Gig key={gig.name+i} gig={gig}/>)
          break
        case 'Confirmed':
          upcomingGigs.push(<Gig key={gig.name+i} gig={gig}/>)
          break
        case 'Requested':
          requestedGigs.push(<Gig key={gig.name+i} gig={gig}/>)
          break
        case 'Lost':
          lostGigs.push(<Gig key={gig.name+i} gig={gig}/>)
          break
        case 'Cancelled':
          lostGigs.push(<Gig key={gig.name+i} gig={gig}/>)
          break
        default:

      }
    })

    const renderGigs = (gigs) => {
      if (gigs.length === 0) {
        return <div
          className="no-gigs"
               >
          No {this.state.filter} gigs.
        </div>
      }else {
        return gigs
      }
     }

    return(
      <div>
        {this.getActionButtons()}
        {this.state.filter === "upcoming" ?
          renderGigs(upcomingGigs)
        : null}
        {this.state.filter === "finished" ?
          renderGigs(finishedGigs)
        : null}
        {this.state.filter === "requested" ?
          renderGigs(requestedGigs)
        : null}
        {this.state.filter === "lost" ?
          renderGigs(lostGigs)
        : null}


      </div>)

  }
})

var styledGigs = Radium(Gigs)
export default muiThemeable()(styledGigs)
