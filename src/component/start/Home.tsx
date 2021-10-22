import * as React from 'react';
import { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { changeTop } from '../../module/bar';
import { RootState } from '../../module/store';
import { getScheduleList, getTodaySchedule } from '../../module/schedule';
import { scheduleInterface } from '../../module/type/scheType';
import ScheModal from '../schedule/ScheModal';
import ScheMonthModal from '../schedule/ScheMonthModal';
import '../../style/Start.scss';

export default function Home(): ReactElement {
  const dispatch = useDispatch();
  const history = useHistory();

  const [day, setDay] = useState(moment());
  const [modalState, setModalState] = useState(false);
  const [monthModalState, setMonthModalState] = useState(false); 
  const todaySche = useSelector((state: RootState) => state.schedule.today_schedule);
  const firstWeek = day.clone().startOf('month').week();
  const lastWeek = day.clone().endOf('month').week() === 1 ? 53 : day.clone().endOf('month').week();
  const [selecedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    dispatch(
      changeTop({
        left: "null",
        center: "홈",
        right: "null",
        lfunc: null, 
        rfunc: null
      })
    );
    getTodaySche(); //오늘의 스케쥴 가져오기
  }, []);

  //function
  //캘린더 이전달로 변경
  const goPrev = () => {
    setDay(day.clone().subtract(1, 'month'));
  }

  //캘린더 다음달로 변경
  const goNext = () => {
    setDay(day.clone().add(1, 'month'));
  }

  //해당 달 캘린더 가져오기
  const getCalendar = () => {
    let result = [];
      for (let week = firstWeek; week <= lastWeek; week++) {
        result = result.concat(
          <tr key={week}>
            {
              Array(7).fill(0).map((data, index) => {
                let days = day.clone().startOf('year').week(week).startOf('week').add(index, 'day');

                if(moment().format('YYYYMMDD') === days.format('YYYYMMDD')){
                  return (
                    <td key={index} id="tdRed" onClick={() => showMonthModal(days)}>
                      <span>{days.format('D')}</span>
                    </td>
                  );
                } else if (days.format('MM') !== day.format('MM')){
                  return (
                    <td key={index} id="tdGray" onClick={() => showMonthModal(days)}>
                      <span>{days.format('D')}</span>
                    </td>
                  );
                } else{
                  return (
                    <td key={index} id="tdNone" onClick={() => showMonthModal(days)}>
                      <span>{days.format('D')}</span>
                    </td>
                  );
                }
              })
            }
          </tr>
        );
      }
      return result;
  }

  //오늘의 복용 정보 가져오기
  const getTodaySche = () => {
    dispatch(
      getTodaySchedule(history)
    )
  }

  const showMonthModal = (days) => {
    setSelectedDate(days.year()+"년 "+(days.month()+1)+"월 "+days.date()+"일");
    //선택 일자 복용 정보 가져오기
    dispatch(
      getScheduleList(
        {
          year: days.year(), 
          month: days.month()+1, 
          day: days.date()
        }
    ))
    setMonthModalState(true);
  }

  return (
    <div className="contents" id="home">
      <div className="items" id="todayList">
        <p id="title">#  오늘의 복용 정보  #</p>
        {todaySche.length === 0 ?
          <p id="message">오늘의 복용 정보가 없습니다.</p>
        :
          todaySche.map((data: scheduleInterface) => {
            return (
              <div className="todayListItem" key={data.sche_code} onClick={() => setModalState(true)}>
                <p id="mediName">{data.medi_name}</p>
                <p id="mediContent">{data.medi_times}회 {data.medi_num}정</p>
              </div>
            )
          })
        }
      </div>

      <div className="items" id="calendar">
        <p id="title">#  월별 복용 정보  #</p>
        <div id="monthPick">
          <button onClick={goPrev} className="calendarBtn">&lt;</button>
          <span>{day.format('YYYY년 MM월')}</span>
          <button onClick={goNext} className="calendarBtn">&gt;</button>
        </div>
        <table id="calendarTable">
          <tbody>
            {getCalendar()}
          </tbody>
        </table>
      </div>
      {monthModalState ? <ScheMonthModal setMonthModalState={() => setMonthModalState(false)} today={selecedDate}/> : null}
      {modalState ? <ScheModal setModalState={() => setModalState(false)}/> : null}
    </div>
  )
}