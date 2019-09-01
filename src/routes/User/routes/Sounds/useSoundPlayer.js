import { useEffect, useRef, useState } from "react";

export const playerStates = Object.freeze({
  PLAYING: "PLAYING",
  PAUSED: "PAUSED",
  STOPPED: "STOPPED"
});

let stopFunctions = [];

const useSoundPlayer = ({ src, duration }) => {
  const sound = useRef();
  const howler = useRef();
  const [state, setState] = useState(playerStates.STOPPED);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState();

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
      setProgress(seconds);
      sound.current.seek(seconds);
    }
  };

  useEffect(() => {
    let animation = null;

    const step = () => {
      if (sound.current) {
        setProgress(sound.current.seek());
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
        onloaderror: (id, error) => {
          setState(playerStates.STOPPED);
          setError(error);
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

  const play = async () => {
    if (sound.current) {
      stopFunctions.forEach(s => s !== pause && s());
      const theState = state;
      setState(playerStates.PLAYING);
      await sound.current.load();
      // making sure we restart if ended
      const startfrom = theState === playerStates.STOPPED ? 0 : progress;

      sound.current.seek(startfrom);
      sound.current.volume(0);
      sound.current.play();
      sound.current.fade(0, 1, 250);
    }
  };

  return {
    play,
    pause,
    stop,
    jumpTo,
    state,
    error,
    progress
  };
};

export default useSoundPlayer;
