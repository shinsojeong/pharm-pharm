import * as React from 'react';
import { ReactElement } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { resetBar } from '../../module/bar';
import { resetSchedule } from '../../module/schedule';

export default function Mypage(): ReactElement {
  const history = useHistory();
  const dispatch = useDispatch();
  
  const url = process.env.REACT_APP_SERVER;

  const logout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      axios.get(`${url}/auth/logout`, {
        withCredentials: true
      })
      .then((res) => {
        if (res.data.code === 200) {
          dispatch(resetBar());
          dispatch(resetSchedule());
          alert("로그아웃이 완료되었습니다.");
          history.replace('/');
        }
      })
    }
  };

  return (
    <div className="contents" id="mypage">
      <div onClick={logout}>
        <a>로그아웃</a>
      </div>
    </div>
  )
}
