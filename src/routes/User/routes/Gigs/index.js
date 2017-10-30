import React, {Component} from 'react';
import  Gigs  from "./components/Gigs";

export default class Index extends Component{

  onComponentWillMount(){
    document.title = document.title.split('|')[0] + "| Gigs"
  }

  render(){
    return(
    <Gigs {...this.props} />
  )}
}