import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import { Dispatch } from "redux";
import {  //action type
  CREATESCHEDULE,
  UPDATESCHEDULE,
  DELETESCHEDULE,
  GETSCHEDULE,
  GETSCHEDULELIST,
  GETTODAYSCHEDULE
} from './type';
import {  //action interface
  createAction,
  updateAction,
  deleteAction,
  getAction,
  getListAction,
  getTodayAction
} from './type';
import { scheduleInterface } from './type';

const url = process.env.REACT_APP_SERVER;

//type
type initType = {
  calendar: any,
  today_schedule: any,
  selected_schedule: scheduleInterface
}
type actionType =
  | createAction
  | updateAction
  | deleteAction
  | getAction
  | getListAction
  | getTodayAction;

//initial state
const INIT_SCHEDULE_STATE: initType = {
  calendar: [],  //sche_code, medi_name, medi_date1, medi_date2, medi_day, medi_time
  today_schedule: [],  //sche_code, medi_code, medi_name, medi_time, medi_times, medi_num
  selected_schedule: {
    sche_code: "",
    medi_code: "",
    medi_name: "",
    medi_date1: "",
    medi_date2: "",
    medi_day: "",
    medi_time: "",
    medi_times: 0,
    medi_num: 0
  }
};


//복용 일정 생성
export const createSchedule = (
  { medi_code, medi_name, medi_date1, medi_date2, medi_day, medi_time, medi_times, medi_num, user_num }: scheduleInterface
) => async(dispatch: Dispatch<actionType>) => {
  await axios
  .post(`${url}/schedule/create_schedule`, {
    medi_code, 
    medi_name, 
    medi_date1, 
    medi_date2, 
    medi_day, 
    medi_time, 
    medi_times, 
    medi_num,
    user_num
  },{ 
    withCredentials: true 
  })
  .then((res) => {
    if (res.data.code === 200) {
      dispatch({
        type: CREATESCHEDULE
      });
    }
    alert(res.data.message);
  })
  .catch((err) => console.log(err));
};

//복용 일정 수정
export const updateSchedule = (
  { sche_code, medi_code, medi_name, medi_date1, medi_date2, medi_day, medi_time, medi_times, medi_num }: scheduleInterface
) => async(dispatch: Dispatch<actionType>) => {
  await axios
  .post(`${url}/schedule/update_schedule`, {
    sche_code,
    medi_code, 
    medi_name,
    medi_date1,
    medi_date2,
    medi_day,
    medi_time,
    medi_times,
    medi_num,
  }, { 
    withCredentials: true 
  })
  .then((res) => {
    if (res.data.code === 200) {
      dispatch({
        type: UPDATESCHEDULE,
        payload: {
          sche_code,
          medi_code, 
          medi_name,
          medi_date1,
          medi_date2,
          medi_day,
          medi_time,
          medi_times,
          medi_num
        }
      });
    }
    alert(res.data.message);
  })
  .catch((err) => console.log(err));
};

//복용 일정 삭제
export const deleteSchedule = (
  sche_code: scheduleInterface["sche_code"]
) => async(dispatch: Dispatch<actionType>) => {
  await axios
  .post(`${url}/schedule/delete_schedule`, {
    sche_code
  }, { 
    withCredentials: true 
  })
  .then((res) => {
    if (res.data.code === 200) {
      dispatch({
        type: DELETESCHEDULE
      });
    }
    alert(res.data.message);
  })
  .catch((err) => console.log(err));
};

//복용 일정 세부 가져오기
export const getSchedule = (
  sche_code: scheduleInterface["sche_code"]
) => async(dispatch: Dispatch<actionType>) => {
  await axios
  .get(`${url}/schedule/get_schedule?sche_code=${sche_code}`,
    { 
      withCredentials: true 
    }
  )
  .then((res) => {
    if (res.data.code === 200) {
      dispatch({
        type: GETSCHEDULE,
        payload: res.data.data
      });
    } else {
      alert(res.data.message);
    }
  })
  .catch((err) => console.log(err));
};
  
//선택 일자 복용 일정 가져오기
export const getScheduleList = (
  { year, month, day }: scheduleInterface
) => async(dispatch: Dispatch<actionType>) => {
  await axios
  .get(`${url}/schedule/get_schedule_list?year=${year}&month=${month}&day=${day}`, 
  { 
    withCredentials: true 
  })
  .then((res) => {
    if (res.data.code === 200) {
      dispatch({
        type: GETSCHEDULELIST,
        payload: res.data.data
      });
    } else{ 
      alert(res.data.message);
    }
  })
  .catch((err) => console.log(err));
};

//오늘의 복용 일정 가져오기
export const getTodaySchedule = () => async(dispatch: Dispatch<actionType>) => {
  await axios
  .get(`${url}/schedule/get_today_schedule`,
  { 
    withCredentials: true 
  })
  .then((res) => {
    if (res.data.code === 200) {
      dispatch({
        type: GETTODAYSCHEDULE,
        payload: res.data.data
      });
    } else {
      alert(res.data.message);
    }
  })
  .catch((err) => console.log(err));
};


//reducer
const schedule = (state = INIT_SCHEDULE_STATE, action: actionType) => {
  switch(action.type) {

    case CREATESCHEDULE:
      return { 
        ...state
      };
    case UPDATESCHEDULE:
      return { 
        ...state,
        selected_schedule: action.payload
      };
    case DELETESCHEDULE:
      return {
        ...state,
        selected_schedule: INIT_SCHEDULE_STATE.selected_schedule
      }
    case GETSCHEDULE:
      return {
        ...state,
        selected_schedule: action.payload
      }
    case GETSCHEDULELIST:
      return {
        ...state,
        calendar: action.payload
      }
    case GETTODAYSCHEDULE:
      return {
        ...state,
        today_schedule: action.payload
      }

    default:
      return state;
  };
};

export default schedule;