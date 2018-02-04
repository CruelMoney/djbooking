import {DJs} from '../../../../constants/constants';
import shuffle from 'lodash.shuffle'
import DJCard from '../../../../components/common/DJCard';
import React, { Component } from 'react';
import './index.css';

class FloatingCards extends Component {
  componentWillMount(){
    const {location} = this.props;

    this.cards = shuffle(
      DJs
      .filter(dj => dj.location.toLowerCase().indexOf(location.toLowerCase()) !== -1)
      .map((dj, idx) => <div className="card-wrapper"><DJCard key={`dj-card-${idx}`} dj={dj} /></div>))
  }

  render() {
    return (
      <div className="floating-cards-wrapper">
        <div className="floating-cards">
          {
            this.cards.length > 2 ?
          this.cards 
          : null
          }
        </div>
      </div>

    );
  }
}

export default FloatingCards;