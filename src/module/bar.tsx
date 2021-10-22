import {  //action type
  CHANGETOP,
  CHANGENAV,
  RESETBAR
} from './type/barType';
import { topInterface, navInterface } from './type/barType';


//type
import { barActionType } from './type/barType';
type initType = {
  top: topInterface,
  nav: navInterface
}

//initial state
const INIT_BAR_STATE: initType = {
  top: {
    left: "",
    center: "",
    right: "", 
    lfunc: null, 
    rfunc: null
  },
  nav: {
    selected: "home"
  }
}


//상단바 변경
export const changeTop = (
  { left, center, right, lfunc, rfunc }: topInterface
) => ({
  type: CHANGETOP,
  payload: {
    left, center, right, lfunc, rfunc
  }
});

//하단바 변경
export const changeNav = (
  { selected }: navInterface
) => ({
  type: CHANGENAV,
  payload: selected
});

//로그아웃 시 bar 초기화
export const resetBar = () => ({
  type: RESETBAR
});


//reducer
const bar = (state = INIT_BAR_STATE, action: barActionType) => {
  switch(action.type) {

    case CHANGETOP:
      return {
        ...state,
        top: action.payload
      }
    case CHANGENAV:
      return {
        ...state,
        nav: {
          selected: action.payload
        }
      }
    case RESETBAR:
      return INIT_BAR_STATE;

    default:
      return state;
  }
}

export default bar;