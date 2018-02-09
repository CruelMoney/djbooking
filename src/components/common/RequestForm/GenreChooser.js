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
                            label="Choose genres"
                            active={selected === 'choose'}
                            rounded
                        >Choose genres</ToggleButton>
                        </td>
                        <td>
                        <ToggleButton
                            onClick={this.onLetCueup}
                            onClickToggled={this.onClickToggled}
                            name="cueup"
                            label={
                              <span>
                                Let Cueup decide
                              <InfoPopup
                                info={"Let us choose suitable music genres based on your other selections and event description."}
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