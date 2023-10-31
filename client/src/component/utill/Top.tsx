import * as React from 'react';
import { ReactElement } from 'react';
import { useAppSelector } from '../../util/hooks';

import '../../style/Bar.scss';
import { RootState } from '../../module/store';
import { AiOutlineCloseCircle } from 'react-icons/Ai';

export default function Top(): ReactElement {
  const top = useAppSelector((state: RootState) => state.bar.top);

  function getLeft () {
    if (top.left === "cancel") {
      return (
        <div className="leftItem" id="cancel">
          <p>취소</p>
        </div>
      )
    } else return <div className="leftItem" id="null"/>
  }

  function getRight () {
    if (top.right === "close") {
      return (
        <div className="rightItem" id="close">
          <AiOutlineCloseCircle size="30px"/>
        </div>
      )
    } else if (top.right === "create") { 
      return (
        <div className="rightItem" id="create">
          <p>등록</p>
        </div>
      )
    } else return <div className="rightItem" id="null"/>
  }

  return (
    <div className="top"> 
      <div id="left" onClick={() => top.lfunc}>
        { getLeft() }
      </div>
      <div id="center">
        <p>{ top.center }</p>
      </div>
      <div id="right" onClick={() => top.rfunc}>
        { getRight() }
      </div>
    </div>
  )
}
