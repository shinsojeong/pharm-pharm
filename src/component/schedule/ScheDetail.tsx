import * as React from 'react';
import { ReactElement, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../module/store';
import { updateSchedule, deleteSchedule } from '../../module/schedule';
import ScheTimeView from './ScheTimeView';
import { changeTop } from '../../module/bar';
import { dayArr, timeArr } from '../utill/Reusable';

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
  const [mdeiDate2, setMediDate2] = useState(data.medi_date2);
  const [mediDay, setMediDay] = useState((data.medi_day).split(','));
  const [mediTime, setMediTime] = useState((data.medi_time).split(','));
  const [mediTimes, setMediTimes] = useState(data.medi_times);
  const [mediNum, setMediNum] = useState(data.medi_num);
  const timeArray = timeArr();

  //function
  //뒤로가기
  function goBack() {
    history.goBack()
  }

  //업데이트
  const updateSche = async() => {
    try {
      dispatch(
        updateSchedule(
          {
            sche_code: data.sche_code,
            medi_code: data.medi_code, 
            medi_name: data.medi_name,
            medi_date1: mediDate1,
            medi_date2: mdeiDate2,
            medi_day: mediDay.toString(),
            medi_time: mediTime.toString(),
            medi_times: mediTimes,
            medi_num: mediNum
          }, history
        )
      );
    }
    finally {
      setUpdateState(false);
    }
  };

  //삭제
  const deleteSche = () => {
    try {
      dispatch(
        deleteSchedule(
          data.sche_code,
          history
        )
      );
    }
    finally {
      history.replace("/user/home");
    }
  };

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
  };

  return (
    <div className="contents" id="scheDetail">
      <table>
        <tbody>
          <tr>
            <td>제품명</td>
            <td>{data.medi_name}</td>
          </tr>
          <tr>
            <td>복용 시작일</td>
            <td>
              {!updateState ? 
                data.medi_date1.slice(0,10)
              :
                <input type="date" onChange={(e) => setMediDate1(e.target.value)} value={mediDate1.slice(0,10)}/>
              }
            </td>
          </tr>
          <tr>
            <td>복용 종료일</td>
            <td>
              {!updateState ?
                data.medi_date2.slice(0,10)
              :
                <input type="date" onChange={(e) => setMediDate2(e.target.value)} value={mdeiDate2.slice(0,10)}/>
              }
            </td>
          </tr>
          <tr>
            <td>복용 요일</td>
            <td>
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
                    <div key={data.value}>
                      <label htmlFor={data.value.toString()}>{data.day}</label>
                      <input type="checkbox" name={data.value.toString()} 
                        onChange={(e) => changeHandler("mediDay", e.target.checked, data.value.toString())} 
                        value={data.value} id={data.value.toString()}
                        checked={mediDay.includes(data.value.toString()) ? true : false}>
                      </input>
                    </div>
                  )
                })
              }
            </td>
          </tr>
          <tr>
            <td>복용 시간</td>
          </tr>
          <tr>
            <td colSpan={2}>
              {!updateState ?
                <ScheTimeView time={(data.medi_time).toString()}/>
              :
                timeArray.map((data) => {
                  return (
                    <div key={data.value}>
                      <label htmlFor={data.value.toString()}>{data.time}</label>
                      <input type="checkbox" name={data.value.toString()} 
                        onChange={(e) => changeHandler("mediTime", e.target.checked, data.value.toString())} 
                        value={data.value} id={data.value.toString()}
                        checked={mediTime.includes(data.value.toString()) ? true : false}>
                      </input>
                    </div>
                  )
                })
              }
            </td>
          </tr>
          <tr>
            <td>복용 횟수</td>
            <td>
              {!updateState ?
                <p>1일 {data.medi_times}회</p>
              :
                <input type="text" onChange={(e) => setMediTimes(parseInt(e.target.value))} defaultValue={mediTimes.toString()}/>
              }
            </td>
          </tr>
          <tr>
            <td>복용 개수</td>
            <td>
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
          <button onClick={() => setUpdateState(true)}>수정</button>
          <button onClick={() => deleteSche()}>삭제</button>
        </div>
      :
        <div className="btnDiv">
          <button onClick={() => updateSche()}>완료</button>
        </div>
      }
    </div>
  )
}
