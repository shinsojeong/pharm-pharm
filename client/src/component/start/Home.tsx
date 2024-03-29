import React, { ReactElement, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../util/hooks";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { debounce } from "lodash";

import { changeTop, changeNav } from "../../module/bar";
import { RootState } from "../../module/store";
import { getScheduleList, getTodaySchedule } from "../../module/schedule";
import { scheduleType } from "../../module/type/scheType";
import ScheModal from "../schedule/ScheModal";
import ScheMonthModal from "../schedule/ScheMonthModal";
import inform from "../../source/inform.png";
import "../../style/Start.scss";

export default function Home(): ReactElement {
  const dispatch = useAppDispatch();
  const history = useNavigate();

  const [day, setDay] = useState(moment());
  const [modalState, setModalState] = useState(false);
  const [monthModalState, setMonthModalState] = useState(false);
  const todaySche = useAppSelector(
    (state: RootState) => state.schedule.today_schedule
  );
  const firstWeek = day.clone().startOf("month").week();
  const lastWeek =
    day.clone().endOf("month").week() === 1
      ? 53
      : day.clone().endOf("month").week();
  const [selecedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    dispatch(
      changeTop({
        left: "null",
        center: "홈",
        right: "null",
        lfunc: null,
        rfunc: null,
      })
    );
    dispatch(
      changeNav({
        selected: "home",
      })
    );
    getTodaySche(); //오늘의 스케쥴 가져오기
  }, []);

  /** 캘린더 이전달로 변경 */
  const goPrev = debounce(() => {
    setDay(day.clone().subtract(1, "month"));
  }, 800);

  /** 캘린더 다음달로 변경 */
  const goNext = debounce(() => {
    setDay(day.clone().add(1, "month"));
  }, 800);

  /** 해당 달 캘린더 가져오기 */
  const getCalendar = () => {
    let result = [];
    for (let week = firstWeek; week <= lastWeek; week++) {
      result = result.concat(
        <tr key={week}>
          {Array(7)
            .fill(0)
            .map(({}, index) => {
              let days = day
                .clone()
                .startOf("year")
                .week(week)
                .startOf("week")
                .add(index, "day");
              let tdId = "tdNone";

              if (moment().format("YYYYMMDD") === days.format("YYYYMMDD")) {
                tdId = "tdRed";
              } else if (days.format("MM") !== day.format("MM")) {
                tdId = "tdGray";
              }

              return (
                <td key={index} id={tdId} onClick={() => showMonthModal(days)}>
                  <span>{days.format("D")}</span>
                </td>
              );
            })}
        </tr>
      );
    }
    return result;
  };

  /** 오늘의 복용 정보 가져오기 */
  const getTodaySche = () => {
    dispatch(getTodaySchedule(history));
  };

  const showMonthModal = debounce((days: moment.Moment) => {
    setSelectedDate(
      days.year() + "년 " + (days.month() + 1) + "월 " + days.date() + "일"
    );
    //선택 일자 복용 정보 가져오기
    dispatch(
      getScheduleList({
        year: days.year(),
        month: days.month() + 1,
        day: days.date(),
      })
    );
    setMonthModalState(true);
  }, 800);

  return (
    <div className="contents" id="startContents">
      <div className="items" id="todayList">
        <p id="title">오늘의 복용 정보</p>
        {todaySche.length === 0 ? (
          <div id="nSchedule">
            <img src={inform} width="250px" />
            <p id="message">오늘의 복용 정보가 없습니다.</p>
          </div>
        ) : (
          <div id="ySchedule">
            {todaySche.map(
              ({
                sche_code,
                medi_name,
                medi_times,
                medi_num,
              }: scheduleType) => {
                return (
                  <div
                    className="todayListItem"
                    key={sche_code}
                    onClick={() => setModalState(true)}
                  >
                    <p id="mediName">{medi_name}</p>
                    <p id="mediContent">
                      {medi_times}회 {medi_num}정
                    </p>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>

      <div className="items" id="calendar">
        <p id="title">월별 복용 정보</p>
        <div id="monthPick">
          <button onClick={goPrev} className="calendarBtn">
            &lt;
          </button>
          <span>{day.format("YYYY년 MM월")}</span>
          <button onClick={goNext} className="calendarBtn">
            &gt;
          </button>
        </div>
        <table id="calendarTable">
          <tbody>{getCalendar()}</tbody>
        </table>
      </div>
      {monthModalState ? (
        <ScheMonthModal
          setMonthModalState={() => setMonthModalState(false)}
          today={selecedDate}
        />
      ) : null}
      {modalState ? (
        <ScheModal setModalState={() => setModalState(false)} />
      ) : null}
    </div>
  );
}
