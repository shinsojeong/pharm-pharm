import * as React from 'react';
import { ReactElement, useState } from 'react';
import SearchDetail from './SearchDetail';
import SearchModule from './SearchModule';
import Search_engine_Flatline from '../../source/Search_engine_Flatline.png';
import '../../style/Search.scss';

export default function Search(): ReactElement {

  const [res, setRes] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [detail, setDetail] = useState({});

  //function
  //상세정보 모달 띄우기
  const goDetail = (item: object) => {
    setDetail(item);
    setModalState(true);
  };

  return (
    <div className="contents" id="search">
      <SearchModule setRes={setRes}/>
      <div id="searchResult">
        {res.length > 0 || res.entpName !== undefined ?
          <table>
            <thead>
              <tr>
                <th id="th1">No</th>
                <th id="th2">제품명</th>
                <th id="th3">상세정보</th>
              </tr>
            </thead>
            <tbody>
              { res.length !== undefined ?
                res.map((item, index) => {
                  return (
                    <tr key={index+1}>
                      <td>{index+1}</td>
                      <td>{item.itemName._text}</td>
                      <td id="btn" onClick={() => goDetail(item)}>자세히</td>
                    </tr>
                    )
                  })
              : 
                <tr>
                  <td>1</td>
                  <td>{res.itemName._text}</td>
                  <td id="btn" onClick={() => goDetail(res)}>자세히</td>
                </tr>
              }
            </tbody>
          </table>
        :
          <div>
            <img src={Search_engine_Flatline} width="250px"/>
            <p id="message">검색 결과가 없습니다.</p>
          </div>
        }
      </div>
      { modalState === true ? <SearchDetail data={detail} setModalState={() => setModalState(false)}/> : null }
    </div>
  )
}
