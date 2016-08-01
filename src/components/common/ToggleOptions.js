import React, { PropTypes } from 'react'
import Button from '../common/Button'
import Radium from 'radium'
import muiThemeable from 'material-ui/styles/muiThemeable'

var ToggleOptions = React.createClass({

  propTypes: {
    name: PropTypes.string.isRequired,
    children: PropTypes.node,
    value: PropTypes.func,
    glued: PropTypes.bool
  },

 getDefaultProps() {
     return {
     }
   },

   getInitialState(){
     return {
        value: "",
        errors: []
     }
   },

   contextTypes: {
     isFilter: PropTypes.bool,
     isFormValid: PropTypes.func,
     updateValue: PropTypes.func,
     values: PropTypes.object.isRequired,
     registerValidation: PropTypes.func.isRequired,
   },

   componentWillMount() {
     if (this.props.value !== undefined) {
       this.setState({
         value: this.props.value
       })
     }
     this.removeValidationFromContext = this.context.registerValidation(show =>
       this.isValid(show))
   },

   componentWillUnmount() {
     this.removeValidationFromContext()
   },

   isValid(showErrors) {
     const errors = (!this.state.value) ? ["You have to choose an option"] : []

      if (showErrors) {
        this.setState({
            errors
        })
      }
      return !errors.length
   },

  updateValue(value){
    this.setState({
        value
    }, ()=>  {
      if (this.context.isFormValid) {
        this.context.isFormValid(false)
      }})

    this.context.updateValue(this.props.name, value)

  },

  handleButtonPress: function(value) {
  setTimeout(() => this.isValid(true), 0)

   this.updateValue(value)
 },

 renderChildren(state, props) {
   return React.Children.map(props.children, child => {
       const active = state.value===child.props.name
       return React.cloneElement(child, {
             active: active,
             onClick: this.handleButtonPress
       })
   })
 },

  render() {

    var styles = {
      tableStyle: {
        textAlign: 'center',
        width: '100%',
        tableLayout: 'fixed'
      },
      errors:{
        position: 'relative',
        bottom: '-10px',
        fontSize: '12px',
        lineHeight: '12px',
        color: 'rgb(244, 67, 54)',
        transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        WebkitTransition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
      }
    }
    var children = this.renderChildren(this.state, this.props)
    children = children.map((el, i) => <td key={i}>{el}</td>)
  return (

    <div >
      <table style = {styles.tableStyle}>
      <tbody>
            <tr>
             {children}
            </tr>
        </tbody>
      </table>
      {this.state.errors.length ? (
        < div style = {styles.errors}>
           {this.state.errors.map((error, i) => <div key={i}>{error}</div>)}
     </div>
  ) : null}
</div>

    )
  }
})


export default Radium(ToggleOptions)
