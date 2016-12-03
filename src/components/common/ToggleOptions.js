import React, { PropTypes } from 'react'
import Radium from 'radium'

var ToggleOptions = React.createClass({

  propTypes: {
    name: PropTypes.string.isRequired,
    children: PropTypes.node,
    value: PropTypes.string,
    glued: PropTypes.bool,
    disabled: PropTypes.bool
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
     registerReset: PropTypes.func,
   },

   componentWillMount() {
     if (this.props.value !== undefined) {
       this.setState({
         value: this.props.value
       })
     }
     if (this.context.registerValidation) {
       this.removeValidationFromContext = this.context.registerValidation(show =>
         this.isValid(show))
     }


     if (this.context.updateValue) {
       this.context.updateValue(this.props.name, this.props.value)
     }

     if (this.context.registerReset) {
       this.removeReset = this.context.registerReset(()=>this.setState({value: this.props.value}))
     }
   },

   componentWillUnmount() {
     if (this.context.removeValidationFromContext) {
       this.removeValidationFromContext()
     }
    if (this.removeReset) {
       this.removeReset()
     }   },

   isValid(showErrors) {
     const errors = (!this.state.value && this.state.value !== 0) ? ["You have to choose an option"] : []
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
   var count = 0
   const length = props.children.length
   return React.Children.map(props.children, child => {
       const active = state.value===child.props.name
       count += 1
       //Creating glued look
       if (props.glued) {
       switch (count) {
         case 1:
         return React.cloneElement(child, {
               active: active,
               onClick: this.handleButtonPress,
               leftRounded: true,
               disabled: this.props.disabled
         })
         case length:
         return React.cloneElement(child, {
               active: active,
               onClick: this.handleButtonPress,
               rightRounded: true,
               disabled: this.props.disabled
         })
         default:
         return React.cloneElement(child, {
               active: active,
               onClick: this.handleButtonPress,
               rounded: false,
               disabled: this.props.disabled
         })
       }


     }else{
       return React.cloneElement(child, {
             active: active,
             onClick: this.handleButtonPress,
             disabled: this.props.disabled
       })}
   })
 },

  render() {

    var children = this.renderChildren(this.state, this.props)
    children = children.map((el, i) => <td key={i}>{el}</td>)

if (this.props.glued) {
  return (
    <div className="toggle-options">
      <div style={{display:'flex', flexDirection:'row'}} >
        { this.renderChildren(this.state, this.props).map((el,i) => (
          < div className="gluedButton" key={i} >
          {el}
          </div> ))}

          </div>
          {this.state.errors.length ? (
            <div className="errors">
            {this.state.errors.map((error, i) => <p key={i}>{error}</p>)}
          </div>
        ) : null}
        </div>)
        }else{
          return (

            <div className="toggle-options">
              <table>
                <tbody>
                  <tr>
                    {children}
                  </tr>
                </tbody>
              </table>
              {this.state.errors.length ? (
                <div className="errors">
                  {this.state.errors.map((error, i) => <p key={i}>{error}</p>)}
                </div>
              ) : null}
            </div>

        )
    }

  }
})


export default Radium(ToggleOptions)
