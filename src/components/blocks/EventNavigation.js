import React, { PropTypes } from 'react'
import Navlink  from '../common/Navlink'


export default React.createClass({

  propTypes: {
    auth0Id: PropTypes.string,
   },


  render() {
    return (
      <div>

        <nav >
          <ul className="userNavigation"
            style={
              { listStyleType: 'none',
                padding: '0',
                marginBottom: '0px',
                display: 'flex',
                flexDirection: 'row',
                textTransform: 'uppercase',
                justifyContent: 'space-between'
              }}>


            <li>
              <Navlink to={"/event/"+this.props.id} label="Event information"/>
            </li>

            <li>
              <Navlink to={"/event/"+this.props.id+"/offers"} label="Dj offers"/>
            </li>

            <li >
              { this.props.isFinished ?
                <Navlink to={"/event/"+this.props.id+"/review"} label="Review"/>
                :
                <Navlink to={"/event/"+this.props.id+"/user"} label="Your information"/>}
            </li>


          </ul>
        </nav>
      </div>
    )
  }
})
