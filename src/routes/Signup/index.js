import React, {Component} from 'react';
import Signup from './components/Signup'; 

export default class Index extends Component{

  onComponentWillMount(){
    document.title = "Apply to become DJ | Cueup"
  }

  render(){
    return(
    <Signup />
  )}
}
