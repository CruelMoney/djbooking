import React, { PropTypes } from 'react'
import AutoComplete from 'material-ui/AutoComplete'
import Radium from 'radium'
import muiThemeable from 'material-ui/styles/muiThemeable'
import * as validators from '../../utils/validators'


/*eslint no-undef: 0*/
var locationService = new google.maps.places.AutocompleteService()

var Text = React.createClass({

  displayName: 'LocationSelectorSimple',

  propTypes: {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    validate: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string,
  },

  contextTypes: {
    isFormValid: PropTypes.func,
    registerValidation: PropTypes.func.isRequired,
    updateValue: PropTypes.func,
    color: PropTypes.string
  },

  getInitialState(){
    return{
      value: "",
      errors: [],
      dataSource: []
    }
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

  componentWillReceiveProps(nextProps){
    if (nextProps.value !== undefined) {
      this.setState({
        value: nextProps.value
      })
    }
  },



  componentWillUnmount() {
    this.removeValidationFromContext()
  },

  getDefaultProps() {
    return {
      validate: []
    }
  },

  updateSuggestions(predictions, status){
    var li = []

    predictions.forEach(function(prediction) {
      li.push(prediction.description)
    })

    this.setState({
      dataSource: li,
    })
  },

  onChange(value) {
    function toTitleCase(str)
    {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    value = toTitleCase(value)

    this.updateValue(value)
    locationService.getPlacePredictions({ input: value, types: ['(cities)'] , componentRestrictions: {country: 'dk'}}, this.updateSuggestions)
  },

    onValueSelected(value){
    this.updateValue(value)
  },

  timer: null,

  updateValue(value) {
    if (typeof value === "string") {
      this.setState({
        value
      }, ()=>  {
        if (this.context.isFormValid) {
          this.context.isFormValid(false)
        }})


      setTimeout(() => {
          this.isValid(true)
          }, 100)

      clearTimeout(this.timer)
      this.timer = setTimeout(() => this.context.updateValue(this.props.name, value), 1000)
    }
  },

  onBlur() {
    setTimeout(() => {
        this.isValid(true)
        }, 100)
  },

  isValid(showErrors) {
    const errors = this.props.validate
      .reduce((memo, currentName) =>
        memo.concat(validators[currentName](
          this.state.value
        )), [])


    if (showErrors) {
      this.setState({
        errors
      })
    }

    return !errors.length
  },

  render() {
    var styles = {

            textarea: {
              height: '70px',
              marginTop: "-10px"
            },

            paragraph: {
              fontSize: '14px',
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
            }

    }

    //Fix for not being able to style the input element
    setTimeout(() => {
          var elem = document.querySelector('.search-bar__auto-complete')
          elem.style.height = "70px"
        }, 100)

    return (
        <AutoComplete
          className="search-bar__auto-complete"
          style={this.props.style || styles.textarea}
          inputStyle={styles.input}
          hintStyle={styles.hint}
          floatingLabelText={this.props.floatingLabelText}
          onClick={this.onValueSelected}
          onChange={this.onChange}
          fullWidth={true}
          searchText={this.state.value}
          hintText={this.props.placeholder}
          dataSource={this.state.dataSource}
          onUpdateInput={this.onChange}
          onNewRequest={this.onValueSelected}
          onBlur={this.onBlur}
          errorText={this.state.errors.length ? (
            <div style={{
              bottom: "-10px",
              position: "relative",
              zIndex: "1"
            }}>
            <div className="errors">
              {this.state.errors.map((error, i) => <p key={i}>{error}</p>)}
            </div>
          </div>
          ) : null}/>
    )
  }
})

var StyledText = Radium(Text)
export default muiThemeable()(StyledText)
