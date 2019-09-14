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
//{id: howl}[]
let tracks = [];

const useSoundPlayer = ({ soundId, src, duration }) => {
  const exstingTrack = tracks.find(track => track.id === soundId);
  const sound = useRef(exstingTrack);
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
      sound.current.howl.stop();
    }
  };

  const pause = useCallback(() => {
    if (sound.current && state === playerStates.PLAYING) {
      setState(playerStates.PAUSED);
      sound.current.howl.fade(1, 0, 100);
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
      sound.current.howl.seek(seconds);
    }
  };

  const step = () => {
    if (sound.current) {
      setLoading(false);
      try {
        const seconds = Number.parseFloat(sound.current.howl.seek());
        if (!Number.isNaN(seconds)) {
          setProgress(seconds);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    let intervalRef = null;

    const init = async () => {
      if (!sound.current) {
        sound.current = await howlWrapper(src, soundId);
        tracks.push(sound.current);
      } else {
        // recreate state
        const playing = sound.current.howl.playing();
        try {
          const pos = sound.current.howl.seek();
          setProgress(pos);
        } catch (error) {
          console.log(error);
        }
        if (playing) {
          setState(playerStates.PLAYING);
          intervalRef = setInterval(step, 250);
        }
      }
      sound.current.setOnplay(() => {
        console.log("on play");
        sound.current.howl.fade(0, 1, 100);
        setState(playerStates.PLAYING);
        setError(null);
        intervalRef = setInterval(step, 250);
      });
      sound.current.setOnpause(() => {
        console.log("on pause");
        setState(playerStates.PAUSED);
        clearInterval(intervalRef);
      });
      sound.current.setOnstop(() => {
        setState(playerStates.STOPPED);
        clearInterval(intervalRef);
      });
      sound.current.setOnend(() => {
        setState(playerStates.STOPPED);
        clearInterval(intervalRef);
        setProgress(duration);
        sound.current.howl.stop();
      });
      sound.current.setOnload(() => {
        setLoading(false);
        setError(null);
      });
      sound.current.setOnfade(() => {
        const volume = sound.current.howl.volume();
        if (volume === 0) {
          sound.current.howl.pause();
        }
      });
      sound.current.setOnloaderror((id, error) => {
        console.log({ error });
        if (error && !error.includes("codec")) {
          setState(playerStates.STOPPED);
          setLoading(false);
          setError(error);
        }
      });
    };

    init();

    return () => {
      clearInterval(intervalRef);
    };
  }, [duration, soundId, src]);

  const play = async (startfrom = 0) => {
    if (sound.current) {
      setLoading(true);
      stopFunctions.forEach(s => s !== pause && s());
      setState(playerStates.PLAYING);
      setProgress(startfrom);

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

const howlWrapper = async (src, soundId) => {
  console.log("howlwrapper");
  return new Promise(resolve => {
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

    import("howler").then(({ Howl }) => {
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

      resolve({
        id: soundId,
        howl,
        setOnplay,
        setOnpause,
        setOnstop,
        setOnend,
        setOnload,
        setOnfade,
        setOnloaderror
      });
    });
  });
};

export default useSoundPlayer;
