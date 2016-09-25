import React, { PropTypes } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import * as validators from '../../utils/validators';

/*eslint no-undef: 0*/
var locationService = new google.maps.places.AutocompleteService();

export default React.createClass({

  displayName: 'LocationSelector',

  propTypes: {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    validate: PropTypes.arrayOf(PropTypes.string)
  },

  contextTypes: {
    update: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    registerValidation: PropTypes.func.isRequired
  },

  componentWillMount() {
    this.removeValidationFromContext = this.context.registerValidation(show =>
      this.isValid(show));
  },

  componentWillUnmount() {
    this.removeValidationFromContext();
  },

  getDefaultProps() {
    return {
      validate: []
    }
  },

  getInitialState() {
    return {
      errors: [],
      dataSource: []
    };
  },

  updateSuggestions(predictions, status){
    var li = [];

    predictions.forEach(function(prediction) {
      li.push(prediction.description);
    });

    this.setState({
      dataSource: li,
    });
  },

  updateValue(value) {
    this.context.update(this.props.name, value);

    if (this.state.errors.length) {
    setTimeout(() => this.isValid(true), 0);
    }
  },

  onChange(value) {
    this.updateValue(value);
    locationService.getQueryPredictions({ input: value, types: ['(cities)'] }, this.updateSuggestions);
  },

  onValueSelected(value){
    this.updateValue(value);
  },

  isValid(showErrors) {
    const errors = this.props.validate
      .reduce((memo, currentName) =>
        memo.concat(validators[currentName](
          this.context.values[this.props.name]
        )), []);

    if (showErrors) {
      this.setState({
        errors
      });
    }
    return !errors.length;
  },

  render() {
    return (
      <div>
        <AutoComplete
        onClick={this.onValueSelected}
        fullWidth={true}
        hintText={this.props.placeholder}
        floatingLabelText={this.props.label}
        dataSource={this.state.dataSource}
        onUpdateInput={this.onChange}
        onNewRequest={this.onValueSelected}
        onBlur={this.onBlur}
        errorText={this.state.errors.length ? (
           <div>
             {this.state.errors.map((error, i) => <div key={i}>{error}</div>)}
           </div>
        ) : null}/>
      </div>
    );
  }
});
