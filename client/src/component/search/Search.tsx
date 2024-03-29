import React, { ReactElement, useState } from "react";
import { debounce } from "lodash";
import SearchDetail from "./SearchDetail";
import SearchModule from "./SearchModule";
import { drugType } from "../../module/type/drugType";
import Search_engine_Flatline from "../../source/Search_engine_Flatline.png";
import "../../style/Search.scss";

export default function Search(): ReactElement {
  const [res, setRes] = useState<Array<drugType>>([]);
  const [modalState, setModalState] = useState(false);
  const [detail, setDetail] = useState({});

  /** 검색 결과 상세정보 모달 띄우는 함수 */
  const goDetail = debounce((item: object) => {
    setDetail(item);
    setModalState(true);
  }, 800);

  return (
    <div className="contents" id="search">
      <SearchModule setRes={setRes} />
      <div id="searchResult">
        {res.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th id="th1">No</th>
                <th id="th2">제품명</th>
                <th id="th3">상세정보</th>
              </tr>
            </thead>
            <tbody>
              {res.length > 0 &&
                res.map((item: drugType, index: number) => {
                  return (
                    <tr key={index + 1}>
                      <td>{index + 1}</td>
                      <td>{item.itemName._text}</td>
                      <td id="btn" onClick={() => goDetail(item)}>
                        자세히
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <div id="notResult">
            <img src={Search_engine_Flatline} width="250px" />
            <p id="message">검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
      {modalState === true ? (
        <SearchDetail
          data={detail}
          setModalState={() => setModalState(false)}
        />
      ) : null}
    </div>
  );
}
