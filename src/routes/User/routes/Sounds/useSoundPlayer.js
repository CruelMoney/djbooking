import { useEffect, useRef, useState } from "react";
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
  const howler = useRef();
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

  const pause = () => {
    if (sound.current) {
      setState(playerStates.PAUSED);
      sound.current.pause();
    }
  };

  const jumpTo = seconds => {
    if (sound.current) {
      if (state === playerStates.PLAYING) {
        setLoading(true);
      }
      setProgress(seconds);
      sound.current.seek(seconds);
    }
  };

  useEffect(() => {
    let animation = null;

    const step = () => {
      if (sound.current) {
        setLoading(false);
        const seconds = Number.parseFloat(sound.current.seek());
        if (!Number.isNaN(seconds)) {
          setProgress(seconds);
        }
      }
    };

    import("howler").then(({ Howl, Howler }) => {
      howler.current = Howler;
      sound.current = new Howl({
        src: [src],
        preload: false,
        html5: true,
        onplay: () => {
          setState(playerStates.PLAYING);
          setError(null);
          animation = setInterval(step, 250);
        },
        onpause: () => {
          setState(playerStates.PAUSED);
          clearInterval(animation);
        },
        onstop: () => {
          setState(playerStates.STOPPED);
          clearInterval(animation);
        },
        onend: () => {
          setState(playerStates.STOPPED);
          clearInterval(animation);
          setProgress(duration);
        },
        onload: () => {
          setLoading(false);
          setError(null);
        },

        onloaderror: (id, error) => {
          if (error && !error.includes("codec")) {
            setState(playerStates.STOPPED);
            setLoading(false);
            setError(error);
          }
        }
      });
    });

    stopFunctions.push(pause);

    return () => {
      clearInterval(animation);
      stopFunctions = stopFunctions.filter(fn => fn !== pause);
      if (sound.current) {
        sound.current.unload();
      }
    };
  }, [duration, src]);

  const play = async (seconds = 0) => {
    if (sound.current) {
      setLoading(true);
      // making sure we restart if ended
      const startfrom = state === playerStates.STOPPED ? seconds : progress;
      stopFunctions.forEach(s => s !== pause && s());
      setState(playerStates.PLAYING);
      setProgress(startfrom);
      await sound.current.load();
      jumpTo(startfrom);

      sound.current.volume(0);
      sound.current.play();
      sound.current.fade(0, 1, 250);

      logPlay();
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
