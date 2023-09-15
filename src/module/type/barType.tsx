//action type
export const CHANGETOP = "CHANGETOP" as const;
export const CHANGENAV = "CHANGENAV" as const;
export const RESETBAR = "RESETBAR" as const;


//action interface
export interface topAction {
  type: typeof CHANGETOP,
  payload: topType
}
export interface navAction {
  type: typeof CHANGENAV,
  payload: navType
}
export interface barResetAction {
  type: typeof RESETBAR
}
export type barActionType =
| topAction
| navAction
| barResetAction;


//interface
export interface topType {
  left: string,
  center: string,
  right: string,
  lfunc?: any,
  rfunc?: any
}
export interface navType {
  selected: string
}