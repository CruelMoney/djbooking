import React, {Component} from 'react';
import  Events  from "./components/Events";

export default class Index extends Component{

  onComponentWillMount(){
    document.title = document.title.split('|')[0] + "| Events"
  }

  render(){
    return(
    <Events {...this.props} />
  )}
}