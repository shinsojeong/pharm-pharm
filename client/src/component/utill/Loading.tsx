import React, { ReactElement } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export default function Loading(): ReactElement {
  return (
    <div className="loading">
      <AiOutlineLoading size="30" />
    </div>
  );
}
