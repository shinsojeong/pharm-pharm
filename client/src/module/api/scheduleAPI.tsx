import axios from "axios";
import { scheduleType } from "../type/scheType";

const url = process.env.REACT_APP_SERVER;

/** 복용 일정 생성 */
export const createSche = async ({
  medi_code,
  medi_name,
  medi_date1,
  medi_date2,
  medi_day,
  medi_time,
  medi_times,
  medi_num,
}: scheduleType) => {
  let res = null;
  try {
    res = await axios.post(
      `${url}/schedule/create_schedule`,
      {
        medi_code,
        medi_name,
        medi_date1,
        medi_date2,
        medi_day,
        medi_time,
        medi_times,
        medi_num,
      },
      {
        withCredentials: true,
      }
    );
    alert(res.data.message);
  } finally {
    return {
      res,
    };
  }
};

/** 복용 일정 수정 */
export const updateSche = async ({
  sche_code,
  medi_code,
  medi_name,
  medi_date1,
  medi_date2,
  medi_day,
  medi_time,
  medi_times,
  medi_num,
}: scheduleType) => {
  let res = null;
  try {
    res = await axios.post(
      `${url}/schedule/update_schedule`,
      {
        sche_code,
        medi_code,
        medi_name,
        medi_date1,
        medi_date2,
        medi_day,
        medi_time,
        medi_times,
        medi_num,
      },
      {
        withCredentials: true,
      }
    );
    alert(res.data.message);
  } finally {
    return {
      res,
      payloadData: {
        sche_code,
        medi_code,
        medi_name,
        medi_date1,
        medi_date2,
        medi_day,
        medi_time,
        medi_times,
        medi_num,
      },
    };
  }
};

/** 복용 일정 삭제 */
export const deleteSche = async ({ sche_code }: scheduleType) => {
  let res = null;
  try {
    res = await axios.get(
      `${url}/schedule/delete_schedule?sche_code=${sche_code}`,
      {
        withCredentials: true,
      }
    );
    alert(res.data.message);
  } finally {
    return {
      res,
    };
  }
};

/** 복용 일정 세부 가져오기 */
export const getSche = async ({ sche_code }: scheduleType) => {
  let res = null;
  try {
    res = await axios.get(
      `${url}/schedule/get_schedule?sche_code=${sche_code}`,
      {
        withCredentials: true,
      }
    );
  } finally {
    return {
      res,
    };
  }
};

/** 선택 일자 복용 일정 가져오기 */
export const getScheList = async ({ year, month, day }: scheduleType) => {
  let res = null;
  try {
    res = await axios.get(
      `${url}/schedule/get_schedule_list?year=${year}&month=${month}&day=${day}`,
      {
        withCredentials: true,
      }
    );
  } finally {
    return {
      res,
    };
  }
};

/** 오늘의 복용 일정 가져오기 */
export const getTodaySche = async () => {
  let res = null;
  try {
    res = await axios.get(`${url}/schedule/get_today_schedule`, {
      withCredentials: true,
    });
  } finally {
    return {
      res,
    };
  }
};
