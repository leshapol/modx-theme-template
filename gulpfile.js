const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass-embedded"));
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const fileInclude = require("gulp-file-include");
const browserSync = require("browser-sync").create();

const paths = {
  scss: "assets/scss/**/*.scss",
  js: "assets/js/**/*.js",
  html: "html/**/*.html",
  build: "assets/build/",
  dist: "build/",
};

// Compile SCSS
function scss() {
  return gulp
    .src("assets/scss/style.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(rename("style.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.build))
    .pipe(browserSync.stream());
}

// Combine JS
function js() {
  return gulp
    .src(["assets/js/modules/*.js", "assets/js/main.js"])
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest(paths.build))
    .pipe(browserSync.stream());
}

// Build HTML from chunks
function html() {
  return gulp
    .src("html/index.html")
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "html/",
      })
    )
    .pipe(gulp.dest("./"))
    .pipe(browserSync.stream());
}

// BrowserSync server
function serve() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
    startPath: "index.html",
    notify: false,
    open: true,
  });

  gulp.watch(paths.scss, scss);
  gulp.watch(paths.js, js);
  gulp.watch(paths.html, html);
  gulp.watch("html/index.html", html);
}

// Build task
const build = gulp.series(gulp.parallel(scss, js, html));

// Dev task with live reload
const dev = gulp.series(build, serve);

exports.scss = scss;
exports.js = js;
exports.html = html;
exports.build = build;
exports.dev = dev;
