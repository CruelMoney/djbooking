import { useEffect, useRef, useState, useCallback } from "react";
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
  const sound = useRef();
  const [state, setState] = useState(playerStates.STOPPED);
  const [initialized, setInitialized] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState();
  const { log: logPlay } = useLogActivity({
    type: ACTIVITY_TYPES.SOUND_PLAY,
    subjectId: soundId,
    manual: true
  });

  const mounted = useRef(true);
  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  const stop = () => {
    if (sound.current) {
      sound.current.howl.stop();
    }
  };

  const pause = useCallback(() => {
    if (sound.current && state === playerStates.PLAYING) {
      if (mounted.current) {
        setState(playerStates.PAUSED);
      }
      globalUpdate(null, playerStates.PAUSED);
      sound.current.howl.fade(1, 0, 100);
    }
  }, [state]);

  const jumpTo = useCallback(seconds => {
    if (sound.current) {
      if (mounted.current) {
        setProgress(seconds);
      }
      sound.current.howl.seek(seconds);
    }
  }, []);

  const step = () => {
    if (sound.current) {
      try {
        const seconds = Number.parseFloat(sound.current.howl.seek());
        if (!Number.isNaN(seconds)) {
          mounted.current && setProgress(seconds);
          globalUpdate(seconds);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const play = useCallback(
    async (startfrom = 0) => {
      if (sound.current) {
        if (mounted.current) {
          setState(playerStates.PLAYING);
          globalUpdate(startfrom, playerStates.PLAYING);
          startfrom && setProgress(startfrom);
        }
        // pause other tracks
        tracks.forEach(
          track => track.id !== soundId && track.pause && track.pause()
        );

        if (state === playerStates.STOPPED) {
          logPlay();
        }
        sound.current.howl.volume(0);
        sound.current.howl.play();

        if (startfrom) {
          sound.current.howl.volume(1); // this needs, otherwise it gonna be silent
          setTimeout(() => sound.current.howl.seek(startfrom), 1000);
        }
      }
    },
    [logPlay, soundId, state]
  );

  useEffect(() => {
    let intervalRef = null;

    const init = async () => {
      const existingTrack = tracks.find(track => track.id === soundId);
      sound.current = existingTrack;
      console.log("init");
      if (!sound.current) {
        sound.current = howlWrapper(src, soundId);
        sound.current.track = track;
        tracks.push(sound.current);
      } else {
        // recreate state
        const playing = sound.current.howl.playing();
        try {
          const pos = sound.current.howl.seek();
          mounted.current && setProgress(pos);
        } catch (error) {
          //ignore
          console.log(error);
        }
        if (playing) {
          setState(playerStates.PLAYING);
          globalUpdate(null, playerStates.PLAYING);
          intervalRef = setInterval(step, 250);
        }
      }

      sound.current.setOnplay(() => {
        sound.current.howl.fade(0, 1, 100);
        if (mounted.current) {
          setState(playerStates.PLAYING);
          globalUpdate(null, playerStates.PLAYING);
          setError(null);
        }
        intervalRef = setInterval(step, 250);
        onDeck = sound.current;
      });
      sound.current.setOnpause(() => {
        console.log("on pause");
        if (mounted.current) {
          setState(playerStates.PAUSED);
          globalUpdate(null, playerStates.PAUSED);
        }
        clearInterval(intervalRef);
      });
      sound.current.setOnstop(() => {
        if (mounted.current) {
          setState(playerStates.STOPPED);
          globalUpdate(null, playerStates.STOPPED);
        }
        clearInterval(intervalRef);
        next();
      });
      sound.current.setOnend(() => {
        clearInterval(intervalRef);
        if (mounted.current) {
          setState(playerStates.STOPPED);
          globalUpdate(duration, playerStates.STOPPED);
          setProgress(duration);
        }
        sound.current.howl.stop();
      });
      sound.current.setOnload(() => {
        console.log("on load");
        if (mounted.current) {
          console.log("on load 2");
          setError(null);
          step();
        }
      });
      sound.current.setOnfade(() => {
        const volume = sound.current.howl.volume();
        if (volume === 0) {
          sound.current.howl.pause();
        }
      });
      sound.current.setOnloaderror((id, error) => {
        console.log({ error });
        if (error && !error.includes("codec") && mounted.current) {
          setState(playerStates.STOPPED);
          globalUpdate(null, playerStates.STOPPED);
          setError(error);
          step();
        }
      });
      setInitialized(true);
    };

    init();

    return () => {
      clearInterval(intervalRef);
    };
  }, [duration, soundId, src, track]);

  useEffect(() => {
    if (sound.current && initialized) {
      sound.current.play = play;
      sound.current.pause = pause;
      sound.current.seek = jumpTo;
    }
  }, [initialized, jumpTo, pause, play]);

  return {
    play,
    pause,
    stop,
    jumpTo,
    state,
    error,
    progress,
    loading: sound.current && sound.current.howl.state() === "loading"
  };
};

const howlWrapper = (src, soundId) => {
  let onplay = console.log;
  let setOnplay = f => {
    console.log("setting");
    onplay = f;
  };
  let onpause = console.log;
  let setOnpause = f => (onpause = f);
  let onstop = console.log;
  let setOnstop = f => (onstop = f);
  let onend = console.log;
  let setOnend = f => (onend = f);
  let onload = console.log;
  let setOnload = f => (onload = f);
  let onfade = console.log;
  let setOnfade = f => (onfade = f);
  let onloaderror = console.log;
  let setOnloaderror = f => (onloaderror = f);

  const howl = new Howl({
    src,
    html5: true,
    onplay: () => onplay(),
    onpause: () => onpause(),
    onstop: () => onstop(),
    onend: () => onend(),
    onload: () => onload(),
    onfade: () => onfade(),
    onloaderror: () => onloaderror()
  });

  return {
    id: soundId,
    howl,
    setOnplay,
    setOnpause,
    setOnstop,
    setOnend,
    setOnload,
    setOnfade,
    setOnloaderror
  };
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
const previous = skip("next");

const useCurrentDeck = () => {
  const [progress, setProgress] = useState(0);

  // register update function
  useEffect(() => {
    globalUpdate = p => {
      p && setProgress(p);
    };
    return () => {
      globalUpdate = () => {};
    };
  }, []);

  return {
    progress,
    onDeck,
    next,
    previous
  };
};

export default useSoundPlayer;

export { useCurrentDeck };
