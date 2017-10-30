import React, {Component} from 'react';
import  Reviews  from "./components/Reviews";

export default class Index extends Component{

  onComponentWillMount(){
    document.title = document.title.split('|')[0] + "| Reviews"
  }

  render(){
    return(
    <Reviews {...this.props} />
  )}
}