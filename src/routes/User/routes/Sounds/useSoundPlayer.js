import { useEffect, useState } from "react";
import useLogActivity, {
  ACTIVITY_TYPES
} from "../../../../components/hooks/useLogActivity";
import { Howl } from "howler";

export const playerStates = Object.freeze({
  PLAYING: "PLAYING",
  PAUSED: "PAUSED",
  STOPPED: "STOPPED"
});

//{id: howl}[]
let tracks = [];
let onDeck = null;
let globalUpdate = () => {};

const useSoundPlayer = ({ track, src, duration }) => {
  const soundId = track.id;
  const sound = useHowlWrapper(src, soundId, track);

  // recreate state
  let initPos = 0;
  let initState = playerStates.STOPPED;
  try {
    initState = sound.playing() ? playerStates.PLAYING : initState;
    initPos = sound.progress();
  } catch (error) {
    //ignore
    console.log(error);
  }

  const [state, setState] = useState(initState);
  const [progress, setProgress] = useState(initPos);
  const [error, setError] = useState();

  useEffect(() => {
    console.log("init");

    let intervalRef = null;

    const step = () => {
      setProgress(sound.progress());
    };

    const startInterval = () => {
      clearInterval(intervalRef);
      intervalRef = setInterval(step, 250);
    };

    if (sound.playing()) {
      startInterval();
    }

    const onPlay = () => {
      setState(playerStates.PLAYING);
      setError(null);
      startInterval();
    };
    const onPause = () => {
      setState(playerStates.PAUSED);
      clearInterval(intervalRef);
    };
    const onStop = () => {
      setState(playerStates.STOPPED);
      clearInterval(intervalRef);
    };
    const onEnd = () => {
      clearInterval(intervalRef);
      setState(playerStates.STOPPED);
      setProgress(duration);
    };
    const onLoad = () => {
      setError(null);
    };

    const onLoadError = (id, error) => {
      if (error && !error.includes("codec")) {
        setState(playerStates.STOPPED);
        setError(error);
      }
    };

    sound.subscribeOnplay(onPlay);
    sound.subscribeOnpause(onPause);
    sound.subscribeOnstop(onStop);
    sound.subscribeOnend(onEnd);
    sound.subscribeOnload(onLoad);
    sound.subscribeOnloaderror(onLoadError);

    return () => {
      sound.unsubscribeOnplay(onPlay);
      sound.unsubscribeOnpause(onPause);
      sound.unsubscribeOnstop(onStop);
      sound.unsubscribeOnend(onEnd);
      sound.unsubscribeOnload(onLoad);
      sound.unsubscribeOnloaderror(onLoadError);
      clearInterval(intervalRef);
    };
  }, [duration, sound]);

  const jumpTo = s => {
    setProgress(s);
    sound.progress(s);
  };

  console.log({ progress, duration });

  return {
    play: sound.play,
    pause: sound.pause,
    jumpTo,
    state,
    error,
    progress,
    loading: sound.current && sound.current.howl.state() === "loading"
  };
};

const useHowlWrapper = (src, soundId, data) => {
  const existingTrack = tracks.find(({ id }) => id === soundId);

  const { log: logPlay } = useLogActivity({
    type: ACTIVITY_TYPES.SOUND_PLAY,
    subjectId: soundId,
    manual: true
  });

  if (existingTrack) {
    return existingTrack;
  }

  console.log("creating new howl");
  const stopOtherTracks = () =>
    tracks.forEach(track => track.id !== soundId && track.pause());

  let onplay = [stopOtherTracks, logPlay];
  let subscribeOnplay = f => onplay.push(f);
  let unsubscribeOnplay = f => (onplay = onplay.filter(fun => fun !== f));
  let onpause = [];
  let subscribeOnpause = f => onpause.push(f);
  let unsubscribeOnpause = f => (onpause = onpause.filter(fun => fun !== f));
  let onstop = [];
  let subscribeOnstop = f => onstop.push(f);
  let unsubscribeOnstop = f => (onstop = onstop.filter(fun => fun !== f));
  let onend = [next];
  let subscribeOnend = f => onend.push(f);
  let unsubscribeOnend = f => (onend = onend.filter(fun => fun !== f));
  let onload = [];
  let subscribeOnload = f => onload.push(f);
  let unsubscribeOnload = f => (onload = onload.filter(fun => fun !== f));
  let onfade = [];
  let subscribeOnfade = f => onfade.push(f);
  let unsubscribeOnfade = f => (onfade = onfade.filter(fun => fun !== f));
  let onloaderror = [];
  let subscribeOnloaderror = f => onloaderror.push(f);
  let unsubscribeOnloaderror = f =>
    (onloaderror = onloaderror.filter(fun => fun !== f));

  const howl = new Howl({
    src: [src],
    html5: true,
    onplay: () => onplay.forEach(f => f()),
    onpause: () => onpause.forEach(f => f()),
    onstop: () => onstop.forEach(f => f()),
    onend: () => onend.forEach(f => f()),
    onload: () => onload.forEach(f => f()),
    onfade: () => onfade.forEach(f => f()),
    onloaderror: () => onloaderror.forEach(f => f())
  });

  const progress = s => {
    try {
      const p = howl.seek(s);
      if (!isNaN(p)) {
        return p;
      }
      return 0;
    } catch (error) {
      return 0;
    }
  };

  const isPlaying = () => {
    try {
      return howl.playing();
    } catch (error) {
      return false;
    }
  };

  const pause = () => {
    howl.pause();
  };

  const play = () => {
    if (!howl.playing()) {
      howl.play();
      onDeck = track;
      globalUpdate(data);
    }
  };

  const track = {
    id: soundId,
    howl,
    pause,
    play,
    progress: progress,
    playing: isPlaying,
    subscribeOnplay,
    unsubscribeOnplay,
    subscribeOnpause,
    unsubscribeOnpause,
    subscribeOnstop,
    unsubscribeOnstop,
    subscribeOnend,
    unsubscribeOnend,
    subscribeOnload,
    unsubscribeOnload,
    subscribeOnfade,
    unsubscribeOnfade,
    subscribeOnloaderror,
    unsubscribeOnloaderror
  };

  tracks.push(track);
  return track;
};

const getCurrentIdx = () => {
  return tracks.findIndex(t => t === onDeck);
};

const skip = (d = "next") => () => {
  const direction = {
    next: 1,
    previous: -1
  };

  // fade out current
  if (onDeck) {
    onDeck.pause();
  }

  const idx = getCurrentIdx();

  // find next and fade
  const nextTrack = tracks[idx + direction[d]];

  if (nextTrack) {
    nextTrack.play();
  } else {
    onDeck = null;
  }
};
const next = skip("next");
const previous = skip("previous");

const useCurrentDeck = () => {
  const [track, setTrack] = useState();

  // register update function
  useEffect(() => {
    globalUpdate = t => {
      t && setTrack(t);
    };
    return () => {
      globalUpdate = () => {};
    };
  }, []);

  return {
    track,
    next,
    previous
  };
};

export default useSoundPlayer;

export { useCurrentDeck };
