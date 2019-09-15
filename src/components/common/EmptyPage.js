import React, { Component } from "react";
import { localize } from "react-localize-redux";
import Svg404 from "../graphics/404";
import styled from "styled-components";

class EmptyPage extends Component {
  render() {
    const { translate } = this.props;
    return (
      <Wrapper>
        <Svg404 />
        <div>
          <h2>
            {this.props.title
              ? this.props.title
              : translate("empty-page-message")}
          </h2>

          <div>{this.props.message}</div>
        </div>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  min-height: 400px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: left;
  flex-wrap: wrap;
  h2 {
    max-width: 220px;
  }
  svg {
    max-width: 300px;
    margin-right: 30px;
    margin-left: 30px;
  }
`;

export default localize(EmptyPage, "locale");
