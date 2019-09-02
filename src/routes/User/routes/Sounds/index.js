import React, { useState } from "react";
import Sound from "./Sound";
import { playerStates } from "./useSoundPlayer";
import { Col, SecondaryButton } from "../../../../components/Blocks";
import Popup from "../../../../components/common/Popup";
import AddSound from "./AddSound";
import { useQuery } from "react-apollo";
import { USER_SOUNDS } from "./gql";
import { LoadingPlaceholder2 } from "../../../../components/common/LoadingPlaceholder";

const Sounds = ({ user }) => {
  const { isOwn } = user || {};
  const [showPopup, setShowPopup] = useState(false);

  const { data, loading } = useQuery(USER_SOUNDS, {
    skip: !user,
    variables: {
      userId: user && user.id
    }
  });

  if (loading && !user) {
    return <LoadingPlaceholder2 />;
  }

  const { userSounds } = data || {};
  const { edges = [] } = userSounds || {};
  console.info({ edges });
  return (
    <div>
      {edges.map(sound => (
        <Sound key={sound.id} isOwn={user.isOwn} userId={user.id} {...sound} />
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
          width={"520px"}
        >
          <AddSound onCancel={() => setShowPopup(false)} />
        </Popup>
      )}
    </div>
  );
};

export default Sounds;
