import React from "react";
import ToggleButton from "../ToggleButton";
import connectToForm from "../../higher-order/connectToForm";
import InfoPopup from "../InfoPopup";

class GenreChooser extends React.Component {
  state = {
    selected: null
  };

  // Fired on first select
  onChooseGenres = val => {
    this.setState({ selected: "choose" }, () => {
      this.props.onChange("choose");
      this.props.letCueupDecide(false);
    });
  };

  onLetCueup = () => {
    this.setState({ selected: "cueup" }, () => {
      this.props.onChange(["top 40", "local", "80's", "disco", "remixes"]);
      this.props.letCueupDecide(true);
    });
  };

  // Fired if already selected
  onClickToggled = val => {
    this.setState({ selected: val });
  };

  render() {
    const { selected } = this.state;
    const {
      cueupDecideLabel,
      chooseLabel,
      cueupDecideDescription
    } = this.props;
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
                  active={selected === "choose"}
                  rounded
                >
                  {chooseLabel}
                </ToggleButton>
              </td>
              <td>
                <ToggleButton
                  onClick={this.onLetCueup}
                  onClickToggled={this.onClickToggled}
                  name="cueup"
                  label={
                    <span>
                      {cueupDecideLabel}
                      <InfoPopup info={cueupDecideDescription} />
                    </span>
                  }
                  active={selected === "cueup"}
                  rounded
                />
              </td>
            </tr>
          </tbody>
          {this.props.errors.length ? (
            <div className="errors" style={{ marginTop: "5px" }}>
              {this.props.errors.map((error, i) => (
                <p className="error" key={i}>
                  {error}
                </p>
              ))}
            </div>
          ) : null}
        </table>
      </div>
    );
  }
}

export default connectToForm(GenreChooser);
export { GenreChooser as DisconnectedGenreChooser };
