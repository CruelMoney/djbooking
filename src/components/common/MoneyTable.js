import React, {Component} from 'react'
import Formatter from '../../utils/Formatter'

class TableItem extends Component {
    state = {  }
    render() {
        return (
            <div className="pay-fact">
              <div>
                <p style={{float:"left"}}>{this.props.label}</p>
                { !this.props.info ? null :
                <div className="info-popup">
                  <svg style={{height: "1em"}} viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <path d="M9,0 C4.582,0 1,3.581 1,8 C1,12.419 4.582,16 9,16 C13.418,16 17,12.419 17,8 C17,3.581 13.418,0 9,0 L9,0 Z M9,14 C8.44769231,14 8,13.5523077 8,13 C8,12.4469231 8.44769231,12 9,12 C9.55230769,12 10,12.4469231 10,13 C10,13.5523077 9.55230769,14 9,14 L9,14 Z M10.647,8.243 C10.174,8.608 9.913,8.809 9.913,9.39 L9.913,10.204 C9.913,10.663 9.507,11.038 9.006,11.038 C8.504,11.038 8.097,10.663 8.097,10.204 L8.097,9.39 C8.097,8.033 8.928,7.392 9.477,6.968 C9.951,6.602 10.211,6.402 10.211,5.822 C10.211,5.168 9.67,4.634 9.006,4.634 C8.341,4.634 7.801,5.167 7.801,5.822 C7.801,6.283 7.393,6.655 6.892,6.655 C6.392,6.655 5.983,6.283 5.983,5.822 C5.983,4.248 7.34,2.968 9.006,2.968 C10.671,2.968 12.027,4.247 12.027,5.822 C12.027,7.178 11.197,7.818 10.647,8.243 L10.647,8.243 Z" fill="#434343" ></path>
                    </g>
                  </svg>
                  <div className="info">
                    {this.props.info}
                  </div>
                </div>}
              </div>
              {this.props.children}
            </div>
        );
    }
}

export {TableItem}

class MoneyTable extends Component {
    state = {  }
    render() {
        return (
            <div className="pay-info">
                {this.props.children}
            </div>
        );
    }
}

export default MoneyTable;