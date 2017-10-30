import React, {Component} from 'react';
import  Book  from "./components/Book";

export default class Index extends Component{

  onComponentWillMount(){
    document.title = document.title.split('|')[0] + "| Book"
  }

  render(){
    return(
    <Book {...this.props} />
  )}
}