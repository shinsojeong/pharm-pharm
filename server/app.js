const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const redis = require("redis");
const connectRedis = require("connect-redis");
const session = require("express-session");
const dotenv = require("dotenv");
const passport = require("passport");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");

const authRouter = require("./routes/auth.js");
const drugRouter = require("./routes/drug.js");
const scheduleRouter = require("./routes/schedule.js");

const db = require("./models/index.js");
const passportConfig = require("./passport/index.js");

dotenv.config();
const app = express();
passportConfig(); //passport 설정
app.set("port", process.env.PORT || 8080);

//sequelize 연동
db.sequelize
  .sync({ force: false }) //true:실행 시마다 테이블 재생성
  .catch((err) => {
    console.log(err);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

//redis
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
});
const redisStore = connectRedis(session);
app.use(cookieParser(process.env.COOKIE_SECRET));
const sessionOption = {
  resave: false,
  saveUninitialized: true,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  store: new redisStore({
    client: redisClient,
  }),
};
app.use(cookieParser(process.env.COOKIE_SECRET));

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(helmet());
  app.use(hpp({ contentSecurityPolicy: false }));
} else {
  app.use(morgan("dev"));
}
app.use(session(sessionOption));
app.use(passport.initialize()); //req 객체에 passport 설정 심는 middleware
app.use(passport.session()); //req.session 객체에 passport 정보 저장하는 middleware

//라우터
app.use("/auth", authRouter);
app.use("/schedule", scheduleRouter);
app.use("/drug", drugRouter);

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
});

app.listen(app.get("port"), () => {
  console.log("SERVER PORT: ", app.get("port"));
});
