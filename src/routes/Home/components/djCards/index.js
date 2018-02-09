import React, {Component} from 'react'
import './index.css'
import {DJs} from '../../../../constants/constants';
import shuffle from 'lodash.shuffle'
import DJCard from '../../../../components/common/DJCard';
export default class DJCards extends Component{
    
    animation = null;
    cardsLoaded = false;

    state={
        currentCards: [],
        restCards: [],
        cards: []
    }

componentWillMount(){
    this.cards = shuffle(DJs.map((dj, idx) => <DJCard key={`dj-card-${idx}`} dj={dj} />))
}

    return (
        <div className="dj-cards">
            <div>
                {currentCards.slice(0,3)}
            </div>
            <div>
                {currentCards.slice(3,6)}
            </div>
            <div>
                {currentCards.slice(6,9)}
            </div>
            <div>
                {currentCards.slice(9,11)}
            </div>
            
        </div>
    )
  }
}