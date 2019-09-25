import React from "react";
import Loadable from "react-loadable";
import { LoadingPlaceholder2 } from "../../components/common/LoadingPlaceholder";

const Loader = () => (
  <div className="container">
    <LoadingPlaceholder2 />
  </div>
);

const AsyncLocation = Loadable({
  loader: () => import("./Location"),
  loading: Loader
});

export default AsyncLocation;
