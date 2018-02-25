import React, {Component} from 'react'
import './index.css'
import {DJs} from '../../../../constants/constants';
import shuffle from 'lodash.shuffle'
import DJCard from '../../../../components/common/DJCard';
export default class DJCards extends Component{
    
    animation = null;
    cardsLoaded = false;
    cards = [];

    state={
        currentCards: [],
        restCards: [],
        cards: []
    }

    componentWillUnmount(){
        this.animation && clearInterval(this.animation);
    }

    componentWillMount(){
        this.cards = shuffle(DJs.map((dj, idx) => <DJCard 
            { ...this.props }
            onLoad={()=>this.cardsLoaded++} 
            key={`dj-card-${idx}`} 
            dj={dj} 
            />))
    }

    componentDidMount(){
        const currentCards = this.cards.slice(0,11);
        const restCards = this.cards.slice(11,   this.cards.length-1);

        this.setState({
            currentCards,
            restCards
        });

        this.animation = setInterval(this.showNewCard, 4500);
    }
    

    showNewCard = () => {

        const { currentCards, restCards } = this.state;
        if(this.cardsLoaded >= currentCards.length){
            const idx = Math.floor(Math.random()*currentCards.length);
            const newCard = restCards.pop();
            const replacedCard = currentCards[idx];
            currentCards[idx] = newCard;
            this.setState({
                restCards: [replacedCard, ...restCards],
                currentCards
            });
        }      
    }

    render() {
    const { currentCards } = this.state;

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