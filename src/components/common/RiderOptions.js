import React from 'react'
import ToggleButton from './ToggleButton'
import connectToForm from '../higher-order/connectToForm'

class RiderOptions extends React.Component {
    state = {}

    enumToOptions = (val) =>{
        var state
        switch (val) {
            case "DJ_AND_SPEAKERS":
                state = {speakers:true}
                break
            case "DJ_AND_LIGHT":
                state = {light:true}
                break
            case "DJ_SPEAKERS_AND_LIGHT":
                state = {speakers:true, light: true}
                break
            default:
                state = {}
                break
            }  
        this.setState(state)          
    }

    optionsToEnum = (options) =>{
        if (options.speakers && !options.light){
            return "DJ_AND_SPEAKERS"
        }
        else if (options.speakers && options.light){
            return "DJ_SPEAKERS_AND_LIGHT"
        }
        else if (!options.speakers && options.light){
            return "DJ_AND_LIGHT"
        }else{
            return "DJ"
        }
    }

    componentWillMount() {
        if(this.props.value){
            this.enumToOptions(this.props.value)
        }
    }

    onClick = (val) =>{
        this.setState({[val]: true},
            ()=>this.props.onChange(this.optionsToEnum(this.state)) 
        )
    }

    onClickToggled = (val) =>{
        this.setState({[val]: false},
            ()=>this.props.onChange(this.optionsToEnum(this.state)) 
        )
    }

    render() {
        const{ speakersLabel, lightsLabel} = this.props;
        return (
            <div className="toggle-options">
                <table>
                    <tbody>
                    <tr>
                        <td>
                        <ToggleButton
                            onClick={this.onClick}
                            onClickToggled={this.onClickToggled}
                            name="speakers"
                            label={speakersLabel}
                            active={this.state.speakers || false}
                            rounded
                        >
                        {speakersLabel}
                        </ToggleButton>
                        </td>
                        <td>
                        <ToggleButton
                            onClick={this.onClick}
                            onClickToggled={this.onClickToggled}
                            name="light"
                            label={lightsLabel}
                            active={this.state.light || false}
                            rounded
                        >
                        {lightsLabel}
                        </ToggleButton>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }

}

export default connectToForm(RiderOptions)
export {RiderOptions as DisconnectedRiderOptions} 