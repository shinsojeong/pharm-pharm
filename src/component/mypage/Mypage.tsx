import React, { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

import { changeTop, resetBar } from '../../module/bar';
import { resetSchedule } from '../../module/schedule';

import Profile_analysis_Flatline from '../../source/Profile_analysis_Flatline.png';
import '../../style/Mypage.scss';

export default function Mypage(): ReactElement {
  const history = useNavigate();
  const dispatch = useDispatch();
  
  const url = process.env.REACT_APP_SERVER;

  const [myInfo, setMyInfo] = useState({
    nickname: "",
    birth: "",
    gender: ""
  });

  useEffect(() => {
    dispatch(
      changeTop({
        left: "null",
        center: "마이페이지",
        right: "null",
        lfunc: null, 
        rfunc: null
      })
    )
    getUserInfo();
  }, []);

  //function
  //로그아웃
  const logout = debounce(() => {
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
  }, 800)

  //유저 정보 받아오기
  const getUserInfo = () => {
    axios.get(`${url}/auth/mypage`, {
      withCredentials: true
    })
    .then((res) => {
      if (res.data.code === 200) {
        setMyInfo(res.data.data)
      } else if (res.data.code === 403) {
        history.replace('/');
      }
    })
  }

  return (
    <div className="contents" id="mypage">
      <table id="profile">
        <tbody>
          <tr>
            <td id="img">
              <img src={Profile_analysis_Flatline} width="250px"/>
            </td>
          </tr>
          <tr>
            <td>{myInfo.nickname} 님</td>
          </tr>
        </tbody>
      </table>
      <div id="logout" onClick={logout}>
        <a>로그아웃</a>
      </div>
    </div>
  )
}
