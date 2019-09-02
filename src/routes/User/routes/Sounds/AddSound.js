import React, { useState, useRef } from "react";
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
import ImageUploader from "../../../../components/ImageInput";
import { ProgressBar } from "../../components/ProfileProgress";
import { UPLOAD_FILE } from "../../gql";
import { ADD_SOUND, UPDATE_SOUND } from "./gql";

const AddSound = ({ details, onCancel, sound, initialData }) => {
  const [uploadProgress, setuploadProgress] = useState(sound ? 1 : null);
  const abortUpload = useRef();
  const [form, setForm] = useState(initialData);

  const { registerValidation, unregisterValidation, runValidations } = useForm(
    form
  );

  const [upload, { loading: uploading, error: uploadError }] = useMutation(
    UPLOAD_FILE,
    {
      context: {
        fetchOptions: {
          useUpload: true,
          onProgress: e => {
            setuploadProgress(e.loaded / e.total);
          },
          onAbortPossible: abortHandler => {
            abortUpload.current = abortHandler;
          }
        }
      }
    }
  );

  const [mutate, { loading: submitting, error }] = useMutation(
    sound ? UPDATE_SOUND : ADD_SOUND
  );

  const startUpload = async file => {
    setuploadProgress(0);
    const {
      data: { singleUpload }
    } = await upload({ variables: { file } });
    setForm(f => ({
      ...f,
      file: singleUpload.id
    }));
  };

  const updateFile = () => {
    const refs = runValidations();
    if (refs.length === 0) {
      mutate({
        variables: form
      });
    }
  };

  return (
    <>
      {uploadProgress === null ? (
        <FileChooser onChange={startUpload} />
      ) : (
        <DataForm
          form={form}
          setForm={setForm}
          disabled={submitting}
          registerValidation={registerValidation}
          unregisterValidation={unregisterValidation}
          uploadingStatus={
            uploadError ? (
              <ErrorMessageApollo
                style={{ marginBottom: 0 }}
                error={uploadError}
              />
            ) : (
              <BodySmall style={{ marginBottom: 0 }}>
                {uploading && uploadProgress === 1
                  ? "Processing track..."
                  : uploading
                  ? "Uploading track..."
                  : "Track uploaded"}
              </BodySmall>
            )
          }
          uploadProgress={
            uploading ? Math.min(uploadProgress, 0.95) : uploadError ? 0 : 1
          }
          uploadError={uploadError}
        />
      )}

      {uploadProgress !== null && (
        <Row right>
          <TeritaryButton type="button" onClick={onCancel}>
            Cancel
          </TeritaryButton>
          <SmartButton
            success={true}
            level="primary"
            disabled={uploading || uploadError}
            loading={submitting}
            onClick={updateFile}
            type="submit"
          >
            {uploading ? "Uploading..." : sound ? "Update track" : "Add track"}
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

const DataForm = ({
  formDisabled,
  uploadProgress,
  uploadingStatus,
  setForm,
  unregisterValidation,
  registerValidation,
  form
}) => {
  const onChange = key => val => {
    console.log({ val, key });
    setForm(form => ({ ...form, [key]: val }));
  };
  const { title, tags, description } = form || {};

  return (
    <form>
      <Title style={{ marginBottom: "39px" }}>Add sound</Title>
      {uploadingStatus}
      <ProgressBar progress={uploadProgress} />
      <InputRow>
        <Input
          half
          label="Title"
          defaultValue={title}
          placeholder="Name your track"
          type="text"
          name="title"
          onSave={onChange("title")}
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
          <TagInput
            defaultValue={tags}
            onChange={onChange("tags")}
            placeholder="Add tags to describe the genre, style and mood"
          />
        </InputLabel>
        <Input
          defaultValue={description}
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
