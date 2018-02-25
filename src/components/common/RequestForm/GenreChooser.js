import React from 'react'
import ToggleButton from '../ToggleButton'
import connectToForm from '../../higher-order/connectToForm'
import InfoPopup from '../InfoPopup';

class GenreChooser extends React.Component {
    state = {
      selected: null
    }

    // Fired on first select
    onChooseGenres = (val) =>{
      this.setState({selected: 'choose'},
      ()=>this.props.onChange(false) 
      );
    }

    onLetCueup = () => {
      this.setState({selected: 'cueup'},
        ()=>this.props.onChange(["Top 40", "Local", "80's", "Disco", "Remixes"]) 
      ); 
    }

    // Fired if already selected
    onClickToggled = (val) =>{
      this.setState({selected: val});
    }

    render() {
      const {selected} = this.state;
      const {cueupDecideLabel, chooseLabel, cueupDecideDescription} = this.props;
        return (
            <div className="toggle-options">
                <table>
                    <tbody>
                    <tr>
                        <td>
                        <ToggleButton
                            onClick={this.onChooseGenres}
                            onClickToggled={this.onClickToggled}
                            name="choose"
                            label={chooseLabel}
                            active={selected === 'choose'}
                            rounded
                        >{chooseLabel}</ToggleButton>
                        </td>
                        <td>
                        <ToggleButton
                            onClick={this.onLetCueup}
                            onClickToggled={this.onClickToggled}
                            name="cueup"
                            label={
                              <span>
                                {cueupDecideLabel}
                              <InfoPopup
                                info={cueupDecideDescription}
                                />
                              </span>}
                            active={selected === 'cueup'}
                            rounded
                        />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }

}

export default connectToForm(GenreChooser)
export {GenreChooser as DisconnectedGenreChooser} 