import React, { ReactElement } from "react";
import LoadingImg from "../../source/loading.png";

export default function Loading(): ReactElement {
  return (
    <div className="loading">
      <img src={LoadingImg} width="30px" alt="loading" />
    </div>
  );
}
