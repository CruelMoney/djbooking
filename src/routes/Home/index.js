import React, {Component} from 'react';
import Home from './components/Home'; 

export default class Index extends Component{

  onComponentWillMount(){
    document.title = "Book DJs with ease | Cueup"
  }

  render(){
    return(
    <Home />
  )}
}
