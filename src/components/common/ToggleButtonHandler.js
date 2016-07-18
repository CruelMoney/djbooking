import React, { PropTypes } from 'react';
import ToggleButton from './ToggleButton'
import Radium from 'radium';
import muiThemeable from 'material-ui/styles/muiThemeable';

var ToggleButtonHandler = React.createClass({

  propTypes: {
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool
  },

 getDefaultProps() {
     return {
       rounded: true,
       columns: 3,
       genres: [],
       preToggled: [],

     }
   },

   getInitialState(){
     return {
        toggledButtons: [],
        errors: []
     };
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

   isValid(showErrors) {
      const errors = this.state.toggledButtons.length ? [] : ["At least 1 genre should be selected"];
      if (showErrors) {
        this.setState({
          errors
        });
      }

      return !errors.length;
   },

  spliceHelper(list, index){
    list.splice(index,1);
    return list;
  },

  updateValue(value){
    var toggledButtons = this.state.toggledButtons;
    var valueIndex = toggledButtons.indexOf(value);

    var newList = (valueIndex===-1)
                   ? [ ...toggledButtons, value ]
                   : this.spliceHelper(toggledButtons, valueIndex);

    this.setState({
       toggledButtons: newList,
    }, () => this.context.update(this.props.name, newList));


  },

  handleButtonPress(value) {
    setTimeout(() => this.isValid(true), 0);
    this.updateValue(value);
 },

  render() {
    var styles = {
      base: {
        width: "100%",
        tableLayout: "fixed",
          },
      td:{
        paddingRight: '15px'
      },
      tr:{
        height: '50px',
      },
      errors:{
        marginBottom: '-12px',
        position: 'relative',
        bottom: '-10px',
        fontSize: '12px',
        lineHeight: '12px',
        color: 'rgb(244, 67, 54)',
        transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        WebkitTransition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
      }

    };
    var rows = [];
    var buttons = [];
    var currentRow = 0;
    this.props.genres.forEach(function(genre, i) {

      var isToggled = false;
      var toggledButtons = this.state.toggledButtons;

      if (toggledButtons.indexOf(genre.name)!==-1 || this.props.preToggled.indexOf(genre.name)!==-1){
        isToggled = true;
      }

      //Adding to array
      buttons.push(
        <td
        style={styles.td}
        key={genre.name}>
          <ToggleButton
            rounded= {this.props.rounded}
            label =  {genre.name}
            active = {isToggled}
            disabled = {this.props.disabled}
            onClick = {this.handleButtonPress}/>
        </td>  );

      if ((i+1) % this.props.columns===0 && i!==0 || (i===this.props.genres.length-1)){
        currentRow++;
        rows.push(
          <tr
          style={styles.tr}
          key={currentRow}>
            {buttons}
          </tr>
          );
          buttons = [];
      }
    }.bind(this));
    return (
      <div>
      <table
        style={[
            styles.base]}>
        <tbody>{rows}</tbody>
      </table>
      {this.state.errors.length ? (
        < div style = {styles.errors}>
           {this.state.errors.map((error, i) => <div key={i}>{error}</div>)}
         </div>
      ) : null}
      </div>
    );
  }
});

ToggleButtonHandler = Radium(ToggleButtonHandler);



export default ToggleButtonHandler
