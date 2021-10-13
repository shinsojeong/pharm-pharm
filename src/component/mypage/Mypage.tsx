import * as React from 'react';
import { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changeTop, resetBar } from '../../module/bar';
import { resetSchedule } from '../../module/schedule';
import { GrUserFemale, GrUser } from 'react-icons/Gr';
import '../../style/Mypage.scss';

export default function Mypage(): ReactElement {
  const history = useHistory();
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
  };

  return (
    <div className="contents" id="mypage">
      <table id="profile">
        <tbody>
          <tr>
            <td rowSpan={2}>
              <div id="profileImg">
                {myInfo.gender === "female" ?
                  <GrUserFemale size="70"/>
                :
                  <GrUser size="70"/>
                }
              </div>
            </td>
            <td>{myInfo.nickname}</td>
          </tr>
          <tr>
            <td>{myInfo.birth}</td>
          </tr>
        </tbody>
      </table>
      <div onClick={logout}>
        <a>로그아웃</a>
      </div>
    </div>
  )
}
