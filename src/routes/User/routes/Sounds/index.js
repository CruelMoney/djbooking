import React, { useState } from "react";
import Sound from "./Sound";
import {
  Col,
  SecondaryButton,
  PrimaryButton
} from "../../../../components/Blocks";
import Popup from "../../../../components/common/Popup";
import AddSound from "./AddSound";
import { useQuery } from "react-apollo";
import { USER_SOUNDS } from "./gql";
import { LoadingPlaceholder2 } from "../../../../components/common/LoadingPlaceholder";
import { Helmet } from "react-helmet-async";
import EmptyPage from "../../../../components/common/EmptyPage";
import { Body } from "../../../../components/Text";

const Sounds = ({ user, location, match, setShowPopup }) => {
  const { id: soundId } = match.params;
  const { isOwn } = user || {};

  const { data, loading } = useQuery(USER_SOUNDS, {
    skip: !user,
    variables: {
      userId: user && user.id
    }
  });

  const { userSounds } = data || {};
  const { edges = [] } = userSounds || {};

  if ((loading && !user) || !userSounds) {
    return (
      <Col>
        <LoadingPlaceholder2 />
      </Col>
    );
  }

  if (edges.length === 0) {
    return (
      <EmptyPage
        title="No Sounds"
        message={
          isOwn ? (
            <>
              <Body>Showcase your mixes or productions</Body>
              <PrimaryButton
                style={{ marginTop: "24px" }}
                onClick={() => setShowPopup(true)}
              >
                Upload track
              </PrimaryButton>
            </>
          ) : (
            ""
          )
        }
      />
    );
  }

  const selectedSound = edges.find(s => s.id === soundId);

  return (
    <div>
      {selectedSound && (
        <Helmet>
          <title>{selectedSound.title}</title>
          <meta property="og:title" content={selectedSound.title} />
          <meta name="twitter:title" content={selectedSound.title} />

          {selectedSound.image && (
            <meta property="og:image" content={selectedSound.image.path} />
          )}
          {selectedSound.image && (
            <meta property="twitter:image" content={selectedSound.image.path} />
          )}

          <meta name="description" content={selectedSound.description} />
          <meta
            name="twitter:description"
            content={selectedSound.description}
          />
          <meta property="og:description" content={selectedSound.description} />
        </Helmet>
      )}

      {edges.map(sound => (
        <Sound
          key={sound.id}
          link={location.pathname + "/" + sound.id}
          isOwn={user.isOwn}
          userId={user.id}
          {...sound}
        />
      ))}
      {isOwn && (
        <Col style={{ marginTop: "30px", width: "250px" }}>
          <SecondaryButton onClick={() => setShowPopup(true)}>
            + Add sound
          </SecondaryButton>
        </Col>
      )}
    </div>
  );
};

const Wrapper = props => {
  const { user } = props;
  const [showPopup, setShowPopup] = useState(false);
  const { isOwn } = user || {};

  return (
    <>
      <Sounds {...props} setShowPopup={setShowPopup} />
      {isOwn && (
        <Popup
          showing={showPopup}
          onClickOutside={() => setShowPopup(false)}
          width={"750px"}
        >
          <AddSound
            userId={user.id}
            closeModal={() => setShowPopup(false)}
            onCancel={() => setShowPopup(false)}
          />
        </Popup>
      )}
    </>
  );
};

export default Wrapper;
