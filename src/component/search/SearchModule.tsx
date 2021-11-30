import React, { ReactElement, useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { changeTop } from '../../module/bar';

export default function SearchModule({setRes}): ReactElement {
  const dispatch = useDispatch();
  
  const url = process.env.REACT_APP_SERVER;

  const [itemName, setItemName] = useState(undefined);
  const [itemSeq, setItemSeq] = useState(undefined);
  
  useEffect(() => {
    dispatch(
      changeTop({
        left: "null",
        center: "약 검색",
        right: "null",
        lfunc: null, 
        rfunc: null
      })
    )
  }, []);

  //function
  //검색
  const search = debounce(() => {
    axios.post(`${url}/drug/get_drug_info`, {
      itemName: itemName,
      itemSeq: itemSeq
    }, {
      withCredentials: true
    })
    .then((res) => {
      const { body } = (JSON.parse(res.data.data)).response;

      if (body.items.item !== undefined) {
        setRes(body.items.item);
      } else {
        setRes([]);
        alert("일치하는 결과가 없습니다.");
      }
    })
  }, 800)

  return (
    <div className="module" id="searchModule">
      <input type="text" placeholder="제품명" onChange={(e) => setItemName(e.target.value)}/>
      <input type="text" placeholder="품목기준코드" onChange={(e) => setItemSeq(e.target.value)}/>
      <button onClick={search}>검색</button>
    </div>
  )
}
