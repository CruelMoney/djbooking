import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import connectToForm from '../higher-order/connectToForm'

var Text = React.createClass({

  displayName: 'Textfield',

  propTypes: {
    value: PropTypes.string,
    maxLength:PropTypes.number,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    info: PropTypes.string,
    label: PropTypes.string,
    validate: PropTypes.arrayOf(PropTypes.string),
    onUpdatePipeFunc: PropTypes.func,
    disabled: PropTypes.bool,
    floatingLabelText: PropTypes.string,
    big: PropTypes.string
  },

  contextTypes: {
    color: PropTypes.string
  },

  getDefaultProps() {
    return {
      type: "string",
      validate: []
    }
  },

  onChange(e){
    var value = e.target.value

    this.props.onChange(value)
  },

  render() {
    var stylesBig = {
      textarea: {
        height: '70px',
        marginTop: "-10px"
      },

      input:{
        fontSize: '30px',
        color: this.context.color,
        fontFamily: "AvenirNext-Regular"
      },
      underlineStyle:{
        borderColor: this.context.color
      },
      hint:{
        bottom: '23px',
        fontSize: '30px',
        color: "rgba(187,187,187,0.5)",
        fontFamily: "AvenirNext-Regular",
      },
      error:{
        fontFamily: "SourceSansPro-Regular"
      }
    }
    var stylesNormal = {
      textarea: {
        height: "30px",
    marginBottom: "5px"
      },
      input:{
        fontSize: '14px',
        color: this.context.color,
        fontFamily: "AvenirNext-Regular",
        top: "0",
        marginTop: "0px",
        marginBottom: "5px"

      },
      underlineStyle:{
        borderColor: this.context.color,
        bottom: "0",
      },
      underlineNormalStyle:{
        bottom: "0",
      },
      hint:{
        fontSize: '14px',
        color: "#BBBBBB",
        fontFamily: "AvenirNext-Regular",
        bottom: "0"
      },
      error:{
        fontFamily: "AvenirNext-Regular",
        fontSize: '14px'
      },
      floatingLabelStyle:{
        fontFamily: "AvenirNext-Medium",
        fontSize: "16px",
        fontWeight: "500",
        lineHeight: "22px",
        color: "#4A4A4A",
        top: "6",
      },
      underlineDisabledStyle:{
        borderWidth:" 1px 0px 0px",
        borderStyle: "solid solid",
        borderColor: "rgb(224, 224, 224)"
      }

    }
    var styles = this.props.big ? stylesBig : stylesNormal

    var className = "text-field"
    className += this.props.disabled ? " disabled" : ""
    return (
              <div className={className}>
                <TextField
                  placeholder=""
                  value={this.props.value || undefined}
                  name={this.props.name}
                  disabled={this.props.disabled}
                  maxLength={this.props.maxLength}
                  style={styles.textarea}
                  inputStyle={styles.input}
                  hintStyle={styles.hint}
                  underlineDisabledStyle={styles.underlineDisabledStyle}
                  underlineFocusStyle={styles.underlineStyle}
                  underlineStyle={styles.underlineNormalStyle}
                  type={this.props.type}
                  floatingLabelText={this.props.floatingLabelText}
                  floatingLabelStyle={styles.floatingLabelStyle}
                  fullWidth={this.props.fullWidth || true}
                  hintText={this.props.placeholder}
                  onChange={(e)=>this.onChange(e)}
                  onBlur={this.props.onBlur}
                  errorText={this.props.errors ? this.props.errors.length ? (
                    <div style={{
                      position: "relative",
                      zIndex: "1"
                    }}>
                      <div className="errors" style={styles.error}>
                        {this.props.errors.map((error, i) => <p className="error" key={i}>{error}</p>)}
                      </div>
                    </div>
                  ) : null : null}/>
              </div>
    )
  }
})

export default connectToForm(Text)
export {Text as TexfieldDisconnected}
