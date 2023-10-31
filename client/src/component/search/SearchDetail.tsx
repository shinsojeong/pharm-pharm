import React, { ReactElement } from 'react';
import { drugType } from '../../module/type/drugType';

export default function SearchDetail({ data, setModalState }): ReactElement {
  const { 
    itemName, 
    entpName,
    itemSeq,
    efcyQesitm,
    useMethodQesitm,
    atpnQesitm,
    intrcQesitm,
    seQesitm,
    depositMethodQesitm
  }: drugType = data;

  return (
    <div className="modal" id="searchDetail">
      <p id="title">{itemName._text}</p>
      <span id="close" onClick={setModalState}>X</span>
      <table>
        <tbody>
          <tr>
            <td id="tdTitle">업체명</td>
            <td id="tdContent">{entpName._text}</td>
          </tr>
          <tr>
            <td id="tdTitle">품목기준코드</td>
            <td id="tdContent">{itemSeq._text}</td>
          </tr>
          <tr>
            <td id="tdTitle">효능</td>
            <td id="tdContent">{efcyQesitm._text.replaceAll('<p>','').replaceAll('</p>','')}</td>
          </tr>
          <tr>
            <td id="tdTitle">사용법</td>
            <td id="tdContent">{useMethodQesitm._text.replaceAll('<p>','').replaceAll('</p>','')}</td>
          </tr>
          <tr>
            <td id="tdTitle">주의사항</td>
            <td id="tdContent">{atpnQesitm._text.replaceAll('<p>','').replaceAll('</p>','')}</td>
          </tr>
          <tr>
            <td id="tdTitle">상호작용</td>
            <td id="tdContent">{intrcQesitm._text.replaceAll('<p>','').replaceAll('</p>','')}</td>
          </tr>
          <tr>
            <td id="tdTitle">부작용</td>
            <td id="tdContent">{seQesitm._text.replaceAll('<p>','').replaceAll('</p>','')}</td>
          </tr>
          <tr>
            <td id="tdTitle">보관법</td>
            <td id="tdContent">{depositMethodQesitm._text.replaceAll('<p>','').replaceAll('</p>','')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
