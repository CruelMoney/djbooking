import React, { useState, useRef } from "react";
import { Title, BodySmall, SmallBold } from "../../../../components/Text";
import styled, { keyframes, css } from "styled-components";
import {
  Row,
  Pill,
  SecondaryButton,
  SmartButton
} from "../../../../components/Blocks";
import PlayIcon from "../../../../assets/icons/PlayIcon";
import PauseIcon from "../../../../assets/icons/PauseIcon";
import useSoundPlayer, { playerStates } from "./useSoundPlayer";
import { SimpleSharing } from "../../../../components/common/Sharing-v2";
import { useMeasure } from "@softbind/hook-use-measure";
import ErrorMessageApollo from "../../../../components/common/ErrorMessageApollo";
import useSamples from "./useSamples";
import { useMutation } from "react-apollo";
import { DELETE_SOUND, USER_SOUNDS } from "./gql";
import Popup from "../../../../components/common/Popup";
import AddSound from "./AddSound";

const Sound = ({
  title,
  tags,
  duration,
  player,
  samples,
  isOwn,
  loadingRemove,
  deleteSound,
  onEdit,
  small,
  link
}) => {
  const ref = useRef(null);
  const { bounds } = useMeasure(ref, "bounds");
  const [scanningPosition, setScanningPosition] = useState(null);

  const onScanning = event => {
    if (bounds) {
      let { clientX, touches } = event;
      if (touches) {
        clientX = touches[0].clientX;
      }
      const x = clientX - bounds.left;
      const scan = (x / bounds.width).toFixed(4);
      setScanningPosition(scan);
    }
  };

  const resolution = bounds ? bounds.width / 6 : small ? 75 : 140;

  const bars = useSamples({ resolution, samples });
  const position = player.progress / duration.totalSeconds;
  const positionIdx = bars.length * position;
  const scanningIdx = bars.length * scanningPosition;
  let activeIdx = positionIdx;
  let halfActiveIdx = scanningIdx;

  if (scanningPosition && scanningIdx < positionIdx) {
    activeIdx = scanningIdx;
    halfActiveIdx = positionIdx;
  }

  const scanInSeconds = scanningPosition * duration.totalSeconds;

  const durationFormatted = formatTime(duration.totalSeconds);
  const progressFormatted = player.loading
    ? "Loading..."
    : formatTime(scanningPosition ? scanInSeconds : player.progress);

  const jumpOrStart = () => {
    if (player.state === playerStates.STOPPED) {
      player.play(scanInSeconds);
    } else {
      player.jumpTo(scanInSeconds);
    }
  };

  return (
    <Container ref={ref} small={small}>
      <Title style={{ marginBottom: "39px" }}>
        {small ? "Selected sound" : title}
      </Title>
      <Row between>
        <PlayPauseButton
          state={player.state}
          onClick={() =>
            player.state === playerStates.PLAYING
              ? player.pause()
              : player.play()
          }
        />
        {small && (
          <SmallBold demi style={{ marginLeft: "12px", marginTop: "4px" }}>
            {title}
          </SmallBold>
        )}
        {player.error && (
          <ErrorMessageApollo
            style={{ marginLeft: "15px" }}
            error={player.error}
          />
        )}
        <div style={{ flex: 1 }}></div>
        <Genres>
          {tags.map(g => (
            <Pill key={g}>{g}</Pill>
          ))}
        </Genres>
      </Row>
      <SoundBarsRow
        onMouseMove={onScanning}
        loading={player.loading || undefined}
        onMouseLeave={() => setScanningPosition(null)}
        onTouchMove={onScanning}
        onTouchCancel={() => setScanningPosition(null)}
        onTouchEnd={jumpOrStart}
        onClick={jumpOrStart}
        small={small}
      >
        {bars.map((p, idx) => (
          <SoundBar
            hovering={scanningPosition}
            key={idx}
            idx={idx}
            pressure={p}
            active={idx < activeIdx}
            halfActive={idx < halfActiveIdx}
          />
        ))}
      </SoundBarsRow>
      {!small && (
        <Row between>
          <BodySmall>{progressFormatted}</BodySmall>
          <BodySmall>{durationFormatted}</BodySmall>
        </Row>
      )}
      {!small && (
        <Row right style={{ marginTop: "15px" }}>
          {isOwn && <SecondaryButton onClick={onEdit}>Edit</SecondaryButton>}
          {isOwn && (
            <SmartButton
              loading={loadingRemove}
              onClick={deleteSound}
              level="tertiary"
            >
              Remove
            </SmartButton>
          )}
          {<div style={{ flex: 1 }}></div>}
          <SimpleSharing shareUrl={link} label={null} />
        </Row>
      )}
    </Container>
  );
};

const Container = styled.article`
  margin-bottom: ${({ small }) => (small ? "15px" : "60px")};
  padding-bottom: ${({ small }) => (small ? " " : "24px")};
  border-bottom: ${({ small }) => (small ? " " : "1px solid #e9ecf0")};
`;

const Genres = styled(Row)`
  justify-self: flex-end;
  > * {
    margin-left: 5px;
  }
`;

const loadingPulse = keyframes`
  from{
    opacity: 1;
  }
  to{
    opacity: 0.3;
  }
`;

const pulseLoad = ({ loading }) =>
  loading
    ? css`
        animation: ${loadingPulse} 1000ms cubic-bezier(0.445, 0.05, 0.55, 0.95)
          infinite alternate;
      `
    : null;

const SoundBarStyle = styled.span.attrs(
  ({ pressure, active, halfActive, hovering }) => ({
    style: {
      height: `${pressure}%`,
      background: active ? "#50e3c2" : halfActive ? "#50e3c299" : "#E9ECF0",
      transition: hovering ? "none" : "all 1000ms ease"
    }
  })
)`
  flex: 1;
  margin: 1px;
  border-radius: 10px;
  min-height: 4px;
  pointer-events: none;
`;

const SoundBar = props => {
  return <SoundBarStyle {...props} />;
};

const SoundBarsRow = styled(Row)`
  height: ${({ small }) => (small ? "50px" : "100px")};
  align-items: center;
  cursor: pointer;
  ${pulseLoad}
`;

const StyledStateButton = styled.button`
  display: flex;
  height: 36px;
  width: 36px;
  min-width: 36px;
  justify-content: center;
  align-items: center;
  border: 1px solid #50e3c2 !important;
  border-radius: 18px;
  svg {
    fill: #50e3c2;
    stroke: #50e3c2;
  }
  :hover {
    background: #50e3c2;
    svg {
      fill: #fff;
      stroke: #fff;
    }
  }
`;
const PlayPauseButton = ({ state, ...props }) => {
  return (
    <StyledStateButton {...props}>
      {state !== playerStates.PLAYING ? <PlayIcon /> : <PauseIcon />}
    </StyledStateButton>
  );
};

const formatTime = seconds =>
  new Date(null, null, null, null, null, seconds)
    .toTimeString()
    .split(" ")[0]
    .replace("00:", "")
    .replace(":", ".");

const Wrapper = props => {
  const { id, file, duration, userId, isOwn, title, description, tags } = props;
  const player = useSoundPlayer({
    src: file.path,
    duration: duration.totalSeconds
  });
  const [showPopup, setShowPopup] = useState(false);

  const [deleteSound, { loading: loadingRemove }] = useMutation(DELETE_SOUND, {
    variables: { id },
    refetchQueries: [{ query: USER_SOUNDS, variables: { userId } }],
    awaitRefetchQueries: true
  });

  return (
    <>
      <Sound
        {...props}
        deleteSound={deleteSound}
        loadingRemove={loadingRemove}
        player={player}
        onEdit={() => setShowPopup(true)}
      />
      {isOwn && (
        <Popup
          showing={showPopup}
          onClickOutside={() => setShowPopup(false)}
          width={"520px"}
        >
          <AddSound
            sound={props}
            initialData={{
              id,
              title,
              description,
              tags
            }}
            onCancel={() => setShowPopup(false)}
          />
        </Popup>
      )}
    </>
  );
};

export default Wrapper;