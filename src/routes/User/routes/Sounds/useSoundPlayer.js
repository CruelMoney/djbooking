import { useEffect, useRef, useState, useCallback } from "react";
import useLogActivity, {
  ACTIVITY_TYPES
} from "../../../../components/hooks/useLogActivity";

export const playerStates = Object.freeze({
  PLAYING: "PLAYING",
  PAUSED: "PAUSED",
  STOPPED: "STOPPED"
});

let stopFunctions = [];

const useSoundPlayer = ({ soundId, src, duration }) => {
  const sound = useRef();
  const [state, setState] = useState(playerStates.STOPPED);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { log: logPlay } = useLogActivity({
    type: ACTIVITY_TYPES.SOUND_PLAY,
    subjectId: soundId,
    manual: true
  });

  const stop = () => {
    if (sound.current) {
      sound.current.stop();
    }
  };

  const pause = useCallback(() => {
    if (sound.current && state === playerStates.PLAYING) {
      setState(playerStates.PAUSED);
      sound.current.fade(1, 0, 100);
    }
  }, [state]);

  useEffect(() => {
    stopFunctions.push(pause);
    return () => {
      stopFunctions = stopFunctions.filter(fn => fn !== pause);
    };
  }, [pause]);

  const jumpTo = seconds => {
    if (sound.current) {
      if (state === playerStates.PLAYING) {
        setLoading(true);
      }
      setProgress(seconds);
      sound.current.seek(seconds);
    }
  };

  const step = () => {
    if (sound.current) {
      setLoading(false);
      const seconds = Number.parseFloat(sound.current.seek());
      if (!Number.isNaN(seconds)) {
        setProgress(seconds);
      }
    }
  };

  useEffect(() => {
    let intervalRef = null;

    import("howler").then(({ Howl, Howler }) => {
      sound.current = new Howl({
        src,
        html5: true,
        onplay: () => {
          sound.current.fade(0, 1, 100);
          setState(playerStates.PLAYING);
          setError(null);
          intervalRef = setInterval(step, 250);
        },
        onpause: () => {
          setState(playerStates.PAUSED);
          clearInterval(intervalRef);
        },
        onstop: () => {
          setState(playerStates.STOPPED);
          clearInterval(intervalRef);
        },
        onend: () => {
          setState(playerStates.STOPPED);
          clearInterval(intervalRef);
          setProgress(duration);
          sound.current.stop();
        },
        onload: () => {
          setLoading(false);
          setError(null);
        },
        onfade: () => {
          const volume = sound.current.volume();
          if (volume === 0) {
            sound.current.pause();
          }
        },

        onloaderror: (id, error) => {
          console.log({ error });
          if (error && !error.includes("codec")) {
            setState(playerStates.STOPPED);
            setLoading(false);
            setError(error);
          }
        }
      });
    });

    return () => {
      clearInterval(intervalRef);
      if (sound.current) {
        sound.current.unload();
      }
    };
  }, [duration, src]);

  const play = async (startfrom = 0) => {
    if (sound.current) {
      setLoading(true);
      stopFunctions.forEach(s => s !== pause && s());
      setState(playerStates.PLAYING);
      setProgress(startfrom);

      if (state === playerStates.STOPPED) {
        logPlay();
      }
      sound.current.volume(0);
      sound.current.play();

      if (startfrom) {
        sound.current.volume(1); // this needs, otherwise it gonna be silent
        setTimeout(() => sound.current.seek(startfrom), 1000);
      }
    }
  };

  return {
    play,
    pause,
    stop,
    jumpTo,
    state,
    error,
    progress,
    loading
  };
};

export default useSoundPlayer;
