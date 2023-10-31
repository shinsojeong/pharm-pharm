//action type
export const CREATESCHEDULE = "CREATESCHEDULE" as const;
export const CREATESCHEDULE_SUCCESS = "CREATESCHEDULE_SUCCESS" as const;
export const CREATESCHEDULE_ERROR = "CREATESCHEDULE_ERROR" as const;

export const UPDATESCHEDULE = "UPDATESCHEDULE" as const;
export const UPDATESCHEDULE_SUCCESS = "UPDATESCHEDULE_SUCCESS" as const;
export const UPDATESCHEDULE_ERROR = "UPDATESCHEDULE_ERROR" as const;

export const DELETESCHEDULE = "DELETESCHEDULE" as const;
export const DELETESCHEDULE_SUCCESS = "DELETESCHEDULE_SUCCESS" as const;
export const DELETESCHEDULE_ERROR = "DELETESCHEDULE_ERROR" as const;

export const GETSCHEDULE = "GETSCHEDULE" as const;
export const GETSCHEDULE_SUCCESS = "GETSCHEDULE_SUCCESS" as const;
export const GETSCHEDULE_ERROR = "GETSCHEDULE_ERROR" as const;

export const GETSCHEDULELIST = "GETSCHEDULELIST" as const;
export const GETSCHEDULELIST_SUCCESS = "GETSCHEDULELIST_SUCCESS" as const;
export const GETSCHEDULELIST_ERROR = "GETSCHEDULELIST_ERROR" as const;

export const GETTODAYSCHEDULE = "GETTODAYSCHEDULE" as const;
export const GETTODAYSCHEDULE_SUCCESS = "GETTODAYSCHEDULE_SUCCESS" as const;
export const GETTODAYSCHEDULE_ERROR = "GETTODAYSCHEDULE_ERROR" as const;

export const RESETSCHEDULE = "RESETSCHEDULE" as const;

//action interface
export interface createAction {
  //create
  type: typeof CREATESCHEDULE;
}
export interface createSuccessAction {
  type: typeof CREATESCHEDULE_SUCCESS;
}
export interface createErrorAction {
  type: typeof CREATESCHEDULE_ERROR;
  payload: string;
}
export interface updateAction {
  //update
  type: typeof UPDATESCHEDULE;
}
export interface updateSuccessAction {
  type: typeof UPDATESCHEDULE_SUCCESS;
  payload: scheduleType;
}
export interface updateErrorAction {
  type: typeof UPDATESCHEDULE_ERROR;
  payload: string;
}
export interface deleteAction {
  //delete
  type: typeof DELETESCHEDULE;
}
export interface deleteSuccessAction {
  type: typeof DELETESCHEDULE_SUCCESS;
  payload: scheduleType;
}
export interface deleteErrorAction {
  type: typeof DELETESCHEDULE_ERROR;
  payload: string;
}
export interface getAction {
  //get
  type: typeof GETSCHEDULE;
  payload: scheduleType;
}
export interface getSuccessAction {
  type: typeof GETSCHEDULE_SUCCESS;
  payload: scheduleType;
}
export interface getErrorAction {
  type: typeof GETSCHEDULE_ERROR;
  payload: string;
}
export interface getListAction {
  //getList
  type: typeof GETSCHEDULELIST;
  payload: scheduleType[];
}
export interface getListSuccessAction {
  type: typeof GETSCHEDULELIST_SUCCESS;
  payload: scheduleType[];
}
export interface getListErrorAction {
  type: typeof GETSCHEDULELIST_ERROR;
  payload: string;
}
export interface getTodayAction {
  //getToday
  type: typeof GETTODAYSCHEDULE;
  payload: scheduleType[];
}
export interface getTodaySuccessAction {
  type: typeof GETTODAYSCHEDULE_SUCCESS;
  payload: scheduleType[];
}
export interface getTodayErrorAction {
  type: typeof GETTODAYSCHEDULE_ERROR;
  payload: string;
}
export interface resetScheduleAction {
  //reset
  type: typeof RESETSCHEDULE;
}

export type scheActionType =
  | createAction
  | updateAction
  | deleteAction
  | getAction
  | getListAction
  | getTodayAction
  | resetScheduleAction;

export type scheActionReturnType =
  | createSuccessAction
  | createErrorAction
  | updateSuccessAction
  | updateErrorAction
  | deleteSuccessAction
  | deleteErrorAction
  | getSuccessAction
  | getErrorAction
  | getListSuccessAction
  | getListErrorAction
  | getTodaySuccessAction
  | getTodayErrorAction;

//interface
export interface statesInterface {
  loading: boolean;
  data: string;
  error: boolean;
}
export interface scheduleType {
  sche_code?: string;
  medi_code?: string;
  medi_name?: string;
  medi_date1?: string;
  medi_date2?: string;
  medi_day?: string;
  medi_time?: string;
  medi_times?: number;
  medi_num?: number;
  user_num?: number;
  year?: number;
  month?: number;
  day?: number;
  last_day?: number;
}
