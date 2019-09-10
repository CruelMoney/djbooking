import React, { useState, useEffect, useRef } from "react";
import AutoComplete from "material-ui/AutoComplete";
import connectToForm from "../higher-order/connectToForm";
import useScript from "@charlietango/use-script";
import { Body } from "../Text";

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const LocationSelector = ({
  value = "",
  big,
  name,
  onChange,
  errors,
  onBlur,
  disabled,
  placeholder,
  floatingLabelText
}) => {
  const [dataSource, setDataSource] = useState([]);
  const locationService = useRef();

  const [loaded] = useScript(
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyAQNiY4yM2E0h4SfSTw3khcr9KYS0BgVgQ&libraries=geometry,places,visualization,geocode"
  );

  useEffect(() => {
    if (loaded && !locationService.current) {
      locationService.current = new window.google.maps.places.AutocompleteService();
      const elem = document.querySelector(".search-bar__auto-complete");
      if (elem) {
        elem.style.height = big ? "70px" : "30px";
      }
    }
  }, [big, loaded]);

  if (!loaded) {
    return <Body>Loading...</Body>;
  }

  const updateSuggestions = (predictions, status) => {
    var li = [];

    if (predictions) {
      predictions.forEach(function(prediction) {
        li.push(prediction.description);
      });
    }

    setDataSource(li);
  };

  const onChangeHandler = v => {
    const value = toTitleCase(v);
    onChange(value);

    if (value && value.trim()) {
      locationService.current.getPlacePredictions(
        {
          input: value,
          types: ["(cities)"],
          componentRestrictions: { country: ["dk", "id", "us"] }
        },
        updateSuggestions
      );
    } else {
      setDataSource([]);
    }
  };

  const onValueSelected = e => {
    if (e.target) {
      onChange(e.target.value);
    }
  };

  var stylesBig = {
    textarea: {
      height: "70px",
      marginTop: "-10px"
    },

    input: {
      fontSize: "30px",
      color: "#32325d",
      fontFamily: "AvenirNext-Regular"
    },
    underlineStyle: {
      borderColor: "#25f4d2"
    },
    hint: {
      bottom: "23px",
      fontSize: "30px",
      color: "rgba(187,187,187,0.5)",
      fontFamily: "AvenirNext-Regular"
    },
    error: {
      fontFamily: "AvenirNext-Regular"
    }
  };
  var stylesNormal = {
    textarea: {
      height: "30px"
    },
    input: {
      fontSize: "14px",
      color: "#32325d",
      fontFamily: "AvenirNext-Regular",
      top: "-11px"
    },
    underlineStyle: {
      borderColor: "#25f4d2"
    },
    underlineDisabledStyle: {
      borderWidth: "1px 0px 0px",
      borderStyle: "solid",
      borderColor: "rgb(224, 224, 224)",
      borderImage: "initial",
      bottom: "11px",
      boxSizing: "content-box",
      margin: "0px",
      position: "absolute",
      width: "100%"
    },
    hint: {
      fontSize: "14px",
      color: "rgba(187,187,187,0.5)",
      fontFamily: "AvenirNext-Regular"
    },
    error: {
      fontFamily: "AvenirNext-Regular",
      fontSize: "14px"
    },
    floatingLabelStyle: {
      fontFamily: "AvenirNext-Medium",
      fontSize: "16px",
      fontWeight: "500",
      lineHeight: "22px",
      color: "#4A4A4A"
    }
  };
  var styles = big ? stylesBig : stylesNormal;

  return (
    <AutoComplete
      id={name}
      name={name}
      className="search-bar__auto-complete"
      style={styles.textarea}
      inputStyle={styles.input}
      hintStyle={styles.hint}
      underlineDisabledStyle={styles.underlineDisabledStyle}
      underlineFocusStyle={styles.underlineStyle}
      floatingLabelText={floatingLabelText}
      onClick={onValueSelected}
      onChange={onChangeHandler}
      fullWidth={true}
      searchText={value}
      hintText={placeholder || "City"}
      dataSource={dataSource}
      onUpdateInput={onChangeHandler}
      onNewRequest={onValueSelected}
      onBlur={onBlur}
      disabled={disabled}
      errorText={
        errors.length ? (
          <div
            style={{
              position: "relative",
              zIndex: "1"
            }}
          >
            <div className="errors">
              {errors.map((error, i) => (
                <p className="error" key={i}>
                  {error}
                </p>
              ))}
            </div>
          </div>
        ) : null
      }
    />
  );
};

export default connectToForm(LocationSelector);
