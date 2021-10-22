import * as React from 'react';
import { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getSchedule } from '../../module/schedule';
import { RootState } from '../../module/store';
import { scheduleInterface } from '../../module/type/scheType';

import ScheTimeView from './ScheTimeView';

export default function ScheMonthModal({ setMonthModalState, today }): ReactElement {
  const dispatch = useDispatch();
  
  const schedule = useSelector((state: RootState) => state.schedule.calendar);

  //function
  //상세정보로 이동
  const goDetail = (sche_code: string) => {
    dispatch(getSchedule({ sche_code }));
  }

  return (
    <div className="modal" id="scheMonthModal">
      <p id="title">{today}</p>
      <span id="close" onClick={setMonthModalState}>X</span>
      {schedule === undefined || schedule.length === 0 ? 
        <p id="message">해당 날짜의 복용 정보가 없습니다.</p>
      :
        <div id="monthScheItems">
          { schedule.map((data: scheduleInterface) => {
            return (
              <div className="monthScheItem" id={data.sche_code} key={data.sche_code} onClick={() => goDetail(data.sche_code)}>
                <p>{data.medi_name} / {data.medi_times}회 {data.medi_num}정</p>
                <ScheTimeView time={data.medi_time}/>
              </div>
            )
          })}
        </div>
      }
    </div>
  )
}
