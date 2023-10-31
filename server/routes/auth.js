const express = require("express");
const passport = require("passport");
const { isLoggedIn } = require("./middlewares.js");
const dotenv = require("dotenv");
dotenv.config();
const env = process.env;

const router = express.Router();

//카카오 로그인
router.get("/kakao", passport.authenticate("kakao"));
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: env.REACT_APP_FRONT,
  }),
  (req, res) => {
    res.redirect(`${env.REACT_APP_FRONT}/user/home`);
  }
);

//카카오 로그아웃
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    req.logout();
    res.send({
      status: "OK",
      code: 200,
    });
  });
});

//마이페이지 정보 가져오기
router.get("/mypage", isLoggedIn, (req, res) => {
  const { nickname, birth, gender } = req.user;

  res.send({
    status: "OK",
    code: 200,
    data: {
      nickname: nickname,
      birth: birth,
      gender: gender,
    },
  });
});

module.exports = router;
