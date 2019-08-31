import React, { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import "./TagInput.scss";

const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const TagInput = ({ placeholder, ...props }) => {
  const [tags, setTags] = useState([]);

  const handleDelete = idx => {
    setTags(tags => tags.filter((_tag, i) => idx !== i));
  };

  const handleAddition = tag => {
    setTags(tags => [...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTags(newTags);
  };

  return (
    <ReactTags
      tags={tags}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      handleDrag={handleDrag}
      delimiters={delimiters}
      autofocus={false}
      placeholder={tags.length > 0 ? "" : placeholder}
      {...props}
    />
  );
};

export default TagInput;
