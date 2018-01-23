import React, {Component} from 'react';
import  Preferences  from "./components/Preferences";

export default class Index extends Component{


  render(){
    return(
    <Preferences {...this.props} />
  )}
}