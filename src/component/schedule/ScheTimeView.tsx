import React, { ReactElement } from 'react';
import '../../style/Schedule.scss';

interface Props {
  time: string
}

export default function ScheTimeView({ time }: Props): ReactElement {
  const arr = time.split(',');

  //function
  const getTimeView = (start: number, end: number) => {
    let result = [];
    for (let i = start; i <= end; i++) {
      let num = (i%12);
      if (num === 0) {
        num = 12;
      }
      
      if (arr.indexOf(`${i}`) === -1) {
        result = result.concat(<div className="timeItem" id="none" key={num}>{num}</div>)
      } else {
        result = result.concat(<div className="timeItem" id="picked" key={num}>{num}</div>)
      }
    }
    return result;
  }

  return (
    <div className="module" id="scheTimeView">
      <div className="timeTitle" id="am">
        <span id="timeTitle">오전</span>
        {getTimeView(1, 12)}
      </div>
      <div className="timeTitle" id="pm">
        <span id="timeTitle">오후</span>
        {getTimeView(13, 24)}
      </div>
    </div>
  )
}
