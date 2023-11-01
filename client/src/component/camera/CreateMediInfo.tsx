import React, { ReactElement, useEffect, useState } from "react";
import { useAppDispatch } from "../../util/hooks";
import { useLocation } from "react-router-dom";
import { debounce } from "lodash";

import { changeTop } from "../../module/bar";
import { createSchedule } from "../../module/schedule";
import { scheduleType } from "../../module/type/scheType";
import { dayArr, scheRegExp, timeArr } from "../utill/Reusable";

export default function CreateMediInfo(): ReactElement {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { medi_code, medi_name, medi_num, medi_times }: scheduleType =
    location.state;
  const [mediDate1, setMediDate1] = useState("");
  const [mediDate2, setMediDate2] = useState("");
  const [mediDay, setMediDay] = useState([]);
  const [mediTime, setMediTime] = useState([]);
  const timeArray = timeArr();

  useEffect(() => {
    dispatch(
      changeTop({
        left: "null",
        center: "복용 정보 등록",
        right: "null",
        lfunc: null,
        rfunc: null,
      })
    );
  }, []);

  /** onChange 함수 */
  const changeHandler = (type: string, checked: boolean, id: any) => {
    if (type === "mediDay") {
      if (checked) setMediDay([...mediDay, id]);
      else setMediDay(mediDay.filter((el) => el !== id)); //체크 해제
    } else if (type === "mediTime") {
      if (checked) setMediTime([...mediTime, id]);
      else setMediTime(mediTime.filter((el) => el !== id)); //체크 해제
    }
  };

  /** 복용 정보 등록 */
  const submit = debounce(() => {
    const [s_medi_date1, s_medi_date2] = [
      mediDate1.toString(),
      mediDate2.toString(),
    ];
    const s_medi_day = mediDay
      .sort((a: string, b: string) => parseInt(a) - parseInt(b))
      .toString();

    const s_medi_time = mediTime
      .sort((a: string, b: string) => parseInt(a) - parseInt(b))
      .toString();

    if (
      !scheRegExp({
        medi_code,
        medi_name,
        medi_date1: s_medi_date1,
        medi_date2: s_medi_date2,
        medi_day: s_medi_day,
        medi_time: s_medi_time,
        medi_times,
        medi_num,
      })
    ) {
      return alert("모든 항목을 입력해주세요.");
    }
    dispatch(
      createSchedule({
        medi_code,
        medi_name,
        medi_date1: s_medi_date1,
        medi_date2: s_medi_date2,
        medi_day: s_medi_day,
        medi_time: s_medi_time,
        medi_times,
        medi_num,
      })
    );
  }, 800);

  return (
    <div className="contents" id="createMediInfo">
      <table>
        <tbody>
          <tr>
            <td id="tdTitle">품목기준코드</td>
            <td id="tdContent">{medi_code}</td>
          </tr>
          <tr>
            <td id="tdTitle">제품명</td>
            <td id="tdContent">{medi_name}</td>
          </tr>
          <tr>
            <td id="tdTitle">복용개수/횟수</td>
            <td id="tdContent">
              {medi_num}정씩 {medi_times}회
            </td>
          </tr>
          <tr>
            <td id="tdTitle">복용시작일</td>
            <td id="tdContent">
              <input
                type="date"
                name="mediDate1"
                value={mediDate1}
                onChange={(e) => setMediDate1(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td id="tdTitle">복용종료일</td>
            <td id="tdContent">
              <input
                type="date"
                name="mediDate2"
                value={mediDate2}
                onChange={(e) => setMediDate2(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td id="tdTitle">복용요일</td>
            <td id="tdDay">
              {dayArr.map(({ value, day }) => {
                return (
                  <span key={value}>
                    <label
                      htmlFor={"day" + value.toString()}
                      id={mediDay.includes(value) ? "checked" : "none"}
                    >
                      {day}
                    </label>
                    <input
                      type="checkbox"
                      name={value.toString()}
                      onChange={(e) =>
                        changeHandler("mediDay", e.target.checked, value)
                      }
                      value={value}
                      id={"day" + value.toString()}
                      checked={mediDay.includes(value) ? true : false}
                    ></input>
                  </span>
                );
              })}
            </td>
          </tr>
          <tr>
            <td id="tdTitle">복용시간</td>
            <td id="tdTime">
              {timeArray.map(({ value, time }) => {
                return (
                  <span key={value}>
                    <label
                      htmlFor={value.toString()}
                      id={mediTime.includes(value) ? "checked" : "none"}
                    >
                      {time}
                    </label>
                    <input
                      type="checkbox"
                      name={value.toString()}
                      onChange={(e) =>
                        changeHandler("mediTime", e.target.checked, value)
                      }
                      value={value}
                      id={value.toString()}
                      checked={mediTime.includes(value) ? true : false}
                    ></input>
                  </span>
                );
              })}
            </td>
          </tr>
        </tbody>
      </table>

      <button onClick={submit}>등록</button>
    </div>
  );
}
