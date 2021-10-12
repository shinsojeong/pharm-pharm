const express = require('express');
const axios = require('axios');
const convert = require('xml-js');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

const key = process.env.DRUGINFO_SERVICE_KEY;

//약 정보 받아오기
router.post('/get_drug_info', (req, res) => {
  const { itemName, itemSeq } = req.body;
  let url = `http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList?serviceKey=${key}`;

  if (itemName !== undefined) {
    url += `&itemName=${encodeURI(itemName)}`;
  }
  if (itemSeq !== undefined) {
    url += `$itemSeq=${encodeURI(itemSeq)}`;
  }

  axios({
    url: `${url}`,
    method: 'GET'
  })
  .then((resData) => {
    const parseData = convert.xml2json(resData.data, {compact: true, spaces: 2});
    res.send({
      status: "OK",
      code: 200,
      data: parseData
    });
  })
  .catch((err) => console.log(err))
})

module.exports = router;