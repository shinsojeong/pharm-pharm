import React, { ReactElement, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Tesseract from 'tesseract.js';

import { changeTop } from '../../module/bar';
import Files_And_Folder_Flatline from '../../source/Files_And_Folder_Flatline.png';
import '../../style/Camera.scss';

export default function Camera(): ReactElement {
  const history = useNavigate();
  const dispatch = useDispatch();
  const url = process.env.REACT_APP_SERVER;

  useEffect(() => {
    dispatch(
      changeTop({
        left: "null",
        center: "약봉투 인식",
        right: "null",
        lfunc: null, 
        rfunc: null
      })
    )
  }, []);

  //function
  //사진 업로드
  const uploadImg = (files: FileList) => {
    recognize(files[0]);
  }

  //OCR
  const recognize = (picture: File) => {
    Tesseract.recognize(
      picture,
      'kor'
    ).then(({ data: { text } }) => {
      const trimStr = text.replace(/(\s*)/g, "");
      const nameStr = trimStr.split('[');
      const timeNumStr = trimStr.split(']');
      
      axios.post(`${url}/drug/get_drug_info`, {
        itemName: nameStr[0]
      }, {
        withCredentials: true
      })
      .then((res) => {
        const { header, body } = (JSON.parse(res.data.data)).response;

        if (header.resultCode._text == '00') {
          history.push({
            pathname: "/user/create-medi-info",
            state: {
              medi_code: body.items.item.itemSeq._text,
              medi_name: body.items.item.itemName._text,
              medi_times: timeNumStr[1][0],
              medi_num: timeNumStr[1][3]
            }
          });
        } else {
          alert("일치하는 결과가 없습니다.");
        }
      })
      
    })
  }

  return (
    <div className="contents" id="camera">
      <div id="inputDiv">
        <label id="fileBtn" htmlFor="inputFile">새로운 이미지 선택</label>
        <input
          className="inputFile"
          id="inputFile"
          type="file"
          name="picture"
          accept="image/*"
          onChange={(e) => {
            uploadImg(e.target.files)
          }}
        ></input>
      </div>
      <img src={Files_And_Folder_Flatline} width="250px"/>
    </div>
  )
}