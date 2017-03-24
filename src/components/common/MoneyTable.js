import React, {Component} from 'react'
import Formatter from '../../utils/Formatter'
import InfoPopup from './InfoPopup'

class TableItem extends Component {
    state = {  }
    render() {
        return (
            <div className="pay-fact">
              <div>
                <p style={{float:"left"}}>{this.props.label}

                
                 { !this.props.info ? null :
                <InfoPopup
                    info={this.props.info}
                    />
                 }
                </p>
             
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