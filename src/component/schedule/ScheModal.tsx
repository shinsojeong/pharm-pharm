import * as React from 'react';
import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getSchedule } from '../../module/schedule';
import { RootState } from '../../module/store';
import { scheduleInterface } from '../../module/type';
import ScheTimeView from './ScheTimeView';

export default function ScheModal({ setModalState }): ReactElement {
  const history = useHistory();
  const dispatch = useDispatch();

  const today_schedule = useSelector((state: RootState) => state.schedule.today_schedule);

  const goDetail = (sche_code: string) => {
    dispatch(getSchedule(sche_code, history));
    history.push("/user/sche-detail");
  };

  return (
    <div className="modal" id="scheModal">
      <p id="title">오늘의 복용 정보</p>
      <span id="close" onClick={setModalState}>X</span>
      {today_schedule.length === 0 ? 
        <p>오늘의 복용 정보가 없습니다.</p>
      :
        today_schedule.map((data: scheduleInterface) => {
          return (
            <div className="todayScheItem" id={data.sche_code} key={data.sche_code} onClick={() => goDetail(data.sche_code)}>
              <p>{data.medi_name} / {data.medi_times}회 {data.medi_num}정</p>
              <ScheTimeView time={data.medi_time}/>
            </div>
          )
        })
      }
    </div>
  )
}
