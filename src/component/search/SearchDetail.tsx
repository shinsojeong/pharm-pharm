import * as React from 'react';
import { ReactElement } from 'react';

export default function SearchDetail({ data, setModalState }): ReactElement {

  return (
    <div className="modal" id="searchDetail">
      <p id="title">{data.itemName._text}</p>
      <span id="close" onClick={setModalState}>X</span>
      <table>
        <tbody>
          <tr>
            <td id="tdTitle">업체명</td>
            <td id="tdContent">{data.entpName._text}</td>
          </tr>
          <tr>
            <td id="tdTitle">품목기준코드</td>
            <td id="tdContent">{data.itemSeq._text}</td>
          </tr>
          <tr>
            <td id="tdTitle">효능</td>
            <td id="tdContent">{data.efcyQesitm._text.replaceAll('<p>','').replaceAll('</p>','')}</td>
          </tr>
          <tr>
            <td id="tdTitle">사용법</td>
            <td id="tdContent">{data.useMethodQesitm._text.replaceAll('<p>','').replaceAll('</p>','')}</td>
          </tr>
          <tr>
            <td id="tdTitle">주의사항</td>
            <td id="tdContent">{data.atpnQesitm._text.replaceAll('<p>','').replaceAll('</p>','')}</td>
          </tr>
          <tr>
            <td id="tdTitle">상호작용</td>
            <td id="tdContent">{data.intrcQesitm._text.replaceAll('<p>','').replaceAll('</p>','')}</td>
          </tr>
          <tr>
            <td id="tdTitle">부작용</td>
            <td id="tdContent">{data.seQesitm._text.replaceAll('<p>','').replaceAll('</p>','')}</td>
          </tr>
          <tr>
            <td id="tdTitle">보관법</td>
            <td id="tdContent">{data.depositMethodQesitm._text.replaceAll('<p>','').replaceAll('</p>','')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
