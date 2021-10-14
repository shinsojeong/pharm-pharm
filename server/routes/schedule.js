const express = require('express');
const sequelize = require('sequelize');
const Schedule = require('../models/schedule.js');
const { isLoggedIn } = require('./middlewares.js');

const router = express.Router();


// 복용 정보 등록
router.post('/create_schedule', isLoggedIn, async(req, res) => {
  const { medi_code, medi_name, medi_date1, medi_date2, medi_day, medi_time, medi_times, medi_num } = req.body;
  const user_num = req.user.user_num;

  try {
    const sche = await Schedule.create({
      medi_code, 
      medi_name, 
      medi_date1, 
      medi_date2,
      medi_day,
      medi_time,
      medi_times,
      medi_num,
      user: user_num
    })
    if (sche) {
      return res.send({
        status: "OK",
        code: 200,
        message: "복용 정보 등록이 완료되었습니다."
      });
    }
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
});

// 복용 정보 업데이트
router.post('/update_schedule', isLoggedIn, async(req, res) => {
  const { sche_code, medi_code, medi_name, medi_date1, medi_date2, medi_day, medi_time, medi_times, medi_num } = req.body;

  try {
    const sche = await Schedule.update({
      medi_code, medi_name, medi_date1, medi_date2, medi_day, medi_time, medi_times, medi_num
    }, {
      where: {
        sche_code: sche_code
      }
    })
    if (sche) {
      return res.send({
        status: "OK",
        code: 200,
        message: "복용 정보 수정이 완료되었습니다."
      })
    }
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
});

// 복용 정보 상세 가져오기
router.get('/get_schedule', isLoggedIn, async(req, res) => {
  const { sche_code } = req.query;

  try {
    const sche = await Schedule.findOne({
      attributes: ["sche_code", "medi_code", "medi_name", "medi_date1", "medi_date2", "medi_day", "medi_time", "medi_times", "medi_num"],
      where: {
        sche_code: sche_code
      }
    })
    if (sche) {
      return res.send({
        status: "OK",
        code: 200,
        data: sche
      })
    } else {
      return res.send({
        status: "OK",
        code: 400,
        message: "일치하는 정보가 없습니다."
      })
    }
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
    
});

// 복용 정보 삭제
router.get('/delete_schedule', isLoggedIn, async(req, res) => {
  const { sche_code } = req.query;

  try {
    const sche = await Schedule.destroy({
      where: { sche_code }
    })
    if (sche) {
      return res.send({
        status: "OK",
        code: 200,
        message: "복용 정보 삭제가 완료되었습니다."
      })
    }
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
    
});

// 선택 일자 복용 정보 리스트 가져오기
router.get('/get_schedule_list', isLoggedIn, async(req, res) => {
  let { year, month, day } = req.query;
  if (month.length === 1) {
    month = "0"+month;
  }
  if (day.length === 1) {
    day = "0"+day;
  }
  
  const user_num = req.user.user_num;
  let date = new Date(`${year}-${month}-${day} 09:00:00`);
  const searchDay = date.getDay();

  try {
    const sche = await Schedule.findAll({
      attributes: ["sche_code", "medi_code", "medi_name", "medi_time", "medi_times", "medi_num"],
      where: {
        user: user_num,
        medi_day: {
          [sequelize.Op.like]: "%"+searchDay+"%"
        },
        medi_date1: {
          [sequelize.Op.lte]: date
        },
        medi_date2: {
          [sequelize.Op.gte]: date
        }
      }
    })
    if (sche) {
      return res.send({
        status: "OK",
        code: 200,
        data: sche
      })
    } else {
      return res.send({
        status: "OK",
        code: 400,
        message: "해당 월 복용 정보가 없습니다."
      })
    }
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
    
});

// 오늘의 복용 정보 가져오기
router.get('/get_today_schedule', async(req, res) => {
  const user_num = req.user.user_num;
  const today = new Date().toISOString().slice(0,10);
  const searchDay = new Date().getDay();

  try {
    const sche = await Schedule.findAll({
      attributes: ["sche_code", "medi_code", "medi_name", "medi_time", "medi_times", "medi_num"],
      where: {
        user: user_num,
        medi_day: {
          [sequelize.Op.like]: "%"+searchDay+"%"
        },
        medi_date1: {
          [sequelize.Op.lte]: new Date(today)
        },
        medi_date2: {
          [sequelize.Op.gte]: new Date(today)
        }
      }
    })

    if (sche) {
      return res.send({
        status: "OK",
        code: 200,
        data: sche
      })
    } else {
      return res.send({
        status: "OK",
        code: 400,
        message: "오늘의 복용 정보가 없습니다."
      })
    }
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
    
});

module.exports = router;