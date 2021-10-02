import * as React from 'react';
import { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changeNav } from '../../module/bar';
import '../../style/Bar.scss';
import { RootState } from '../../module/store';
import { VscSearch, VscDeviceCamera, VscAccount, VscHome } from 'react-icons/Vsc';

export default function Nav(): ReactElement {
  const dispatch = useDispatch();
  const history = useHistory();
  const nav = useSelector((state: RootState) => state.bar.nav.selected);
  
  function goTo(selected: string) {
    dispatch(changeNav({selected}))
    history.replace(`/user/${selected}`)
  }

  return (
    <div className="nav">
      <div className="navWrap">
        <div className="navItem" 
        id={nav === "search" ? "selected" : "default"}
        onClick={() => goTo("search")}>
          <VscSearch size="45"/>
        </div>

        <div className="navItem" 
        id={nav === "camera" ? "selected" : "default"}
        onClick={() => goTo("camera")}>
          <VscDeviceCamera size="45"/>
        </div>

        <div className="navItem" 
        id={nav === "mypage" ? "selected" : "default"}
        onClick={() => goTo("mypage")}>
          <VscAccount size="45"/>
        </div>

        <div className="navItem" 
        id={nav === "home" ? "selected" : "default"}
        onClick={() => goTo("home")}>
          <VscHome size="45"/>
        </div>
      </div>
    </div>
  )
}
