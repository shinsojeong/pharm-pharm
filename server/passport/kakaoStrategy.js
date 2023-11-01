const passport = require("passport");
const KakaoStrategy = require("passport-kakao");

const User = require("../models/user.js");

const kakaoStrategy = () => {
  passport.use(
    new KakaoStrategy.Strategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: "/auth/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await User.findOne({
            //가입된 유저인지 확인
            where: {
              sns_id: profile.id,
              provider: "kakao",
            },
          });
          if (exUser) done(null, exUser);
          else {
            const newUser = await User.create({
              //유저 생성
              sns_id: profile.id,
              nickname: profile._json.properties.nickname,
              birth: profile._json.kakao_account.birthday,
              gender: profile._json.kakao_account.gender,
              provider: "kakao",
            });
            done(null, newUser);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

module.exports = kakaoStrategy;
