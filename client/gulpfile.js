const gulp = require("gulp");
const replace = require("gulp-replace");
const dotenv = require("dotenv");

gulp.task("replaceUrls", () => {
  dotenv.config();

  const callbackUrl = process.env.CALLBACK_URL;
  const successUrl = process.env.SUCCESS_URL;
  console.log("callbackUrl: ", callbackUrl);
  console.log("successUrl: ", successUrl);

  if (!callbackUrl || !successUrl) {
    throw new Error(
      "Missing environment variables: CALLBACK_URL or SUCCESS_URL"
    );
  }

  return gulp
    .src("env.js")
    .pipe(replace("localhost:3000", callbackUrl))
    .pipe(replace("localhost:8000", successUrl))
    .pipe(gulp.dest("./"));
});

gulp.task("default", gulp.series("replaceUrls"));