import React from 'react'
import Radium from 'radium'
import muiThemeable from 'material-ui/styles/muiThemeable'


var footer = React.createClass({


  render() {

    return (
      <div
style={{height: '200px',     borderTop: '1px solid #eee',
    marginTop: '20px',}}
      >

      </div>
    )
  }
})

var styledFooter = Radium(footer)
export default muiThemeable()(styledFooter)
