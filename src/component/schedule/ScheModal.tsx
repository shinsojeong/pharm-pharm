import React, { ReactElement } from 'react';
import { useAppSelector, useAppDispatch } from '../../util/hooks';
import { debounce } from 'lodash';

import { getSchedule } from '../../module/schedule';
import { RootState } from '../../module/store';
import { scheduleType } from '../../module/type/scheType';

import ScheTimeView from './ScheTimeView';
import '../../style/Schedule.scss';

export default function ScheModal({ setModalState }): ReactElement {
  const dispatch = useAppDispatch();

  const today_schedule = useAppSelector((state: RootState) => state.schedule.today_schedule);

  const goDetail = debounce((sche_code: string) => {
    dispatch(getSchedule({ sche_code }));
  }, 800)

  return (
    <div className="modal" id="scheModal">
      <p id="title">오늘의 복용 정보</p>
      <span id="close" onClick={() => setModalState()}>X</span>
      {today_schedule.length === 0 ? 
        <p>오늘의 복용 정보가 없습니다.</p>
      :
        <div id="todayScheItems">
          { today_schedule.map(({ sche_code, medi_name, medi_time, medi_times, medi_num}: scheduleType) => {
              return (
                <div className="todayScheItem" id={sche_code} key={sche_code} onClick={() => goDetail(sche_code)}>
                  <p id="name">{medi_name}</p>
                  <p id="content">{medi_times}회 {medi_num}정</p>
                  <ScheTimeView time={medi_time}/>
                </div>
              )
            })
          }
        </div>
      }
    </div>
  )
}
