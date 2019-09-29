import React from "react";
import Loadable from "react-loadable";
import { LoadingPlaceholder2 } from "../../components/common/LoadingPlaceholder";

const Loader = () => (
  <div className="container">
    <LoadingPlaceholder2 />
  </div>
);

const AsynUser = Loadable({
  loader: () => import("./User"),
  loading: Loader
});

export default AsynUser;
