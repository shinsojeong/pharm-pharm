import React, { ReactElement } from 'react';
import { useAppSelector, useAppDispatch } from '../../util/hooks';
import { debounce } from 'lodash';

import { getSchedule } from '../../module/schedule';
import { RootState } from '../../module/store';
import { scheduleType } from '../../module/type/scheType';

import ScheTimeView from './ScheTimeView';

export default function ScheMonthModal({ setMonthModalState, today }): ReactElement {
  const dispatch = useAppDispatch();
  
  const schedule = useAppSelector((state: RootState) => state.schedule.calendar);

  //function
  //상세정보로 이동
  const goDetail = debounce((sche_code: string) => {
    dispatch(getSchedule({ sche_code }));
  }, 800)

  return (
    <div className="modal" id="scheMonthModal">
      <p id="title">{today}</p>
      <span id="close" onClick={() => setMonthModalState()}>X</span>
      {schedule.length === 0 ? 
        <p id="message">해당 날짜의 복용 정보가 없습니다.</p>
      :
        <div id="monthScheItems">
          { schedule.map(({ sche_code, medi_name, medi_time, medi_times, medi_num }: scheduleType) => {
            return (
              <div className="monthScheItem" id={sche_code} key={sche_code} onClick={() => goDetail(sche_code)}>
                <p>{medi_name} / {medi_times}회 {medi_num}정</p>
                <ScheTimeView time={medi_time}/>
              </div>
            )
          })}
        </div>
      }
    </div>
  )
}
