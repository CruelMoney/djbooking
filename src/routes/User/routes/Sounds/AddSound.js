import React, { useState } from "react";
import {
  Input,
  useForm,
  InputRow,
  InputLabel,
  Checkbox
} from "../../../../components/FormComponents";
import { useMutation } from "react-apollo";
import { Title, Body, BodySmall } from "../../../../components/Text";
import {
  Row,
  TeritaryButton,
  SmartButton,
  Col
} from "../../../../components/Blocks";
import ErrorMessageApollo from "../../../../components/common/ErrorMessageApollo";
import TagInput from "./TagInput";
import { VERIFY_EMAIL } from "../../../../components/gql";
import ImageUploader from "../../../../components/ImageInput";
import { ProgressBar } from "../../components/ProfileProgress";

const AddSound = ({ initialData, status, details, onCancel }) => {
  const [uploadProgress, setuploadProgress] = useState(null);
  const [mutate, { loading: submitting, error }] = useMutation(VERIFY_EMAIL);

  const startUpload = file => {
    setuploadProgress(0);
  };

  return (
    <>
      {uploadProgress === null ? (
        <FileChooser onChange={startUpload} />
      ) : (
        <DataForm disabled={submitting} initialData={{}} />
      )}

      {uploadProgress !== null && (
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
            {submitting ? "Submitting" : "Add track"}
          </SmartButton>
        </Row>
      )}

      <ErrorMessageApollo error={details || error} />
    </>
  );
};

const FileChooser = ({ onChange }) => (
  <Col middle>
    <Body>Upload in one of the following formats: </Body>
    <ImageUploader
      style={{
        background: "#31daff",
        color: "white",
        width: "250px",
        margin: "auto",
        marginTop: "24px"
      }}
      name="sound"
      accept="audio/*"
      onSave={onChange}
    >
      Choose file
    </ImageUploader>
    <Row style={{ margin: "6px 0 24px 0" }}>
      <span style={{ marginRight: "24px" }}>
        <Checkbox label={"Add to SoundCloud"} />
      </span>
      <Checkbox label={"Add to Mixcloud"} />
    </Row>
    <BodySmall style={{ textAlign: "center" }}>
      By uploading, you confirm that your sounds comply with our Terms of Use
      and you don't infringe anyone else's rights.
    </BodySmall>
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
      <Title style={{ marginBottom: "39px" }}>Add sound</Title>
      <BodySmall style={{ marginBottom: 0 }}>Uploading track...</BodySmall>
      <ProgressBar progress={0.5} />
      <InputRow>
        <Input
          half
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
        <ImageUploader
          half
          label="Cover art"
          buttonText={"upload"}
          disabled={formDisabled}
          onSave={onChange("image")}
        />
        <InputLabel>
          Tags
          <TagInput placeholder="Add tags to describe the genre, style and mood" />
        </InputLabel>
        <Input
          type="text-area"
          label="Description"
          disabled={formDisabled}
          onSave={onChange("description")}
        />
      </InputRow>
    </form>
  );
};

export default AddSound;
