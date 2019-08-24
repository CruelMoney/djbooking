import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { HelmetProvider } from "react-helmet-async";
import ReactModal from "react-modal";
import ApolloProvider from "./ApolloProvider";
import DjCard from "./routes/Event/components/blocks/DJCard";
import profilePicture from "../src/assets/images/oliver.jpg";
import "./css/style.scss";
import styled from "styled-components";

const theme = getMuiTheme();

ReactModal.setAppElement("#root");

const dj = {
  artistName: "DJ Spinsø",
  email: "chrdengso@gmail.com",

  picture: {
    path: profilePicture
  },
  userMetadata: {
    phone: "+4524658061",
    firstName: "Christopher",
    lastName: "Last",
    bio:
      "Collect all receipts, and enter information into accounting software (send it to Xero involveret and process from there)  Also go through private bank to check nothing is missed. Set revolut to payment on all relevant sites. Create blog posts Community building"
  }
};
const organizer = {
  picture: {
    path: profilePicture
  },
  userMetadata: {
    firstName: "Christopher",
    lastName: "Tusch"
  }
};
const gig = {
  dj,
  status: "ACCEPTED",
  offer: {
    totalPayment: {
      formatted: "IDR 3.000.000"
    }
  }
};
const event = {
  organizer
};

const Wrapper = styled.div`
  margin: 15px;
`;

const Index = () => {
  return (
    <Wrapper>
      <DjCard idx={0} theEvent={event} gig={gig} translate={s => s} />
    </Wrapper>
  );
};

const rootElement = document.getElementById("root");
render(
  <ApolloProvider>
    <Router>
      <MuiThemeProvider muiTheme={theme}>
        <HelmetProvider>
          <Index />
        </HelmetProvider>
      </MuiThemeProvider>
    </Router>
  </ApolloProvider>,
  rootElement
);
