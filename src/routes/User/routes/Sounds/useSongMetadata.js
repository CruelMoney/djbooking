import { useEffect, useRef, useState } from "react";

const useSongMetadata = ({ file }) => {
  const [initialized, setInitialized] = useState(false);
  const [metadata, setMetadata] = useState({});
  const parser = useRef();

  useEffect(() => {
    const getDep = async () => {
      parser.current = await import("music-metadata-browser");
      setInitialized(true);
    };
    getDep();
  }, []);

  useEffect(() => {
    const doParse = async () => {
      try {
        if (parser.current && file) {
          let data = await parser.current.parseBlob(file);
          const { picture } = data.common;
          if (picture) {
            data.common.imageFile = new Blob([picture[0].data], {
              type: picture[0].format
            });
          }

          setMetadata(data);
        }
      } catch (error) {
        setMetadata({ common: {} });
        console.log({ error });
      }
    };

    doParse();

    return () => {
      setMetadata({});
    };
  }, [initialized, file]);

  return metadata;
};

export default useSongMetadata;
