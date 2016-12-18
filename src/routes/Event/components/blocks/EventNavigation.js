import React, { PropTypes } from 'react'
import Navlink  from '../../../../components/common/Navlink'


export default React.createClass({


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
              <Navlink to={"/event/"+this.props.id+"/"+this.props.hash} label="Event information"/>
            </li>

            <li>
              <Navlink to={"/event/"+this.props.id+"/"+this.props.hash+"/offers"} label="Dj offers"/>
            </li>

            <li >
              { this.props.isFinished ?
                <Navlink to={"/event/"+this.props.id+"/"+this.props.hash+"/review"} label="Review"/>
                :
                <Navlink to={"/event/"+this.props.id+"/"+this.props.hash+"/user"} label="Contact information"/>}
            </li>


          </ul>
        </nav>
      </div>
    )
  }
})
