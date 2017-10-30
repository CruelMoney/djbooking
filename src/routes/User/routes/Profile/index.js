import React, {Component} from 'react';
import  Profile  from "./components/Profile";

export default class Index extends Component{

  onComponentWillMount(){
    document.title = document.title.split('|')[0] + "| Profile"
  }

  render(){
    return(
    <Profile {...this.props} />
  )}
}