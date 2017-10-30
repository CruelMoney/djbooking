import React, {Component} from 'react';
import  Preferences  from "./components/Preferences";

export default class Index extends Component{

  onComponentWillMount(){
    document.title = document.title.split('|')[0] + "| Preferences"
  }

  render(){
    return(
    <Preferences {...this.props} />
  )}
}