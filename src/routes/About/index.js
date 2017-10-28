import React, {Component} from 'react';
import About from './components/About'; 

export default class Index extends Component{

  onComponentWillMount(){
    document.title = "About | Cueup"
  }

  render(){
    return(
    <About />
  )}
}
