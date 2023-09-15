import React, { ReactElement, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Tesseract from 'tesseract.js';

import { changeTop } from '../../module/bar';
import Sample from '../../source/sample.jpg';
import Files_And_Folder_Flatline from '../../source/Files_And_Folder_Flatline.png';
import '../../style/Camera.scss';

export default function Camera(): ReactElement {
  const navigate = useNavigate();
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
    try {
      Tesseract.recognize(
        picture,
        'kor'
      ).then(async({ data: { text } }) => {
        const trimStr = text.replace(/(\s*)/g, "");
        const nameStr = trimStr.split('[');
        const timeNumStr = trimStr.split(']');
        
        const res = await axios.post(`${url}/drug/get_drug_info`, {
          itemName: nameStr[0]
        }, {
          withCredentials: true
        })
  
        const { header, body } = (JSON.parse(res.data.data)).response;
        const medi_code = body.items?.item?.itemSeq._text || "",
              medi_name = body.items?.item?.itemName._text || "",
              medi_times = timeNumStr.length > 1 && timeNumStr[1].length > 0 ? timeNumStr[1][0] : 0,
              medi_num = timeNumStr.length > 1 && timeNumStr[1].length > 3 ? timeNumStr[1][3] : 0
  
        if (header.resultCode._text == '00') {
          if(medi_code === "" || medi_name === "") return alert("지원하지 않는 약봉투 양식입니다.")
          navigate(
            "/user/create-medi-info",
            {
              state: {
                medi_code, 
                medi_name, 
                medi_times, 
                medi_num
              }
            }
          );
        } else {
          alert("일치하는 결과가 없습니다.");
        }
        
      })
    } catch(e) {
      alert("약봉투 인식 중 오류가 발생했습니다.")
    }
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
        <div id="messages">
          <p>*현재는 아래 양식의 약봉투만 인식 가능*</p>
          <img src={Sample} width="90%"/>
        </div>
      </div>
      <img src={Files_And_Folder_Flatline} width="250px"/>
    </div>
  )
}