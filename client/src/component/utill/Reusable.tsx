export const dayArr = [
  { day: "월", value: 1 },
  { day: "화", value: 2 },
  { day: "수", value: 3 },
  { day: "목", value: 4 },
  { day: "금", value: 5 },
  { day: "토", value: 6 },
  { day: "일", value: 0 }
];

export const timeArr = () => {
  const arr = [];
  
  for (let i = 1; i <=12 ; i++) {
    arr.push({ time: `${i}`, value: i })
  }
  for (let i = 13; i <=24 ; i++) {
    arr.push({ time: `${i%13+1}`, value: i })
  }
  return arr;
}