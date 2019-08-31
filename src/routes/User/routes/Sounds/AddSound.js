import React, { useState } from "react";
import {
  Input,
  useForm,
  InputRow,
  Label,
  InputLabel
} from "../../../../components/FormComponents";
import { useMutation } from "react-apollo";
import { Title, Body } from "../../../../components/Text";
import {
  Row,
  TeritaryButton,
  SmartButton,
  Col,
  PrimaryButton
} from "../../../../components/Blocks";
import ErrorMessageApollo from "../../../../components/common/ErrorMessageApollo";
import TagInput from "./TagInput";
import { VERIFY_EMAIL } from "../../../../components/gql";

const AddSound = ({ initialData, status, details, onCancel }) => {
  const [mutate, { loading: submitting, error }] = useMutation(VERIFY_EMAIL);

  return (
    <>
      <Title>Add sound</Title>

      <DataForm disabled={submitting} initialData={{}} />
      <Row right>
        <TeritaryButton type="button" onClick={onCancel}>
          Cancel
        </TeritaryButton>
        <SmartButton
          success={true}
          level="primary"
          loading={submitting}
          type="submit"
        >
          {submitting ? "Submitting" : "Submit"}
        </SmartButton>
      </Row>

      <ErrorMessageApollo error={details || error} />
    </>
  );
};

const FileChooser = () => (
  <Col>
    <Body>Please provide one of the following formats</Body>
    <PrimaryButton>Choose files</PrimaryButton>
  </Col>
);

const DataForm = ({ formDisabled, initialData, mutate }) => {
  const [form, setForm] = useState(initialData);

  const { registerValidation, unregisterValidation, runValidations } = useForm(
    form
  );

  const onChange = key => val => {
    setForm(form => ({ ...form, [key]: val }));
  };

  const save = e => {
    e.preventDefault();
    const refs = runValidations();
    if (refs[0] && refs[0].current) {
      return;
    }
    mutate({
      variables: {
        ...form
      }
    });
  };

  const { title } = form;

  return (
    <form onSubmit={save}>
      <InputRow>
        <Input
          label="Title"
          placeholder="Name your track"
          type="text"
          name="title"
          onSave={onChange("title")}
          defaultValue={title}
          disabled={formDisabled}
          validation={v => (!!v ? null : "Required")}
          registerValidation={registerValidation("title")}
          unregisterValidation={unregisterValidation("title")}
        />
        <InputLabel>
          Genres
          <TagInput placeholder="Add genre" />
        </InputLabel>
      </InputRow>
    </form>
  );
};

export default AddSound;
