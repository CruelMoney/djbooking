import React, { useState, useRef } from "react";
import { Title, BodySmall } from "../../../../components/Text";
import styled from "styled-components";
import { Row, Pill } from "../../../../components/Blocks";
import PlayIcon from "../../../../assets/icons/PlayIcon";
import PauseIcon from "../../../../assets/icons/PauseIcon";
import { playerStates } from ".";
import { SimpleSharing } from "../../../../components/common/Sharing-v2";
import { useMeasure } from "@softbind/hook-use-measure";

const Sound = ({
  id,
  title,
  genres,
  duration,
  currentTime,
  coverArt,
  soundwave,

  state,
  play,
  pause,
  jumpTo
}) => {
  const ref = useRef(null);
  const { bounds } = useMeasure(ref, "bounds");

  const [scanningPosition, setScanningPosition] = useState(null);
  // let resolution = bounds ? bounds.width / MAX_WIDTH : 1;
  // resolution = (1 / resolution).toFixed(1);

  // const soundwave = originalSoundwave.reduce(
  //   (acc, c, idx) => (idx % resolution === 0 ? [...acc, c] : acc),
  //   []
  // );

  const onScanning = event => {
    const { clientX } = event;
    const x = clientX - bounds.left;
    const progress = (x / bounds.width).toFixed(4);
    setScanningPosition(progress);
  };

  const position = currentTime / duration;
  const positionIdx = soundwave.length * position;
  const scanningIdx = soundwave.length * scanningPosition;
  let activeIdx = positionIdx;
  let halfActiveIdx = scanningIdx;

  if (scanningPosition && scanningIdx < positionIdx) {
    activeIdx = scanningIdx;
    halfActiveIdx = positionIdx;
  }

  const durationFormatted = formatTime(duration);
  const progressFormatted = formatTime(
    scanningPosition ? scanningPosition * duration : currentTime
  );

  return (
    <Container ref={ref}>
      <Title style={{ marginBottom: "39px" }}>{title}</Title>
      <Row between>
        <PlayPauseButton state={state} />
        <Genres>
          {genres.map(g => (
            <Pill key={g}>{g}</Pill>
          ))}
        </Genres>
      </Row>
      <SoundBarsRow
        onMouseMove={onScanning}
        onMouseLeave={() => setScanningPosition(null)}
      >
        {soundwave.map((p, idx) => (
          <SoundBar
            key={idx}
            pressure={p}
            active={idx < activeIdx}
            halfActive={idx < halfActiveIdx}
          />
        ))}
      </SoundBarsRow>
      <Row between>
        <BodySmall>{progressFormatted}</BodySmall>
        <BodySmall>{durationFormatted}</BodySmall>
      </Row>
      <Row right style={{ marginTop: "15px" }}>
        <SimpleSharing url="" label={null} />
      </Row>
    </Container>
  );
};

const Container = styled.article`
  margin-bottom: 60px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecf0;
`;

const Genres = styled(Row)`
  justify-self: flex-end;
  > * {
    margin-left: 5px;
  }
`;

const SoundBarStyle = styled.span`
  height: ${({ pressure }) => `${pressure}%`};
  flex: 1;
  margin: 2px;
  background: ${({ active, halfActive }) =>
    active ? "#50e3c2" : halfActive ? "#50e3c299" : "#E9ECF0"};
  border-radius: 10px;
  min-width: 4px;
  min-height: 4px;
  pointer-events: none;
`;
const SoundBar = props => {
  return <SoundBarStyle {...props} />;
};

const SoundBarsRow = styled(Row)`
  height: 100px;
  align-items: center;
`;

const StyledStateButton = styled.button`
  display: flex;
  height: 36px;
  width: 36px;
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

export default Sound;
