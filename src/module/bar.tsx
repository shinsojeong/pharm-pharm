import {  //action type
  CHANGETOP,
  CHANGENAV 
} from './type';
import {  //action interface
  topAction,
  navAction
} from './type';
import { topInterface, navInterface } from './type';


//type
type initType = {
  top: topInterface,
  nav: navInterface
}
type actionType =
  | topAction
  | navAction;

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
    selected: ""
  }
};


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


//reducer
const bar = (state = INIT_BAR_STATE, action: actionType) => {
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

    default:
      return state;
  };
};

export default bar;