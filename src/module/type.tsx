//schedule
//action type
export const CREATESCHEDULE = "CREATESCHEDULE" as const;
export const UPDATESCHEDULE = "UPDATESCHEDULE" as const;
export const DELETESCHEDULE = "DELETESCHEDULE" as const;
export const GETSCHEDULE = "GETSCHEDULE" as const;
export const GETSCHEDULELIST = "GETSCHEDULELIST" as const;
export const GETTODAYSCHEDULE = "GETTODAYSCHEDULE" as const;
export const RESETSCHEDULE = "RESETSCHEDULE" as const;

//action interface
export interface createAction {
  type: typeof CREATESCHEDULE
}
export interface updateAction {
  type: typeof UPDATESCHEDULE,
  payload: scheduleInterface
}
export interface deleteAction {
  type: typeof DELETESCHEDULE
}
export interface getAction {
  type: typeof GETSCHEDULE,
  payload: scheduleInterface
}
export interface getListAction {
  type: typeof GETSCHEDULELIST,
  payload: scheduleInterface
}
export interface getTodayAction {
  type: typeof GETTODAYSCHEDULE,
  payload: scheduleInterface
}

export interface resetScheduleAction {
  type: typeof RESETSCHEDULE
}

//interface
export interface scheduleInterface {
  sche_code?: string,
  medi_code?: string,
  medi_name?: string,
  medi_date1?: string,
  medi_date2?: string,
  medi_day?: string,
  medi_time?: string, 
  medi_times?: number, 
  medi_num?: number,
  user_num?: number,
  year?: number,
  month?: number,
  day?: number,
  last_day?: number
}

export interface drugInterface {
  entpName?: string,
  itemName?: string,
  itemSeq?: string,
  efcyQesitm?: string,
  useMethodQesitm?: string,
  atpnWarnQesitm?: string,
  atpnQesitm?: string,
  intrcQesitm?: string,
  seQesitm?: string,
  depositMethodQesitm?: string,
  openDe?: string,
  updateDe?: string,
  itemImage?: string
}


//bar
//action type
export const CHANGETOP = "CHANGETOP" as const;
export const CHANGENAV = "CHANGENAV" as const;
export const RESETBAR = "RESETBAR" as const;

//action interface
export interface topAction {
  type: typeof CHANGETOP,
  payload: topInterface
}
export interface navAction {
  type: typeof CHANGENAV,
  payload: navInterface
}
export interface barResetAction {
  type: typeof RESETBAR
}

//interface
export interface topInterface {
  left: string,
  center: string,
  right: string,
  lfunc?: any,
  rfunc?: any
}
export interface navInterface {
  selected: string
}