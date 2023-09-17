import { scheActionType, scheActionReturnType } from '../type/scheType';
import { Dispatch } from 'redux';
import { Action } from '../type/index';

export const createThunk = (
  type: scheActionType["type"] | scheActionReturnType["type"], 
  func: Function,
  pushOption: boolean,
  path?: string
) => {
  return ((param: object) => async(dispatch: Dispatch<Action>) => {
    dispatch({ type, param });  //시작
    try {
      const payload = await func(param);
      const payloadData = payload.payloadData || payload.res.data.data;

      if (payload.res.data.code === 200) {
        dispatch({ type: `${type}_SUCCESS` as const, payload: payloadData });  //성공
        if (pushOption === true) {
          window.location.replace(path);
        }
      } else if (payload.res.data.code === 403) {
        window.location.replace("/");
      }
    } catch (e) {
      dispatch({ type: `${type}_ERROR` as const, payload: e });  //실패
    }
  });
}