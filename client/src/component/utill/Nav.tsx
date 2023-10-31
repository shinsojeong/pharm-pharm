import * as React from "react";
import { ReactElement } from "react";
import { useAppSelector, useAppDispatch } from "../../util/hooks";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

import { changeNav } from "../../module/bar";
import { RootState } from "../../module/store";
import "../../style/Bar.scss";

import Search from "../../source/search.png";
import Camera from "../../source/camera.png";
import Account from "../../source/account.png";
import Home from "../../source/home.png";

export default function Nav(): ReactElement {
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const nav = useAppSelector((state: RootState) => state.bar.nav.selected);

  const goTo = debounce((selected: string) => {
    dispatch(changeNav({ selected }));
    history(`/user/${selected}`);
  }, 800);

  return (
    <div className="nav">
      <div className="navWrap">
        <div
          className="navItem"
          id={nav === "search" ? "selected" : "default"}
          onClick={() => goTo("search")}
        >
          <img src={Search} width="45" alt="search" />
        </div>

        <div
          className="navItem"
          id={nav === "camera" ? "selected" : "default"}
          onClick={() => goTo("camera")}
        >
          <img src={Camera} width="45" alt="camera" />
        </div>

        <div
          className="navItem"
          id={nav === "mypage" ? "selected" : "default"}
          onClick={() => goTo("mypage")}
        >
          <img src={Account} width="45" alt="account" />
        </div>

        <div
          className="navItem"
          id={nav === "home" ? "selected" : "default"}
          onClick={() => goTo("home")}
        >
          <img src={Home} width="45" alt="Home" />
        </div>
      </div>
    </div>
  );
}
