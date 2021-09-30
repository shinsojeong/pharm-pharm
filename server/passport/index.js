const passport = require('passport');
const kakao = require('./kakaoStrategy.js');
const User = require('../models/user.js');

module.exports = () => {
  //로그인 시 실행 (user 정보를 session에 저장)
  passport.serializeUser((user, done) => {
    done(null, user.user_num);
  });

  //모든 요청 시마다 실행 (session에 저장된 아이디를 통해 사용자 정보 불러옴)
  passport.deserializeUser((user_num, done) => {
    User.findOne({ where: { user_num } })
    .then(user => done(null, user))  //user 정보를 req.user에 저장
    .catch(err => done(err));
  });

  kakao();
};