import { useMutation } from "react-apollo";
import { LOG_ACTIVITY } from "../../routes/User/gql";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const useLogActivity = ({ type, subjectId, manual = false }) => {
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true
  });

  const [log] = useMutation(LOG_ACTIVITY, {
    variables: {
      type,
      subjectId
    }
  });

  useEffect(() => {
    if (!manual && inView) {
      log();
    }
  }, [manual, log, inView]);

  return { ref, log };
};

export const LogActivityInView = ({ type, subjectId, children }) => {
  const { ref } = useLogActivity({ type, subjectId });

  return <div ref={ref}>{children}</div>;
};

export const ACTIVITY_TYPES = Object.freeze({
  SOUND_PLAY: "SOUND_PLAY", // not implemented in frontend
  PROFILE_VIEW: "PROFILE_VIEW", // not implemented frontend
  GIG_VIEWED_BY_ORGANIZER: "GIG_VIEWED_BY_ORGANIZER", // not implemented frontend
  GIG_VIEWED_BY_DJ: "GIG_VIEWED_BY_DJ" // not implemented frontend
});

export default useLogActivity;
