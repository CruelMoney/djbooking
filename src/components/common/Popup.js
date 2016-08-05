import React, { PropTypes } from 'react'


const Popup = React.createClass({
    displayName: 'Popup',

    propTypes: {
      showing: PropTypes.bool,
      onClickOutside: PropTypes.func
    },

    getInitialState() {
      return{
        showing: false
      }
    },

    componentWillReceiveProps(nextProps){
      this.setState({
        showing: nextProps.showing
      })
    },

    applyBlur(){
      //document.getElementById("content").style.webkitFilter = "blur(2px)"
    },


    handleClickOutside: function(evt) {
  //    document.getElementById("content").style.webkitFilter = "blur(0px)"
      this.props.onClickOutside()
    },

  render() {
    {this.state.showing ?
      this.applyBlur() : null}
    return (

      <div>

  {this.state.showing ?
    <div
    className="filter-background"
    style={{
    position: 'fixed',
    zIndex: '1000',
    left: '0',
    top: '0',
    width: '100%',
    height: '100% ',
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    }}
    onClick={this.handleClickOutside}
    >
      <div
        style={{
          padding:"20px",
          paddingTop: '5px',
          width: '300px',
          backgroundColor:"white",
          zIndex: '1001',
        }}
        className="popup"
        onClick={function(event){
  event.stopPropagation()
}}

>
<div
style={{
   textAlign: 'right',
   width: '100%',

}}
>
<span
style={{
  color: '#aaaaaa',   
   fontSize: '28px',
   fontWeight: 'bold',
   cursor: 'pointer'
}}
onClick={this.handleClickOutside}
>×</span>
</div>

        {this.props.children}
      </div>
     </div>

     : null }

    </div>
  )}})

export default Popup
