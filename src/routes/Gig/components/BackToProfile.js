import React, { useEffect } from "react";
import { Container, Row, ReadMore } from "../../../components/Blocks";
import { Link } from "react-router-dom";

const BackToProfile = ({ permalink }) => {
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
          <Link to={`/user/${permalink}/gigs`}>
            <ReadMore back>Back to gigs</ReadMore>
          </Link>
        </Row>
      </Container>
    </div>
  );
};

export default BackToProfile;
