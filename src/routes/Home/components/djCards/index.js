import React, {Component} from 'react'
import './index.css'
import {DJs} from '../../../../constants/constants';
import shuffle from 'lodash.shuffle'
import DJCard from '../../../../components/common/DJCard';
export default class DJCards extends Component{

cards = []

componentWillMount(){
    this.cards = shuffle(DJs.map((dj, idx) => <DJCard key={`dj-card-${idx}`} dj={dj} />))
}

  render() {
    
    return (
        <div className="dj-cards">
            <div>
                {this.cards.slice(0,3)}
            </div>
            <div>
                {this.cards.slice(3,6)}
            </div>
            <div>
                {this.cards.slice(6,9)}
            </div>
            <div>
                {this.cards.slice(9,11)}
            </div>
            
        </div>
    )
  }
}