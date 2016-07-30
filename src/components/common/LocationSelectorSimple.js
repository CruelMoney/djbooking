import React, { PropTypes } from 'react'
import AutoComplete from 'material-ui/AutoComplete'
import Radium from 'radium'
import muiThemeable from 'material-ui/styles/muiThemeable'
import * as validators from '../../utils/validators'

var locationService = new google.maps.places.AutocompleteService()

var Text = React.createClass({

  displayName: 'LocationSelectorSimple',

  propTypes: {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    validate: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string,
    onChange: PropTypes.func
  },

  contextTypes: {
    resetting: PropTypes.bool,
    isFormValid: PropTypes.func,
    registerValidation: PropTypes.func.isRequired
  },

  getInitialState(){
    return{
      value: "",
      errors: [],
      dataSource: []
    }
  },

  componentWillMount() {

    this.removeValidationFromContext = this.context.registerValidation(show =>
      this.isValid(show))
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
    this.updateValue(value)
    locationService.getQueryPredictions({ input: value, types: ['(cities)'] }, this.updateSuggestions)
  },

  onValueSelected(value){
    this.updateValue(value)
  },

  updateValue(value) {

    setTimeout(() => {
        this.isValid(true)
        }, 100)
    this.props.onChange(value)

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
      input:{
        fontSize: '30px',
        color: this.props.muiTheme.palette.primary1Color,
        fontWeight: '300',
        height: '100%'
      },

      hint:{
        bottom: '20px',
        fontSize: '30px',
        fontWeight: '300',
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
        style = {styles.textarea}
        inputStyle = {styles.input}
        hintStyle = {styles.hint}
        //onClick={this.onValueSelected}
        fullWidth={true}
        hintText={this.props.placeholder}
        dataSource={this.state.dataSource}
        onUpdateInput={this.onChange}
        onNewRequest={this.onValueSelected}
        onBlur={this.onBlur}
        errorText={this.state.errors.length ? (
           <div>
             {this.state.errors.map((error, i) => <div key={i}>{error}</div>)}
           </div>
        ) : null}/>
    )
  }
})

var StyledText = Radium(Text)
export default muiThemeable()(StyledText)
