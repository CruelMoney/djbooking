import React, { useState } from "react";
import Sound from "./Sound";
import { playerStates } from "./useSoundPlayer";
import { Col, SecondaryButton } from "../../../../components/Blocks";
import Popup from "../../../../components/common/Popup";
import AddSound from "./AddSound";

const Sounds = ({ user }) => {
  const { isOwn } = user || {};
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div>
      <Sound
        id={1}
        title={"Live at Potatohead 28/07/2018"}
        genres={["chill", "sunset", "lounge"]}
        duration={391}
        src="https://cueup.s3.eu-central-1.amazonaws.com/user_uploads/sounds/Fion+-+Aint+No+Fun+(Edit).mp3"
        coverArt={"http://lorempixel.com/640/480/nightlife"}
        soundwave={[
          1,
          10,
          13,
          16,
          20,
          50,
          40,
          80,
          40,
          30,
          10,
          1,
          1,
          10,
          13,
          16,
          20,
          50,
          40,
          80,
          40,
          30,
          10,
          1,
          1,
          10,
          13,
          16,
          20,
          50,
          40,
          80,
          40,
          30,
          10,
          1,
          16,
          20,
          50,
          40,
          80,
          40,
          30,
          10,
          1,
          1,
          10,
          13,
          16,
          20,
          50,
          40,
          80,
          40,
          30,
          10,
          1,
          10,
          13,
          16,
          20,
          50,
          40,
          80,
          40,
          30,
          10,
          1,
          1,
          10,
          13,
          16,
          20,
          50,
          40,
          80,
          40,
          30,
          10,
          1,
          1,
          10,
          13,
          16,
          20,
          50,
          40,
          80,
          40,
          30,
          10,
          1,
          16,
          20,
          50,
          40,
          80,
          40,
          30,
          10,
          1,
          1,
          10,
          13,
          16,
          20,
          50,
          40,
          80,
          40,
          30,
          10,
          20,
          50,
          40,
          80,
          40,
          30,
          10,
          1,
          16,
          20,
          50,
          40,
          80,
          40,
          30,
          10,
          1,
          1,
          10,
          13,
          16,
          20,
          50,
          40,
          80,
          40,
          30,
          10
        ]}
        play={() => {}}
        pause={() => {}}
        jumpTo={() => {}}
        state={playerStates.STOPPED}
      />
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
