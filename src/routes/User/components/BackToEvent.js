import React, { useEffect } from "react";
import { Container, Row, ReadMore } from "../../../components/Blocks";
import { Link } from "react-router-dom";

const BackToEvent = ({ eventId, hash }) => {
  useEffect(() => {
    document.body.classList.add("pre-header-content");
    return () => {
      document.body.classList.remove("pre-header-content");
    };
  }, []);

  return (
    <div style={{ backgroundColor: "#f6f9fc" }}>
      <Container>
        <Row middle style={{ height: "42px" }}>
          <Link to={`/event/${eventId}/${hash}/overview`}>
            <ReadMore back>Back to event</ReadMore>
          </Link>
        </Row>
      </Container>
    </div>
  );
};

export default BackToEvent;
