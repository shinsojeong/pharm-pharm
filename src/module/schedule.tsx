import dotenv from 'dotenv';
dotenv.config();
import { createThunk } from './lib/reduxUtil';

import { createSche, updateSche, deleteSche, getSche, getScheList, getTodaySche } from './api/scheduleAPI';

import {  //action type
  CREATESCHEDULE, CREATESCHEDULE_SUCCESS, CREATESCHEDULE_ERROR,
  UPDATESCHEDULE, UPDATESCHEDULE_SUCCESS, UPDATESCHEDULE_ERROR,
  DELETESCHEDULE, DELETESCHEDULE_SUCCESS, DELETESCHEDULE_ERROR,
  GETSCHEDULE, GETSCHEDULE_SUCCESS, GETSCHEDULE_ERROR,
  GETSCHEDULELIST, GETSCHEDULELIST_SUCCESS, GETSCHEDULELIST_ERROR,
  GETTODAYSCHEDULE, GETTODAYSCHEDULE_SUCCESS, GETTODAYSCHEDULE_ERROR,
  RESETSCHEDULE  //Reset
} from './type/scheType';

import { 
  scheduleType, 
  statesInterface 
} from './type/scheType';

//type
import { scheActionType } from './type/scheType';
type initType = {
  calendar: Array<scheduleType>,
  today_schedule: Array<scheduleType>,
  selected_schedule: scheduleType,
  states: statesInterface
};


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
  },
  states: {
    loading: false,
    data: "",
    error: false
  }
};


//복용 일정 생성
export const createSchedule = createThunk(CREATESCHEDULE, createSche, true, "/user/home");

//복용 일정 수정
export const updateSchedule = createThunk(UPDATESCHEDULE, updateSche, false);

//복용 일정 삭제
export const deleteSchedule = createThunk(DELETESCHEDULE, deleteSche, true, "/user/home");

//복용 일정 세부 가져오기
export const getSchedule = createThunk(GETSCHEDULE, getSche, true, "/user/sche-detail");
  
//선택 일자 복용 일정 가져오기
export const getScheduleList = createThunk(GETSCHEDULELIST, getScheList, false);

//오늘의 복용 일정 가져오기
export const getTodaySchedule = createThunk(GETTODAYSCHEDULE, getTodaySche, false);

//로그아웃 시 schedule 초기화
export const resetSchedule = () => ({ type: RESETSCHEDULE });


//reducer
const schedule = (state = INIT_SCHEDULE_STATE, action: scheActionType) => {
  switch(action.type) {

    //create
    case CREATESCHEDULE:
      return { 
        ...state,
        states: {
          ...state.states,
          loading: true,
          error: false
        }
      }
    case CREATESCHEDULE_SUCCESS:
      return {
        ...state,
        states: {
          ...state.states,
          loading: false,
          error: false
        }
      }
    case CREATESCHEDULE_ERROR:
      return {
        ...state,
        states: {
          ...state.states,
          loading: false,
          data: action.payload,
          error: true
        }
      }

    //update
    case UPDATESCHEDULE:
      return { 
        ...state,
        states: {
          ...state.states,
          loading: true,
          error: false
        }
      }
    case UPDATESCHEDULE_SUCCESS:
      return {
        ...state,
        selected_schedule: action.payload,
        states: {
          ...state.states,
          loading: false,
          error: false
        }
      }
    case UPDATESCHEDULE_ERROR:
      return {
        ...state,
        states: {
          ...state.states,
          loading: false,
          data: action.payload,
          error: true
        }
      }

    //delete
    case DELETESCHEDULE:
      return {
        ...state,
        states: {
          ...state.states,
          loading: true,
          error: false
        }
      }
    case DELETESCHEDULE_SUCCESS:
      return {
        ...state,
        selected_schedule: INIT_SCHEDULE_STATE.selected_schedule,
        states: {
          ...state.states,
          loading: false,
          error: false
        }
      }
    case DELETESCHEDULE_ERROR:
      return {
        ...state,
        states: {
          ...state.states,
          loading: false,
          data: action.payload,
          error: true
        }
      }

    //get
    case GETSCHEDULE:
      return {
        ...state,
        states: {
          ...state.states,
          loading: true,
          error: false
        }
      }
    case GETSCHEDULE_SUCCESS:
      return {
        ...state,
        selected_schedule: action.payload,
        states: {
          ...state.states,
          loading: false,
          error: false
        }
      }
    case GETSCHEDULE_ERROR:
      return {
        ...state,
        states: {
          ...state.states,
          loading: false,
          data: action.payload,
          error: true
        }
      }

    //getList
    case GETSCHEDULELIST:
      return {
        ...state,
        calendar: action.payload,
        states: {
          ...state.states,
          loading: true,
          error: false
        }
      }
    case GETSCHEDULELIST_SUCCESS:
      return {
        ...state,
        calendar: action.payload,
        states: {
          ...state.states,
          loading: false,
          error: false
        }
      }
    case GETSCHEDULELIST_ERROR:
      return {
        ...state,
        states: {
          ...state.states,
          loading: false,
          data: action.payload,
          error: true
        }
      }
    
    //getToday
    case GETTODAYSCHEDULE:
      return {
        ...state,
        states: {
          ...state.states,
          loading: true,
          error: false
        }
      }
    case GETTODAYSCHEDULE_SUCCESS:
      return {
        ...state,
        today_schedule: action.payload,
        states: {
          ...state.states,
          loading: false,
          error: false
        }
      }
    case GETTODAYSCHEDULE_ERROR:
      return {
        ...state,
        states: {
          ...state.states,
          loading: false,
          data: action.payload,
          error: true
        }
      }

    //reset
    case RESETSCHEDULE:
      return INIT_SCHEDULE_STATE;

    default:
      return state;
  }
}

export default schedule;