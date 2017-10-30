import React, {Component} from 'react';
import HowItWorks from './components/HowItWorks'; 

export default class Index extends Component{

  onComponentWillMount(){
    document.title ="How it works | Cueup"
  }

  render(){
    return(
    <HowItWorks />
  )}
}
