const express = require('express');
const passport = require('passport');

const router = express.Router();

//카카오 로그인
router.get('/kakao', passport.authenticate('kakao'));
router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/http://localhost:3000/',
}), (req, res) => {
  res.redirect(`http://localhost:3000/home/${req.user.dataValues.user_num}`);
})

module.exports = router;