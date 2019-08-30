import React, { useState } from "react";
import { Input, useForm, InputRow } from "../../../components/FormComponents";
import DatePickerPopup from "../../../components/DatePicker";
import CountrySelector from "../../../components/CountrySelector";
import ImageUploader from "../../../components/ImageInput";
import { useQuery, useMutation } from "react-apollo";
import { VERIFY_STATUS, REQUEST_VERIFICATION } from "../gql";
import { LoadingPlaceholder2 } from "../../../components/common/LoadingPlaceholder";
import { Title, Body } from "../../../components/Text";
import { Row, TeritaryButton, SmartButton } from "../../../components/Blocks";
import ErrorMessageApollo from "../../../components/common/ErrorMessageApollo";

const statusText = {
  unverified:
    "Fill out the information to get verified. The provided information has to match the passport.",
  verified: "You are verified.",
  pending: "We are currently reviewing your documents."
};

const VerifyIdentity = ({ initialData, status, details, onCancel }) => {
  const [mutate, { loading: submitting, error }] = useMutation(
    REQUEST_VERIFICATION
  );

  const [form, setForm] = useState(initialData);

  const { registerValidation, unregisterValidation, runValidations } = useForm(
    form
  );

  const onChange = key => val => {
    setForm(form => ({ ...form, [key]: val }));
  };

  const saveFullName = value => {
    const [firstName, ...lastName] = value.split(" ");
    onChange("fullName")(value);
    onChange("firstName")(firstName);
    onChange("lastName")(lastName.join(" "));
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

  const { fullName, birthday, address, city, countryCode, postalCode } = form;

  const formDisabled = ["pending", "verified"].includes(status);
  return (
    <form onSubmit={save}>
      <Title>Verify Identity</Title>
      <Body style={{ marginBottom: "30px" }}>{statusText[status]}</Body>
      <Input
        label="Full name as in passport"
        defaultValue={fullName}
        placeholder="First Last"
        type="text"
        autoComplete="name"
        name="name"
        onSave={saveFullName}
        disabled={formDisabled}
        validation={v => {
          if (!v) {
            return "Required";
          }
          const [firstName, ...lastName] = v.split(" ");
          if (!firstName || !lastName.some(s => !!s.trim())) {
            return "Please enter both first and last name";
          }
        }}
        registerValidation={registerValidation("fullName")}
        unregisterValidation={unregisterValidation("fullName")}
      />
      <InputRow>
        <DatePickerPopup
          half
          maxDate={new Date()}
          minDate={false}
          disabled={formDisabled}
          label={"Birthday"}
          onSave={date => onChange("birthday")(date)}
          initialDate={birthday}
          validation={v => (!!v ? null : "Please select a birthday")}
          registerValidation={registerValidation("birthday")}
          unregisterValidation={unregisterValidation("birthday")}
        />
        {!formDisabled && (
          <ImageUploader
            half
            label="Passport (jpg or png)"
            buttonText={form.passport ? form.passport.name : "select"}
            disabled={formDisabled}
            onSave={onChange("passport")}
            validation={v => (!!v ? null : "Required")}
            registerValidation={registerValidation("passport")}
            unregisterValidation={unregisterValidation("passport")}
          />
        )}

        <Input
          half
          label="Address"
          placeholder="10 Downing Street"
          type="text"
          autoComplete="street-address"
          name="street-address"
          onSave={onChange("address")}
          defaultValue={address}
          disabled={formDisabled}
          validation={v => (!!v ? null : "Required")}
          registerValidation={registerValidation("address")}
          unregisterValidation={unregisterValidation("address")}
        />
        <Input
          half
          label="Postal code"
          placeholder="SW1A 2AA"
          type="text"
          autoComplete="postal-code"
          name="postal-code"
          onSave={onChange("postalCode")}
          disabled={formDisabled}
          defaultValue={postalCode}
          validation={v => (!!v ? null : "Required")}
          registerValidation={registerValidation("postalCode")}
          unregisterValidation={unregisterValidation("postalCode")}
        />

        <Input
          half
          disabled={formDisabled}
          defaultValue={city}
          ini
          label="City"
          placeholder="London"
          type="text"
          autoComplete="locality"
          name="locality"
          onSave={onChange("city")}
          validation={v => (!!v ? null : "Required")}
          registerValidation={registerValidation("city")}
          unregisterValidation={unregisterValidation("city")}
        />
        <CountrySelector
          half
          disabled={formDisabled}
          initialValue={countryCode}
          onSave={onChange("countryCode")}
          validation={v => (!!v ? null : "Required")}
          registerValidation={registerValidation("countryCode")}
          unregisterValidation={unregisterValidation("countryCode")}
        />
      </InputRow>
      {!formDisabled && (
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
      )}
      <ErrorMessageApollo error={details || error} />
    </form>
  );
};

const Wrapper = props => {
  const { data = {}, loading } = useQuery(VERIFY_STATUS);
  const { me = {} } = data;
  const { userMetadata, appMetadata = { identityStatus: {} } } = me;
  const { details, status } = appMetadata.identityStatus;

  if (loading) {
    return <LoadingPlaceholder2 />;
  }

  const initialData = {
    ...me,
    ...userMetadata,
    fullName: `${userMetadata.firstName} ${userMetadata.lastName}`
  };

  return (
    <VerifyIdentity
      {...props}
      initialData={initialData}
      status={status}
      details={details}
    />
  );
};

export default Wrapper;
