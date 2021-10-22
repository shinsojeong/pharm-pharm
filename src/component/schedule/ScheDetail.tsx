import * as React from 'react';
import { ReactElement, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../module/store';
import { updateSchedule, deleteSchedule } from '../../module/schedule';
import { changeTop } from '../../module/bar';
import { dayArr, timeArr } from '../utill/Reusable';

import ScheTimeView from './ScheTimeView';
import '../../style/Schedule.scss';

export default function ScheDetail(): ReactElement {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(
      changeTop({
        left: "null",
        center: "복용 일정",
        right: "close",
        lfunc: null, 
        rfunc: goBack
      })
    )
  }, []);

  const data = useSelector((state: RootState) => state.schedule.selected_schedule);
  const [updateState, setUpdateState] = useState(false);
  const [mediDate1, setMediDate1] = useState(data.medi_date1);
  const [mediDate2, setMediDate2] = useState(data.medi_date2);
  const [mediDay, setMediDay] = useState((data.medi_day).split(','));
  const [mediTime, setMediTime] = useState((data.medi_time).split(','));
  const [mediTimes, setMediTimes] = useState(data.medi_times);
  const [mediNum, setMediNum] = useState(data.medi_num);
  const timeArray = timeArr();

  //function
  //뒤로가기
  function goBack() {
    history.replace("/user/home");
  }

  //업데이트
  const updateSche = async() => {
    await dispatch(
      updateSchedule(
        {
          sche_code: data.sche_code,
          medi_code: data.medi_code, 
          medi_name: data.medi_name,
          medi_date1: mediDate1,
          medi_date2: mediDate2,
          medi_day: mediDay.toString(),
          medi_time: mediTime.toString(),
          medi_times: mediTimes,
          medi_num: mediNum
        }
      )
    );
    setUpdateState(false);
  }

  //삭제
  const deleteSche = () => {
    dispatch(
      deleteSchedule(
        { sche_code: data.sche_code }
      )
    );
  }

  //checkbox changeHandler
  const changeHandler = (type: string, checked: boolean, id: string) => {
    if (type === "mediDay") {
      if (checked) {
        setMediDay([...mediDay, id]);
      } else {
        // 체크 해제
        setMediDay(mediDay.filter((el) => el !== id));
      }
    } else if (type === "mediTime") {
      if (checked) {
        setMediTime([...mediTime, id]);
      } else {
        // 체크 해제
        setMediTime(mediTime.filter((el) => el !== id));
      }
    }
  }

  return (
    <div className="contents" id="scheDetail">
      <table>
        <tbody>
          <tr>
            <td id="tdTitle">제품명</td>
            <td id="tdContent">{data.medi_name}</td>
          </tr>
          <tr>
            <td id="tdTitle">복용 시작일</td>
            <td id="tdContent">
              {!updateState ? 
                data.medi_date1.slice(0,10)
              :
                <input type="date" onChange={(e) => setMediDate1(e.target.value)} value={mediDate1.slice(0,10)}/>
              }
            </td>
          </tr>
          <tr>
            <td id="tdTitle">복용 종료일</td>
            <td id="tdContent">
              {!updateState ?
                data.medi_date2.slice(0,10)
              :
                <input type="date" onChange={(e) => setMediDate2(e.target.value)} value={mediDate2.slice(0,10)}/>
              }
            </td>
          </tr>
          <tr>
            <td id="tdTitle">복용 요일</td>
            <td id="tdDay">
              {!updateState ?
                (
                  mediDay.map((data) => {
                    switch (data) {
                      case "0":
                        return "일 ";
                      case "1":
                        return "월 ";
                      case "2":
                        return "화 ";
                      case "3":
                        return "수 ";
                      case "4":
                        return "목 ";
                      case "5":
                        return "금 ";
                      case "6":
                        return "토 ";
                    }
                  })
                )
              :
                dayArr.map((data) => {
                  return (
                    <span key={data.value}>
                      <label htmlFor={data.value.toString()} id={mediDay.includes(data.value.toString()) ? "checked" : "none"}>{data.day}</label>
                      <input type="checkbox" name={data.value.toString()} 
                        onChange={(e) => changeHandler("mediDay", e.target.checked, data.value.toString())} 
                        value={data.value} id={data.value.toString()}
                        checked={mediDay.includes(data.value.toString()) ? true : false}>
                      </input>
                    </span>
                  )
                })
              }
            </td>
          </tr>
          <tr>
            <td id="tdTitle">복용 시간</td>
          </tr>
          <tr>
            <td colSpan={2} id="tdTime">
              {!updateState ?
                <ScheTimeView time={(data.medi_time).toString()}/>
              :
                timeArray.map((data) => {
                  return (
                    <span key={data.value}>
                      <label htmlFor={data.value.toString()} id={mediTime.includes(data.value.toString()) ? "checked" : "none"}>{data.time}</label>
                      <input type="checkbox" name={data.value.toString()} 
                        onChange={(e) => changeHandler("mediTime", e.target.checked, data.value.toString())} 
                        value={data.value} id={data.value.toString()}
                        checked={mediTime.includes(data.value.toString()) ? true : false}>
                      </input>
                    </span>
                  )
                })
              }
            </td>
          </tr>
          <tr>
            <td id="tdTitle">복용 횟수</td>
            <td id="tdContent">
              {!updateState ?
                <p>1일 {data.medi_times}회</p>
              :
                <input type="text" onChange={(e) => setMediTimes(parseInt(e.target.value))} defaultValue={mediTimes.toString()}/>
              }
            </td>
          </tr>
          <tr>
            <td id="tdTitle">복용 개수</td>
            <td id="tdContent">
              {!updateState ?
                <p>1회 {data.medi_num}정</p>
              :
                <input type="text" onChange={(e) => setMediNum(parseInt(e.target.value))} defaultValue={mediNum.toString()}/>
              }
            </td>
          </tr>
        </tbody>
      </table>
      {!updateState ?
        <div className="btnDiv">
          <button id="whiteBtn" onClick={() => setUpdateState(true)}>수정</button>
          <button id="orangeBtn" onClick={() => deleteSche()}>삭제</button>
        </div>
      :
        <div className="btnDiv">
          <button id="orangeBtn" onClick={() => updateSche()}>완료</button>
        </div>
      }
    </div>
  )
}
