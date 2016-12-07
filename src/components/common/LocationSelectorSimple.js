import React, { PropTypes } from 'react'
import AutoComplete from 'material-ui/AutoComplete'
import connectToForm from './higher-order/connectToForm'

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
    color: PropTypes.string
  },

  getInitialState(){
    return{
      dataSource: []
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

    this.props.onChange(value)

    locationService.getPlacePredictions({ input: value, types: ['(cities)'] , componentRestrictions: {country: 'dk'}}, this.updateSuggestions)
  },

    onValueSelected(e){
    this.props.onChange(e.target.value)
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
        height: "30px"
      },
      input:{
        fontSize: '14px',
        color: this.context.color,
        fontFamily: "AvenirNext-Regular",
        top: "-11px"
      },
      underlineStyle:{
        borderColor: this.context.color
      },
      hint:{
        fontSize: '14px',
        color: "rgba(187,187,187,0.5)",
        fontFamily: "AvenirNext-Regular",
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
      },

    }
    var styles = this.props.big ? stylesBig : stylesNormal

    //Fix for not being able to style the input element
      setTimeout(() => {
            var elem = document.querySelector('.search-bar__auto-complete')
            elem.style.height = this.props.big ? "70px" : "30px"
          }, 100)


    return (
        <AutoComplete
          name={this.props.name}
          className="search-bar__auto-complete"
          style={this.props.style || styles.textarea}
          inputStyle={styles.input}
          hintStyle={styles.hint}
          underlineDisabledStyle={this.props.underlineDisabledStyle}
          underlineFocusStyle={styles.underlineStyle}
          floatingLabelText={this.props.floatingLabelText}
          onClick={this.onValueSelected}
          onChange={this.onChange}
          fullWidth={true}
          searchText={this.props.value}
          hintText={this.props.placeholder}
          dataSource={this.state.dataSource}
          onUpdateInput={this.onChange}
          onNewRequest={this.onValueSelected}
          onBlur={this.onBlur}
          errorText={this.props.errors.length ? (
            <div style={{
              bottom: "-10px",
              position: "relative",
              zIndex: "1"
            }}>
              <div className="errors">
                {this.props.errors.map((error, i) => <p className="error" key={i}>{error}</p>)}
            </div>
          </div>
          ) : null}/>
    )
  }
})

export default connectToForm(Text)
