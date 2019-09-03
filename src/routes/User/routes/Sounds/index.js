import React, { useState } from "react";
import Sound from "./Sound";
import { Col, SecondaryButton } from "../../../../components/Blocks";
import Popup from "../../../../components/common/Popup";
import AddSound from "./AddSound";
import { useQuery } from "react-apollo";
import { USER_SOUNDS } from "./gql";
import { LoadingPlaceholder2 } from "../../../../components/common/LoadingPlaceholder";
import { Helmet } from "react-helmet-async";

const Sounds = ({ user, location, match }) => {
  const { id: soundId } = match.params;
  const { isOwn } = user || {};
  const [showPopup, setShowPopup] = useState(false);

  const { data, loading } = useQuery(USER_SOUNDS, {
    skip: !user,
    variables: {
      userId: user && user.id
    }
  });
  if (loading && !user) {
    return (
      <Col>
        <LoadingPlaceholder2 />
      </Col>
    );
  }

  const { userSounds } = data || {};
  const { edges = [] } = userSounds || {};

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

      {isOwn && (
        <Popup
          showing={showPopup}
          onClickOutside={() => setShowPopup(false)}
          width={"750px"}
        >
          <AddSound onCancel={() => setShowPopup(false)} />
        </Popup>
      )}
    </div>
  );
};

export default Sounds;
