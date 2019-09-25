import React, { Component } from "react";
import "./index.css";
import { DJs } from "../../../../constants/constants";
import DJCard from "../../../../components/common/DJCard";
export default class DJCards extends Component {
  render() {
    return (
      <div className="dj-cards">
        <div>
          {DJs.slice(0, 3).map((dj, idx) => (
            <DJCard key={`dj-card-${idx}`} dj={dj} />
          ))}
        </div>
        <div>
          {DJs.slice(3, 6).map((dj, idx) => (
            <DJCard key={`dj-card-${idx}`} dj={dj} />
          ))}
        </div>
        <div>
          {DJs.slice(6, 9).map((dj, idx) => (
            <DJCard key={`dj-card-${idx}`} dj={dj} />
          ))}
        </div>
        <div>
          {DJs.slice(9, 11).map((dj, idx) => (
            <DJCard key={`dj-card-${idx}`} dj={dj} />
          ))}
        </div>
      </div>
    );
  }
}
