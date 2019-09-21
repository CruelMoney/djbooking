import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import styled from "styled-components";
import Rating from "../../../components/common/Rating";
import moment from "moment";
import { HIGHLIGHT_REVIEW } from "../gql";
import QuotationMarkIcon from "../../../components/graphics/Quotes";
import {
  Col,
  Row,
  Avatar,
  ReadMoreText,
  TeritaryButton
} from "../../../components/Blocks";
import ReadMoreExpander from "../../../components/ReadMoreExpander";
import ReactDOM from "react-dom";
import { Popper } from "react-popper";
import { Title } from "../../../components/Text";

const Review = ({
  id,
  title,
  rating,
  content,
  isTestimonial,
  author,
  citation,
  createdAt,
  removeTestimonial,
  isOwn
}) => {
  const [virtualReferenceElement, setVirtualReferenceElement] = useState(null);
  const [selection, setSelection] = useState(null);

  const [addHighlight, { loading, data: hasAdded }] = useMutation(
    HIGHLIGHT_REVIEW,
    {
      update: () => {
        setTimeout(() => setVirtualReferenceElement(null), 3000);
      },
      variables: {
        id,
        selection
      }
    }
  );

  useEffect(() => {
    window.document.body.style.userSelect = "none";

    return () => {
      window.document.body.style.userSelect = "auto";
    };
  }, []);

  return (
    <ReviewWrapper>
      <Title>{title}</Title>
      {isOwn && isTestimonial && (
        <RemoveButton onClick={() => removeTestimonial({ variables: { id } })}>
          remove
        </RemoveButton>
      )}
      <Row middle style={{ marginTop: "36px" }}>
        <Col style={{ width: "100%" }}>
          {rating && (
            <Rating rating={rating} color="#50E3C2" emptyColor={"#50E3C299"} />
          )}
          {isTestimonial && (
            <Row middle style={{ marginBottom: "9px", marginTop: "2px" }}>
              <QuotationMarkIcon
                width={32}
                height={24}
                style={{ marginRight: "12px" }}
              ></QuotationMarkIcon>
              <ReadMoreText>TESTIMONIAL</ReadMoreText>
            </Row>
          )}
          <ReadMoreExpander
            onTextSelected={
              isOwn
                ? (rect, text) => {
                    setVirtualReferenceElement(rect);
                    setSelection(text);
                  }
                : null
            }
            content={content}
          />
          <Citation author={author} citation={citation} createdAt={createdAt} />
        </Col>
      </Row>
      {typeof document !== "undefined" && virtualReferenceElement
        ? ReactDOM.createPortal(
            <Popper
              referenceElement={virtualReferenceElement}
              eventsEnabled={false}
            >
              {({ ref, style, placement, arrowProps }) => (
                <div ref={ref} style={style} data-placement={placement}>
                  <HighlightTooltip>
                    <TeritaryButton
                      disabled={loading || hasAdded}
                      style={{ color: "#fff" }}
                      onClick={() => {
                        addHighlight();
                      }}
                    >
                      {loading
                        ? "Adding..."
                        : hasAdded
                        ? "Added"
                        : "Highlight on profile"}
                    </TeritaryButton>
                  </HighlightTooltip>
                </div>
              )}
            </Popper>,
            document.querySelector("#tooltip-portal")
          )
        : null}
    </ReviewWrapper>
  );
};

const RemoveButton = styled(TeritaryButton)`
  display: none;
  position: absolute;
  min-width: 0;
  height: 18px;
  top: 4px;
  right: -50px;
`;

const ReviewWrapper = styled.div`
  border-bottom: 1px solid #e9ecf0;
  margin-bottom: 60px;
  padding-bottom: 30px;
  margin-right: 24px;
  position: relative;
  ${RemoveButton} {
    right: 0;
  }
  :hover ${RemoveButton} {
    display: block;
  }
`;

const HighlightTooltip = styled.div`
  background: rgba(0, 0, 0, 0.84);
  border-radius: 4px;
`;

const AuthorName = styled.cite`
  font-family: "AvenirNext-DemiBold", Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: #4d6480;
`;
const CreatedAtLabel = styled.p`
  font-family: "AvenirNext-DemiBold", Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: #98a4b3;
`;
const Citation = ({ author, citation, createdAt }) => {
  const name = author ? author.userMetadata.firstName : citation;
  return (
    <Row right>
      {author && author.picure ? (
        <Avatar size="small" src={author.picture.path}></Avatar>
      ) : null}
      <Col>
        <AuthorName>{name}</AuthorName>
        <CreatedAtLabel>
          {moment(createdAt).format("MMMM, YYYY")}
        </CreatedAtLabel>
      </Col>
    </Row>
  );
};

export default Review;
