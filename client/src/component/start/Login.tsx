import * as React from "react";
import { ReactElement } from "react";
import "../../style/Start.scss";
import pharmpharm_logo2 from "../../source/pharmpharm_logo2.png";
import kakao_login_medium_narrow from "../../source/kakao_login_medium_narrow.png";

export default function Login(): ReactElement {
  return (
    <div className="login">
      <img src={pharmpharm_logo2} id="logo" />
      <a href="https://port-0-server-euegqv2llodnudy4.sel5.cloudtype.app/auth/kakao">
        <img src={kakao_login_medium_narrow} id="kakaoLogin" />
      </a>
    </div>
  );
}
