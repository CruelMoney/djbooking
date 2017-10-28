import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import * as validators from '../../utils/validators';

export default class Text extends Component {

  displayName= 'Text'

  propTypes= {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    validate: PropTypes.arrayOf(PropTypes.string)
  }

  componentWillMount() {
    this.removeValidationFromContext = this.context.registerValidation(show =>
      this.isValid(show));
  }

  componentWillUnmount() {
    this.removeValidationFromContext();
  }

  static defaultProps = {
      type: "string",
      validate: []
    }

  state={
      errors: []
    }

  updateValue = (value) => {
    this.context.update(this.props.name, value);

    if (this.state.errors.length) {
    setTimeout(() => this.isValid(true), 0);
    }
  }

  onChange = (event) => {
    this.updateValue(event.target.value)
  }

  isValid = (showErrors) => {
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
  }

  onBlur = () => {
    this.isValid(true);
  }

  render() {
    return (
      <div>
        <TextField
          type={this.props.type}
          fullWidth={true}
          hintText={this.props.placeholder}
          floatingLabelText={this.props.label}
          onChange={this.onChange}
          onBlur={this.onBlur}
          errorText={this.state.errors.length ? (
            <div>
              {this.state.errors.map((error, i) => <div key={i}>{error}</div>)}
            </div>
          ) : null}/>
      </div>
    );
  }
}

Text.contextTypes= {
  update: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  registerValidation: PropTypes.func.isRequired
}

